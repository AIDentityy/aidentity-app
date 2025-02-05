"use client";
import { useGeneral } from "@/context/GeneralContext";
import { useUser } from "@/context/UserContext";
import useQueryParams from "@/hooks/useQueryParams";
import Image from "next/image";
import { useEffect, useState } from "react";
import Step1 from "@/components/steps/Step1";
import Step2 from "@/components/steps/Step2";
import Step3 from "@/components/steps/Step3";
import Step4 from "@/components/steps/Step4";
import Step5 from "@/components/steps/Step5";
import { cn } from "@/lib/utils";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const { user } = useUser();
  const { activeStep, setActiveStep, totalSelectedTweets } = useGeneral();

  useQueryParams();

  const [isImageRendered, setIsImageRendered] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
  }, [user?.id, setActiveStep]);

  const steps = [Step1, Step2, Step3, Step4, Step5];
  const CurrentStep = activeStep === 5 ? Dashboard : steps[activeStep];
  const totalSteps = steps.length;

  useEffect(() => {
    // Wait until the current step is rendered
    setIsImageRendered(true);
  }, [activeStep]);

  return (
    <div
      className={cn(
        "max-w-[1600px] mx-auto px-[40px] flex md:h-screen items-center justify-center relative flex-col overflow-hidden",
        activeStep === 5 && "overflow-auto md:h-full",
      )}>
      <div className="w-full relative flex flex-col items-center">
        {/* Conditionally render the image */}
        {isImageRendered && (
          <Image
            src="ai-dentity.svg"
            alt="logo"
            height={40}
            width={140}
            draggable={false}
            className="absolute -ml-4 top-14 mx-auto h-[100px] w-[180px] z-20"
          />
        )}
        <CurrentStep />
      </div>

      {activeStep < 5 && (
        <div
          className={cn(
            "absolute bottom-20 w-full py-4 text-white text-center z-20",
            totalSelectedTweets === 5 && "text-orange",
          )}>
          <p className="text-sm font-bold">
            {activeStep + 1} / {totalSteps}
          </p>
        </div>
      )}
    </div>
  );
}
