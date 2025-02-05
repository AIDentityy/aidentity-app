import { useUser } from "@/context/UserContext";
import Image from "next/image";
import React from "react";
import MainButton from "../MainButton";
import { MoveRight } from "lucide-react";
import { useGeneral } from "@/context/GeneralContext";
import Card from "../Card";

const Step2 = () => {
  const { user, logout } = useUser();
  const { setActiveStep } = useGeneral();
  if (!user) {
    return;
  }

  const handleNext = () => {
    setActiveStep(2);
  };
  return (
    <div className="w-full md:size-[770px] relative flex flex-col items-center mb-40">
      <Card className="w-full md:w-[300px] mt-40 md:mt-80 mb-20">
        <Image
          src={user.pfp!}
          alt="Pfp"
          width={80}
          height={80}
          className="rounded-full border-2 border-white mb-3.5"
        />
        <p className="text-2xl font-semibold mb-6">@{user.username}</p>
        {user.bio && <p className="text-center mb-6 text-[#797979]">{user.bio}</p>}
        <MainButton onClick={handleNext} className="w-full flex items-center justify-between">
          Next
          <MoveRight className="mt-1" />
        </MainButton>
      </Card>

      <MainButton onClick={logout}>Logout</MainButton>
    </div>
  );
};

export default Step2;
