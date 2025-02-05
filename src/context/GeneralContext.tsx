"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type GeneralContextType = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  botUserName: string;
  setBotUserName: (name: string) => void;
  botBio: string;
  setBotBio: (bio: string) => void;
  totalSelectedTweets: number;
  setTotalSelectedTweets: (bio: number) => void;
};

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const GeneralProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [botUserName, setBotUserName] = useState<string>("");
  const [botBio, setBotBio] = useState<string>("");
  const [totalSelectedTweets, setTotalSelectedTweets] = useState<number>(0);

  return (
    <GeneralContext.Provider
      value={{
        activeStep,
        setActiveStep,
        botUserName,
        setBotUserName,
        botBio,
        setBotBio,
        totalSelectedTweets,
        setTotalSelectedTweets,
      }}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneral = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneral must be used within a GeneralProvider");
  }
  return context;
};
