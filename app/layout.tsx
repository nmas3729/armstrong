import type { Metadata, Viewport } from "next";
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

const siteTitle = `${siteContent.brandName} | Manufacturing & Branding`;
const siteDescription =
  "Armstrong SVT (Pty) Ltd is your manufacturing and branding partner for apparel, footwear, bags, blankets, textiles and production.";
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteContent.brandName,
  legalName: siteContent.brandName,
  description: siteDescription,
  slogan: siteContent.tagline,
  identifier: {
    "@type": "PropertyValue",
    name: "Company registration number",
    value: siteContent.companyRegistrationNumber,
  },
  sameAs: [siteContent.facebookUrl],
};

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    title: siteTitle,
    description: siteDescription,
    siteName: siteContent.brandName,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <CursorGlow />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
