import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface ICard {
  children: ReactNode;
  className?: string;
}
const Card = ({ children, className = "" }: ICard) => {
  return (
    <div
      className={cn(
        "bg-darkGray p-[25px] border-[1.5px] border-white/10 flex flex-col items-center rounded-[18px]",
        className,
      )}>
      {children}
    </div>
  );
};

export default Card;
