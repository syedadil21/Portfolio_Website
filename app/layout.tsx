import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://syedadil21.vercel.app"),
  verification: {
    google: "un5cD4bcXLPu-uuZepkQO_DIlOvNOLqhTD-_I1VCVQA",
  },
  title: "Syed Adil — Full Stack Engineer",
  description:
    "Full-stack engineer with 3+ years of experience building production-grade web and mobile applications. Specializing in React, Next.js, TypeScript, Node.js, ASP.NET, and AI-powered systems.",
  keywords: [
    "Syed Adil",
    "Full Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "ASP.NET",
    "AI",
    "Portfolio",
  ],
  authors: [{ name: "Syed Adil" }],
  openGraph: {
    title: "Syed Adil — Full Stack Engineer",
    description:
      "Full-stack engineer building scalable web, mobile, and AI-powered systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Adil — Full Stack Engineer",
    description:
      "Full-stack engineer building scalable web, mobile, and AI-powered systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
