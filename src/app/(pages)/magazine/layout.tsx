import { Metadata } from "next/types";

// レイアウトコンポーネントの定義
export default function MagazinePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL + "magazine" || "http://localhost:3000"
  ),
  title: "Ninjack Magazine - 忍者ポータルサイト「Ninjack」",
  description:
    "すべての忍者をJackする。忍者ですべてをJackする。Ninjack.jpは、忍者体験・スポット・アイテム・フィクション・現代忍者・最新ニュース・研究情報など、忍者に関するあらゆる情報を網羅した“忍者総合ポータルサイト”です。 「すべての忍者をJackする。忍者ですべてをJackする。」をコンセプトに、忍者に関する多彩なコンテンツを提供しています。",
  openGraph: {
    title: "忍者ポータルサイト「Ninjack」",
    description:
      "すべての忍者をJackする。忍者ですべてをJackする。Ninjack.jpは、忍者体験・スポット・アイテム・フィクション・現代忍者・最新ニュース・研究情報など、忍者に関するあらゆる情報を網羅した“忍者総合ポータルサイト”です。 「すべての忍者をJackする。忍者ですべてをJackする。」をコンセプトに、忍者に関する多彩なコンテンツを提供しています。",
    url:
      process.env.NEXT_PUBLIC_BASE_URL + "magazine" || "http://localhost:3000",
    siteName: "忍者ポータルサイト「Ninjack」",
    images: [
      {
        url: process.env.NEXT_PUBLIC_BASE_URL + "/ogp.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};
