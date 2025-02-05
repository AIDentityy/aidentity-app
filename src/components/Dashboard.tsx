import { useState } from "react";
import Card from "./Card";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useGeneral } from "@/context/GeneralContext";
import MainButton from "./MainButton";
import { Loader2, MoveRight, RefreshCw } from "lucide-react";
import SquareSwitch from "./SquareSwitch";
import { Input } from "./ui/input";
import { Tweet } from "@/lib/types";
import TweetCard from "./TweetCard";
import Masonry from "react-masonry-css";

const Dashboard = () => {
  const { user } = useUser();
  const { botUserName, botBio } = useGeneral();

  const [isGeneratingTweet, setIsGeneratingTweet] = useState(false);
  console.log(isGeneratingTweet)
  const [generatedTweet, setGeneratedTweet] = useState("");

  // FOR GENERATED TWEETS
  const [generatedTweets, setGeneratedTweets] = useState<{
    id: string;
    text: string;
    created_at: string;
  }[]>([]);
  const [isFetchingGeneratedTweets, setIsFetchingGeneratedTweets] = useState<boolean>(false);

  // Settings state
  const [isAutomatedTweet, setIsAutomatedTweet] = useState(false);
  const [isSettingsConfirmed, setIsSettingsConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const generateTweet = async () => {
    try {
      setIsGeneratingTweet(true);
      // Get selected tweets from localStorage
      const selectedTweets = JSON.parse(localStorage.getItem("selectedTweets") || "[]") as Tweet[];

      const response = await fetch("/api/deepseek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userTweets: selectedTweets,
          botUserName,
          botBio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate tweet");
      }

      setGeneratedTweet(data.generatedTweet);
      
      // Add the new generated tweet to the list
      const newTweet = {
        id: Date.now().toString(),
        text: data.generatedTweet,
        created_at: new Date().toISOString(),
      };
      
      setGeneratedTweets(prev => [newTweet, ...prev]);
    } catch (error) {
      console.error("Error generating tweet:", error);
    } finally {
      setIsGeneratingTweet(false);
    }
  };

  const fetchGeneratedTweets = async () => {
    try {
      setIsFetchingGeneratedTweets(true);
      // Get selected tweets from localStorage
      const selectedTweets = JSON.parse(localStorage.getItem("selectedTweets") || "[]") as Tweet[];

      // Create an array of promises but handle them individually
      const tweetPromises = Array(5).fill(null).map(async (_, index) => {
        try {
          const response = await fetch("/api/deepseek", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userTweets: selectedTweets,
              botUserName,
              botBio,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Failed to generate tweet");
          }

          const newTweet = {
            id: Date.now().toString() + Math.random(),
            text: data.generatedTweet,
            created_at: new Date().toISOString(),
          };

          // Update state immediately when each tweet is generated
          setGeneratedTweets(prev => [newTweet, ...prev]);
          return newTweet;
        } catch (error) {
          console.error(`Error generating tweet ${index + 1}:`, error);
          return null;
        }
      });

      // Still wait for all promises to complete before setting isFetchingGeneratedTweets to false
      await Promise.all(tweetPromises);
    } catch (error) {
      console.error("Error in fetchGeneratedTweets:", error);
    } finally {
      setIsFetchingGeneratedTweets(false);
    }
  };

  const handleToggleChange = () => {
    if (!isAutomatedTweet) {
      setShowModal(true);
    } else {
      setIsAutomatedTweet(false);
      setGeneratedTweet("");
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("credentials", JSON.stringify(formData));
    setStep(1);
    setShowModal(false);
    setIsAutomatedTweet(true);
    generateTweet();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStep(1);
  };

  const handleConfirmSettings = () => {
    setIsSettingsConfirmed(true);
    if (isAutomatedTweet && !generatedTweet) {
      generateTweet();
    }

    setTimeout(() => {
      setIsSettingsConfirmed(false);
    }, 3000);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full">
      <Card className="w-full md:w-[450px]  mx-auto mt-52">
        <div className="relative mb-3.5">
          <Image
            src={user.pfp!}
            alt="Pfp"
            width={80}
            height={80}
            className="rounded-full border-2 border-white"
          />
          <Image
            src="ai-circle.svg"
            alt="Pfp"
            width={24}
            height={24}
            className="rounded-full absolute bottom-0 right-0"
          />
        </div>
        <p className="text-2xl font-semibold mb-6">@{botUserName}</p>
        {botBio && <p className="text-center mb-6 text-[#797979]">{botBio}</p>}

        <p className="text-xl font-semibold text-orange mb-6">AID settings</p>
        <div className="space-y-2 w-full mb-6">
          <div className="flex items-center justify-between w-full">
            <p className="font-medium text-[#606060]">Automated Tweets</p>
            <SquareSwitch isChecked={isAutomatedTweet} onToggle={handleToggleChange} />
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="font-medium text-[#606060]">Length Variation</p>
            <div className="w-[66px] h-6 bg-[#1B1B1B] text-xs flex items-center justify-center text-[#393939] font-medium">
              BETA V2
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="font-medium text-[#606060]">Frequency</p>
            <div className="w-[66px] h-6 bg-[#1B1B1B] text-xs flex items-center justify-center text-[#393939] font-medium">
              BETA V2
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="font-medium text-[#606060]">Add Media</p>
            <div className="w-[66px] h-6 bg-[#1B1B1B] text-xs flex items-center justify-center text-[#393939] font-medium">
              BETA V2
            </div>
          </div>
        </div>

        {/* Generated Tweet Preview */}
        {/* <div className="mt-6 p-4 bg-[#1B1B1B] rounded-lg w-full">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-[#606060]">Generated Tweet Preview</p>
            <button
              onClick={generateTweet}
              disabled={isGeneratingTweet}
              className="text-orange hover:text-orange/80 transition-colors">
              {isGeneratingTweet ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="min-h-[80px] bg-[#0D0D0D] rounded p-3 text-sm">
            {isGeneratingTweet ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-orange" />
              </div>
            ) : generatedTweet ? (
              generatedTweet
            ) : (
              <p className="text-[#606060] text-center">No tweet generated yet</p>
            )}
          </div>
        </div> */}

        {/* Settings Confirmed Message */}
        <div
          className={`bg-[#0D0D0D] border border-white py-[20px] px-[25px] flex items-center justify-center text-orange rounded-2xl fixed left-1/2 bottom-10 transform -translate-x-1/2 transition-all duration-500 ${
            isSettingsConfirmed ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
          Settings confirmed! 🎉
        </div>

        <MainButton
          onClick={handleConfirmSettings}
          className="w-full flex items-center justify-between mt-6">
          Confirm Settings
          <MoveRight className="mt-1" />
        </MainButton>
      </Card>

      {/* Generated tweets */}
      <div className="my-40 w-full flex flex-col items-stretch">
        <div className="flex items-center justify-center gap-4 mb-12">
          <p className="text-3xl font-semibold text-orange text-center">Generated Tweets</p>
          <button
            onClick={fetchGeneratedTweets}
            disabled={isFetchingGeneratedTweets}
            className="text-orange hover:text-orange/80 transition-colors p-2 rounded-lg bg-[#1B1B1B]">
            {isFetchingGeneratedTweets ? (
              <Loader2 className="size-6 animate-spin" />
            ) : (
              <RefreshCw className="size-6" />
            )}
          </button>
        </div>
        
        {isFetchingGeneratedTweets && generatedTweets.length === 0 ? (
          <div className="flex items-center justify-center gap-2">
            <p className="text-[#606060] text-lg font-semibold text-center">Generating New Tweets</p>
            <Loader2 className="size-6 animate-spin text-orange" />
          </div>
        ) : generatedTweets.length === 0 ? (
          <div className="flex items-center justify-center gap-2">
            <p className="text-[#606060] text-lg font-semibold text-center">
              No tweets generated yet
            </p>
            <button
              onClick={fetchGeneratedTweets}
              disabled={isFetchingGeneratedTweets}
              className="text-orange hover:text-orange/80 transition-colors">
              <RefreshCw className="size-6" />
            </button>
          </div>
        ) : (
          <Masonry
            breakpointCols={{
              default: 3,
              1024: 2,
              600: 1,
            }}
            className="flex gap-5"
            columnClassName="flex flex-col space-y-5">
            {generatedTweets.map((tweet) => (
              <div key={tweet.id} className="w-full">
                <TweetCard
                  userImageUrl={user.pfp!}
                  tweet={{
                    ...tweet,
                    html: tweet.text,
                    name: user.name || "",
                    username: botUserName,
                    permanentUrl: "#",
                  }}
                  onSelectTweet={() => {}}
                  isSelected={false}
                  type="Generated"
                />
              </div>
            ))}
          </Masonry>
        )}

        {isFetchingGeneratedTweets && generatedTweets.length > 0 && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-[#1B1B1B] px-6 py-3 rounded-lg flex items-center gap-3 border border-[#2D2D2D]">
            <p className="text-[#606060] font-medium">Generating more tweets</p>
            <Loader2 className="size-5 animate-spin text-orange" />
          </div>
        )}
      </div>

      {/* Modal Popup for Credentials */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <Card className="w-[90%] md:w-[400px] py-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Automated Posting Settings</h2>

            {step === 1 ? (
              <div>
                <p className="mb-4 text-center">
                  You need to provide your credentials for automated posting.
                </p>
                <MainButton onClick={() => setStep(2)} className="w-full mt-8">
                  Next
                </MainButton>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="w-full">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    className="text-2xl font-semibold"
                    required
                  />
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="text-2xl font-semibold"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    className="text-2xl font-semibold"
                    required
                  />
                </div>

                <MainButton type="submit" className="w-full mt-8">
                  Submit
                </MainButton>
              </form>
            )}
            <MainButton onClick={handleCloseModal} className="mt-4 w-full text-white">
              Close
            </MainButton>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
