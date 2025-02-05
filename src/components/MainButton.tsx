import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IMainButton {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}

const MainButton = ({ className = "", disabled = false, onClick, children, type }: IMainButton) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center px-[8px] md:px-[12px] py-[6px]  md:py-[8px] text-white border border-white/10 rounded-[5px] duration-500 font-semibold w-fit",
        "hover:bg-black",
        "bg-gradient-to-r from-[rgba(153,153,153,0.1)] to-[rgba(255,255,255,0.1)]",
        disabled
          ? "bg-[#A5A5A5] shadow-disabled-button-shadow hover:bg-[#A5A5A5] active:shadow-disabled-button-shadow"
          : "",
        className,
      )}
      onClick={onClick}
      type={type || "button"}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default MainButton;
