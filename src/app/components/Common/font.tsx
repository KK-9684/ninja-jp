import { Noto_Sans_JP, Geist, Barlow } from "next/font/google";

export const GeistFont = Geist({
  subsets: ["latin"],
  variable: "--font-Geist",
});

export const BarlowFont = Barlow({
  subsets: ["latin"],
  variable: "--font-Barlow",
  weight: ["400"], // または必要なウェイトを指定
});

export const notoSansFont = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-NotoSansJp",
  weight: ["400", "500", "600", "700", "800", "900"],
});
