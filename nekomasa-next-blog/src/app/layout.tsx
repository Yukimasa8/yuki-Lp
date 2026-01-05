import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://nekomasa.com'),
  title: {
    default: "NEKOMASA | ネコマサブログ",
    template: "%s | ネコマサブログ",
  },
  description: "日常に「クスっ」と笑える余白を。ネコマサのブログ。節約術、時間術、そしてダジャレをお届けします。",
  keywords: ["ネコマサ", "ブログ", "NEKOMASA", "ダジャレ", "節約", "ライフハック"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-P655KCB5Q7" />}
      </body>
    </html>
  );
}
