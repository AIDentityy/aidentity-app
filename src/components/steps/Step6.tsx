import React, { useState } from "react";
import Card from "../Card";
import Image from "next/image";
import { useGeneral } from "@/context/GeneralContext";
import { useUser } from "@/context/UserContext";
import MainButton from "../MainButton";
import { MoveRight } from "lucide-react";
import SquareSwitch from "../SquareSwitch";

const Step6 = () => {
  const { botUserName } = useGeneral();
  const { user } = useUser();

  const [isAutomatedTweet, setIsAutomatedTweet] = useState(false);
  const [isSettingsConfirmed, setIsSettingsConfirmed] = useState(false);

  const handleConfirmSettings = () => {
    setIsSettingsConfirmed(true);
  };

  if (!user) {
    return;
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
        <div className="flex items-center mb-8">
          <p className="text-2xl font-semibold ">@{botUserName}</p>
        </div>
        <p className="text-xl font-semibold text-orange mb-6">AID settings</p>
        <div className="space-y-2 w-full mb-6">
          <div className="flex items-center justify-between w-full">
            <p className="font-medium text-[#606060]">Automated Tweets</p>
            <SquareSwitch
              isChecked={isAutomatedTweet}
              onToggle={() => setIsAutomatedTweet(!isAutomatedTweet)}
            />
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
        <MainButton
          onClick={handleConfirmSettings}
          className="w-full flex items-center justify-between">
          Confirm Settings
          <MoveRight className="mt-1" />
        </MainButton>
      </Card>
      {isSettingsConfirmed && (
        <div className="bg-[#0D0D0D] border border-white py-[20px] px-[25px] flex items-center justify-center text-orange rounded-2xl mt-6">
          Settings confirmed! 🎉
        </div>
      )}
    </div>
  );
};

export default Step6;
