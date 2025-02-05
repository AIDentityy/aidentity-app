// app/api/auth/twitter/login/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const clientId = process.env.TWITTER_CLIENT_ID;
  const twitterRedirectUri = process.env.TWITTER_REDIRECT_URI;

  if (!clientId || !twitterRedirectUri) {
    console.error("Twitter client ID or redirect URI is missing.");
    return NextResponse.json(
      { error: "Configuration error. Twitter client ID or redirect URI is missing." },
      { status: 500 },
    );
  }

  // Step 1: Generate the code verifier and code challenge
  const codeVerifier = crypto.randomBytes(32).toString("base64url");
  const codeChallenge = crypto.createHash("sha256").update(codeVerifier).digest("base64url");

  // Step 2: Store the code verifier (in a secure way; here, we're using cookies as an example)

  const response = NextResponse.redirect(
    `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      twitterRedirectUri,
    )}&scope=tweet.read%20users.read%20offline.access&state=state123&code_challenge=${codeChallenge}&code_challenge_method=S256`,
  );

  response.cookies.set("code_verifier", codeVerifier, { httpOnly: true, secure: false, path: "/" });

  return response;
}
