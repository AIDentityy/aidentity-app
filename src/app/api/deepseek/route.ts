import { NextResponse } from "next/server";
import { Tweet } from "@/lib/types";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = process.env.OPENAI_API_URL || "https://api.openai.com/v1/chat/completions";

export async function POST(request: Request) {
  try {
    const { userTweets, botUserName, botBio } = await request.json();

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Create a prompt that includes user's tweet style and bot personality
    const prompt = `As an AI assistant, analyze these tweets and generate a new tweet in a similar style. The bot's username is @${botUserName} and their bio is: "${botBio}".

Important rules:
- Do not include any retweets (no "RT @" format)
- Do not include any hashtags
- Generate original content only

Example tweets for style reference:
${userTweets.map((tweet: Tweet) => `- ${tweet.text}`).join('\n')}

Generate a creative, engaging tweet that matches this style and personality while following the rules above.`;

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 280, // Twitter's max length
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to generate tweet");
    }

    return NextResponse.json({
      generatedTweet: data.choices[0].message.content.trim(),
    });
  } catch (error) {
    console.error("Error generating tweet:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate tweet" },
      { status: 500 }
    );
  }
} 