import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteContent } from "@/content/site";
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
  title: siteContent.brandName,
  description: siteContent.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <CursorGlow />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
