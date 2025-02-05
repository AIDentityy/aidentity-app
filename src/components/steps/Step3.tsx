import { useState } from "react";
import MainButton from "../MainButton";
import { MoveRight } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useGeneral } from "@/context/GeneralContext";
import Card from "../Card";

const Step3 = () => {
  const { setActiveStep } = useGeneral();
  const [persona, setPersona] = useState<string>("");
  const [goals, setGoals] = useState<string>("");

  const handleNext = () => {
    setActiveStep(3);
  };
  return (
    <div className="w-full md:size-[770px] relative flex flex-col items-center mb-40">
      <Card className="w-full md:w-[420px] mt-40 md:mt-80 mb-20 space-y-[30px]">
        <p className=" bg-text-gradient bg-clip-text text-transparent text-2xl font-bold text-white  text-center">
          Setup your AID
        </p>
        <div className="space-y-5 w-full">
          <div>
            <p className="text-sm font-semibold text-[#ACACAC] mb-3">Describe your X persona</p>
            <Textarea
              value={persona}
              onChange={(e) => setPersona(e.currentTarget.value)}
              placeholder="Input persona here"
              rows={5}
              className="resize-none border-[#FFFFFF1A]"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#ACACAC] mb-3">Describe your WEB3 goals</p>
            <Textarea
              value={goals}
              onChange={(e) => setGoals(e.currentTarget.value)}
              placeholder="Input goals here"
              rows={5}
              className="resize-none border-[#FFFFFF1A]"
            />
          </div>
        </div>
        <MainButton onClick={handleNext} className="w-full flex items-center justify-between">
          Next
          <MoveRight className="mt-1" />
        </MainButton>
      </Card>
    </div>
  );
};

export default Step3;
