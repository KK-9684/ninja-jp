import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx"; // 今回の実装に必須というわけではないが便利
import { notoSansFont } from "./components/Common/font";

export const revalidate = 3600; // invalidate every hour

export const metadata: Metadata = {
  title: "Ninjack",
  description: "Ninjackの説明文",
  openGraph: {
    title: "Ninjack",
    description: "Ninjackの説明文",
    url: "https://ninjack.jp/",
    siteName: "Ninjack",
    images: [
      {
        url: "/ogp.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={clsx("h-full ", notoSansFont)}>{children}</body>
    </html>
  );
}
