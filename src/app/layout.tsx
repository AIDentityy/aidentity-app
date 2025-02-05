import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { GeneralProvider } from "@/context/GeneralContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIdentity",
  description: "AIdentity is an AI-powered tweet generator that learns from your X profile to create personalized tweets that match your unique voice and style.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <GeneralProvider>
          <body className={`${inter.variable} antialiased`}>{children}</body>
        </GeneralProvider>
      </UserProvider>
    </html>
  );
}
