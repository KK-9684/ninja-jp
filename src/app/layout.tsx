import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import clsx from "clsx"; // 今回の実装に必須というわけではないが便利
import { notoSansFont } from "./components/Common/font";
import Header from "./components/header";
import Footer from "./components/footer";

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
      <body className={clsx("h-full bg-ninjack-black", notoSansFont)}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
