import { Metadata } from "next/types";
import "./globals.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { notoSansFont } from "./components/Common/font";
import Header from "./components/header";
import Footer from "./components/footer";
import clsx from "clsx";
import { GoogleTagManager } from "@next/third-parties/google";

export const revalidate = 600; // invalidate every hour

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: "忍者ポータルサイト「Ninjack」",
  description:
    "すべての忍者をJackする。忍者ですべてをJackする。Ninjack.jpは、忍者体験・スポット・アイテム・フィクション・現代忍者・最新ニュース・研究情報など、忍者に関するあらゆる情報を網羅した“忍者総合ポータルサイト”です。 「すべての忍者をJackする。忍者ですべてをJackする。」をコンセプトに、忍者に関する多彩なコンテンツを提供しています。",
  openGraph: {
    title: "忍者ポータルサイト「Ninjack」",
    description:
      "すべての忍者をJackする。忍者ですべてをJackする。Ninjack.jpは、忍者体験・スポット・アイテム・フィクション・現代忍者・最新ニュース・研究情報など、忍者に関するあらゆる情報を網羅した“忍者総合ポータルサイト”です。 「すべての忍者をJackする。忍者ですべてをJackする。」をコンセプトに、忍者に関する多彩なコンテンツを提供しています。",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    siteName: "忍者ポータルサイト「Ninjack」",
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
      <head>
        <GoogleTagManager
          gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ""}
        />
      </head>
      <body className={clsx("h-full bg-ninjack-black", notoSansFont)}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
