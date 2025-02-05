/* eslint-disable @next/next/no-img-element */
import MainButton from "../MainButton";
import { useRouter } from "next/navigation";

const Step1 = () => {
  const router = useRouter();
  return (
    <div className="relative flex flex-col items-center w-full mb-40 h-[50vh] min-h-[900px] md:min-h-fit  md:h-auto justify-center">
      <img
        src="/voice-assistant.gif"
        alt="logo"
        draggable={false}
        className=" -z-10 w-[1770px] h-auto scale-[3] sm:scale-[2] md:scale-100  mb-40 md:mb-0 xl:mb-10 mt-40 md:mt-10 xl:mt-0"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center mt-[450px] md:mt-[400px] lg:mt-[450px]">
        <p className="text-4xl font-semibold mb-8 bg-text-gradient bg-clip-text text-transparent">
          Create your own AID
        </p>
        <MainButton className="mb-20" onClick={() => router.push("/api/auth/x/login")}>
          Connect your X/Twitter
        </MainButton>
      </div>
    </div>
  );
};

export default Step1;
