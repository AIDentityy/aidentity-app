import React from "react";
import { cn } from "@/lib/utils";

interface SquareSwitchProps {
  isChecked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const SquareSwitch: React.FC<SquareSwitchProps> = ({ isChecked, onToggle, disabled }) => {
  return (
    <button
      role="switch"
      aria-checked={isChecked}
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "w-[66px] h-6 flex items-center bg-[#313131] transition-colors",
        "relative border border-gray-700",
        isChecked ? "bg-green-500" : "bg-[#313131]",
        disabled && "opacity-50 cursor-not-allowed",
      )}>
      <div
        className={cn(
          "w-[33px] h-6 bg-[#424242] absolute transition-transform duration-200",
          "border border-gray-700 text-[#1A1A1A] flex items-center justify-center",
          isChecked ? "translate-x-[33px]" : "translate-x-0",
        )}>
        |||
      </div>
    </button>
  );
};

export default SquareSwitch;
