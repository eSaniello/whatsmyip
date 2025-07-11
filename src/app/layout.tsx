import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "What's My IP? | Free Public IP & Location Lookup",
  description:
    "Find your public IPv4 address, location, ISP, and view your position on Google Maps instantly. Fast, free, and privacy-friendly IP lookup.",
  keywords: [
    "IP address lookup",
    "public IP",
    "IPv4",
    "IP location",
    "ISP lookup",
    "Google Maps IP",
    "free IP checker",
    "what is my IP",
    "IP geolocation",
    "Bits Please Technologies",
  ],
  openGraph: {
    title: "What's My IP? | Free Public IP & Location Lookup",
    description:
      "Find your public IPv4 address, location, ISP, and view your position on Google Maps instantly.",
    url: "https://whatsmyip.online",
    siteName: "What's My IP?",
    images: [
      {
        url: "/logo.jpg",
        width: 120,
        height: 120,
        alt: "What's My IP Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "What's My IP? | Free Public IP & Location Lookup",
    description:
      "Find your public IPv4 address, location, ISP, and view your position on Google Maps instantly.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
