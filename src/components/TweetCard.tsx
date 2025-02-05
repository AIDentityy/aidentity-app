"use client";

import React from "react";
import Card from "./Card";
import { Tweet } from "@/lib/types";
import Image from "next/image";
import MainButton from "./MainButton";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import DOMPurify from "dompurify";

interface TweetCardProps {
  tweet: Tweet;
  userImageUrl: string;
  onSelectTweet: (tweet: Tweet) => void;
  isSelected?: boolean;
  type?: "View" | "Select" | "Generated";
}

const TweetCard = ({
  tweet,
  userImageUrl,
  onSelectTweet,
  isSelected,
  type = "Select",
}: TweetCardProps) => {
  const sanitizedHtml =
    typeof window !== "undefined"
      ? DOMPurify.sanitize(tweet.html, {
          ALLOWED_TAGS: ["br", "strong", "em", "p", "span", "img"],
          ALLOWED_ATTR: ["src", "alt"],
        })
      : "";

  return (
    <Card
      className={cn(
        "w-full items-start gap-y-[25px] overflow-hidden relative p-[20px] md:p-[25px]",
        isSelected && "border-orange",
      )}>
      {/* Check icon */}
      {isSelected && (
        <div className="absolute top-0 right-0 p-1 bg-orange rounded-none rounded-bl-md">
          <Check size={20} color="white" />
        </div>
      )}

      <div className="flex items-center gap-2.5">
        <Image
          src={userImageUrl}
          alt="PFP"
          width={50}
          height={50}
          className="rounded-full overflow-hidden size-[40px] md:size-[50px]"
        />
        <div className="space-y-0.5">
          <p className="font-semibold text-white">{tweet.name}</p>
          <p className="text-xs text-[#5E5E5E]">@{tweet.username}</p>
        </div>
      </div>

      <div
        className="tweet-content font-medium text-[#797979] 
          [&_img]:w-[200px] [&_img]:h-auto [&_img]:object-contain [&_img]:rounded-md 
          [&_img]:pointer-events-none [&_img]:mt-0 md:[&_img]:mt-4"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />

      {type == "Select" ? (
        <MainButton
          className={cn("w-14 h-fit text-[10px]", isSelected && "bg-orange hover:bg-red-500")}
          onClick={() => onSelectTweet(tweet)}>
          {isSelected ? "selected" : "select"}
        </MainButton>
      ) : (
        <MainButton
          className={cn("w-fit h-fit text-[10px] gap-2")}
          onClick={() => onSelectTweet(tweet)}>
          View Tweet <ArrowRight size={16} />
        </MainButton>
      )}
    </Card>
  );
};

export default TweetCard;
