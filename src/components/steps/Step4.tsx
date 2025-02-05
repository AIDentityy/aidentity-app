import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import MainButton from "../MainButton";
import { useGeneral } from "@/context/GeneralContext";
import { MoveRight, Check, PencilLine } from "lucide-react";
import { Input } from "../ui/input"; // ShadCN Input component
import { Textarea } from "../ui/textarea";
import Card from "../Card";

const Step4 = () => {
  const { user } = useUser();
  const { setActiveStep, botBio, setBotBio, botUserName, setBotUserName } = useGeneral();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleNext = () => {
    setActiveStep(4);
  };

  useEffect(() => {
    if (user) {
      setBotUserName(user.username + "AI");
    }
  }, [user, setBotUserName]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log("Saved new username:", botUserName);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full md:size-[770px] relative flex flex-col items-center mb-40">
      <Card className="w-full md:w-[420px] mt-40 md:mt-80 mb-20">
        <div className="relative  mb-3.5">
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

        <div className="flex items-center mb-6">
          {isEditing ? (
            <Input
              value={botUserName}
              onChange={(e) => setBotUserName(e.target.value)}
              className="text-2xl font-semibold "
            />
          ) : (
            <p className="text-2xl font-semibold ">@{botUserName}</p>
          )}
          <button onClick={isEditing ? handleSaveClick : handleEditClick} className="ml-2">
            {isEditing ? (
              <Check size={22} color="green" />
            ) : (
              <PencilLine size={20} color="#FF7117" />
            )}
          </button>
        </div>

        <p className="text-sm font-semibold mb-3 text-[#ACACAC] text-center">Add AI bio here</p>
        <Textarea
          value={botBio}
          onChange={(e) => setBotBio(e.currentTarget.value)}
          placeholder="Input text here"
          rows={5}
          className="resize-none border-[#FFFFFF1A] mb-6"
        />
        <MainButton onClick={handleNext} className="w-full flex items-center justify-between">
          Next
          <MoveRight className="mt-1" />
        </MainButton>
      </Card>
    </div>
  );
};

export default Step4;
