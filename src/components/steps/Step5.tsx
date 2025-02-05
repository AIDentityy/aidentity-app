import { useEffect, useState } from "react";
import Card from "../Card";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useGeneral } from "@/context/GeneralContext";
import TweetCard from "../TweetCard";
import { Tweet } from "@/lib/types";
import MainButton from "../MainButton";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Step5 = () => {
  const { user } = useUser();
  const { botUserName, setTotalSelectedTweets, setActiveStep } = useGeneral();

  const [selectedTweets, setSelectedTweets] = useState<Tweet[]>([]);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isFetchingTweets, setIsFetchingTweets] = useState<boolean>(false);

  const [areTweetsCompleted, setAreTweetsCompleted] = useState<boolean>(false);
  const numberOfTweetsToBeSelected = 5;

  const handleSelectTweet = (tweet: Tweet) => {
    setSelectedTweets((prevSelectedTweets) => {
      // If the tweet is already selected, remove it
      if (prevSelectedTweets.some((selectedTweet) => selectedTweet.id === tweet.id)) {
        return prevSelectedTweets.filter((selectedTweet) => selectedTweet.id !== tweet.id);
      }

      // If the tweet is not selected and the limit is not reached, add it
      if (prevSelectedTweets.length < numberOfTweetsToBeSelected) {
        return [...prevSelectedTweets, tweet];
      }

      return prevSelectedTweets;
    });
  };

  const onRedirectToAID = () => {
    // Save selected tweets to localStorage for use in the dashboard
    localStorage.setItem("selectedTweets", JSON.stringify(selectedTweets));
    setActiveStep(5);
  };

  // Fetch tweets
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setIsFetchingTweets(true);
        const response = await fetch(
          `https://ai-twitter-stuffs-backend.onrender.com/api/twitter/tweets?username=${user?.username}&count=10`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched tweets:", data);

        if (Array.isArray(data.tweets)) {
          setTweets(data.tweets);
        }
      } catch (error) {
        console.error("Error fetching tweets:", error);
      } finally {
        setIsFetchingTweets(false);
      }
    };

    if (user?.username) {
      fetchTweets();
    }
  }, [user?.username]);

  useEffect(() => {
    setTotalSelectedTweets(selectedTweets.length);
    if (selectedTweets.length === numberOfTweetsToBeSelected) {
      setAreTweetsCompleted(true);
    }
  }, [selectedTweets, setTotalSelectedTweets]);

  if (!user) {
    return;
  }

  return (
    <div
      className={cn(
        "h-[770px] w-full relative flex flex-col md:flex-row items-center mb-40 gap-[30px] mt-[180px]",
        areTweetsCompleted && "h-full md:h-[770px]",
      )}>
      {areTweetsCompleted ? (
        // If all tweets are submitted
        <div className="mx-auto flex flex-col items-center">
          <div className="relative w-fit mx-auto mb-[45px]">
            <Image
              src={user.pfp!}
              alt="Pfp"
              width={280}
              height={280}
              className="rounded-full border-2 border-white size-[200px] md:size-[280px] z-20"
            />
            <Image
              src="ai-circle.svg"
              alt="Pfp"
              width={70}
              height={70}
              className="rounded-full absolute bottom-0 right-0 size-[50px] md:size-[70px] z-30"
            />
            <Image
              src="/ellipse-l.png"
              alt="Pfp"
              width={500}
              height={500}
              className="absolute -top-[120px] -left-20 size-[350px] -z-10"
            />
            <Image
              src="/ellipse-r.png"
              alt="Pfp"
              width={500}
              height={500}
              className="absolute -bottom-[100px] -right-[100px] size-[350px] -z-10 object-fill"
            />
          </div>
          <p className="text-[30px] md:text-[36px] bg-text-gradient bg-clip-text text-transparent font-semibold w-[400px] mb-[35px] text-center">
            You have successfully created your <span className="text-orange">AID 🎉</span>
          </p>
          <MainButton
            onClick={onRedirectToAID}
            className="flex items-center gap-4 w-fit px-2 md:px-4 pl-4 md:pl-6 py-3 md:py-3 md:pt-3">
            Go to Dashboard <ArrowRight />
          </MainButton>
        </div>
      ) : (
        <>
          <Card className="w-full md:w-[450px]">
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
            <div className="w-full border border-white/10 p-[15px] flex items-center justify-between">
              <p className="text-sm font-semibold text-[#4D4D4D]">
                Select top {numberOfTweetsToBeSelected} tweets
              </p>
              <p className="text-sm font-semibold text-orange">
                {selectedTweets.length} / {numberOfTweetsToBeSelected}
              </p>
            </div>
          </Card>

          <div className="w-full space-y-[10px] max-h-full overflow-y-auto md:pr-4 custom-scrollbar relative overflow-x-hidden">
            <Image
              src="/blur-top.png"
              alt="blur"
              width={200}
              height={200}
              className="w-full scale-140 object-fill fixed left-0 right-0 -top-[260px] z-10 pointer-events-none  hidden md:flex "
              draggable={false}
            />
            <Image
              src="/blur-bottom.png"
              alt="blur"
              width={200}
              height={200}
              draggable={false}
              className="w-full scale-140 object-fill fixed left-0 right-0 -bottom-[260px] z-10 pointer-events-none hidden md:flex "
            />
            {isFetchingTweets ? (
              <div className="flex justify-center items-center py-10 gap-3">
                <p className="text-orange font-semibold text-lg">Fetching tweets</p>
                <Loader2 className="size-8 text-orange animate-spin" />
              </div>
            ) : tweets.length > 0 ? (
              tweets.map((tweet: Tweet) => (
                <TweetCard
                  tweet={tweet}
                  userImageUrl={user.pfp!}
                  key={tweet.id}
                  onSelectTweet={handleSelectTweet}
                  isSelected={selectedTweets.some((selectedTweet) => selectedTweet.id === tweet.id)}
                />
              ))
            ) : (
              <div className="flex justify-center items-center py-10">
                <p className="text-orange font-semibold text-lg">No tweets found!</p>
              </div>
            )}
          </div>

          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
              background: #1b1b1b;
              border-radius: 4px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #ff5c00;
              border-radius: 4px;
              transition: background 0.2s ease;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #ff7a33;
            }

            /* For Firefox */
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #ff5c00 #1b1b1b;
            }
          `}</style>
        </>
      )}
    </div>
  );
};

export default Step5;
