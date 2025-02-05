import { Metadata } from "next";

// レイアウトコンポーネントの定義
export default function MagazinePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

// メタデータの定義（必要な場合）
export const metadata: Metadata = {
  title: "Magazine",
  description: "Magazine page description",
};
