// app/api/auth/twitter/callback/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const clientId = process.env.TWITTER_CLIENT_ID;
  const clientSecret = process.env.TWITTER_CLIENT_SECRET;
  const twitterRedirectUri = process.env.TWITTER_REDIRECT_URI;
  const redirectUri = process.env.REDIRECT_URL;
  console.log({ redirectUri });
  if (!code) {
    console.error("Authorization code is missing.");
    return NextResponse.redirect(redirectUri || "https://mochi-8yt9.onrender.com/interact");
  }

  if (!clientId || !clientSecret || !twitterRedirectUri) {
    console.error("Twitter client ID, client secret, or redirect URI is missing.");
    return NextResponse.redirect(redirectUri || "https://mochi-8yt9.onrender.com/interact");
  }

  // Retrieve the code verifier from cookies
  const cookies = req.headers.get("cookie");
  const codeVerifierMatch = cookies?.match(/code_verifier=([^;]*)/);
  const codeVerifier = codeVerifierMatch ? decodeURIComponent(codeVerifierMatch[1]) : null;

  if (!codeVerifier) {
    console.error("Code verifier is missing.");
    return NextResponse.redirect(`${redirectUri || ""}`);
  }

  try {
    // Exchange authorization code for access tokens
    const tokenResponse = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        code,
        grant_type: "authorization_code",
        redirect_uri: twitterRedirectUri,
        client_id: clientId,
        code_verifier: codeVerifier, // Required for PKCE
      }).toString(),
    });

    if (!tokenResponse.ok) {
      console.error("Failed to fetch tokens:", await tokenResponse.text());
      return NextResponse.redirect(
        `${
          redirectUri || "https://mochi-8yt9.onrender.com/interact"
        }/?error=token_verification_failed`,
      );
    }

    const { access_token } = await tokenResponse.json();

    // Fetch user data with the access token
    const userResponse = await fetch(
      "https://api.twitter.com/2/users/me?user.fields=profile_image_url,description",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (!userResponse.ok) {
      console.error("Failed to fetch user data:", await userResponse.text());
      return NextResponse.redirect(
        `${redirectUri || "https://mochi-8yt9.onrender.com/interact"}/?error=user_fetch_failed`,
      );
    }

    const userData = await userResponse.json();
    console.log({ userData });
    return NextResponse.redirect(
      `${redirectUri || "https://mochi-8yt9.onrender.com/interact"}/?success=true&type=twitter&id=${
        userData.data.id
      }&username=${userData.data.username}&name=${userData.data.name}&pfp=${encodeURIComponent(
        userData.data.profile_image_url || "",
      )}&bio=${encodeURIComponent(userData.data.description || "")}`,
    );
  } catch (error) {
    console.error("Unexpected error during Twitter OAuth:", error);
    return NextResponse.redirect(`${redirectUri}/?error=unexpected_error`);
  }
}
