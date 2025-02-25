"use client";
import { useRouter } from "next/navigation";

type KeywordsGroupProps = {
  label: string;
  keywords: { label: string; value: string }[];
  pathname?: string;
};

const KeywordsGroup = ({
  label,
  keywords,
  pathname = "",
}: KeywordsGroupProps) => {
  const router = useRouter();

  // キーワードクリック時のハンドラー
  const handleKeywordClick = (value: string) => {
    // パス名がない場合は現在のURLから取得
    const currentPath = pathname || window.location.pathname;

    // キーワードを使って検索クエリを構築
    router.push(`${currentPath}?tag=${value}`);
  };

  return (
    <div className="py-8 ">
      <div className="text-sm leading-none font-bold text-ninjack-white mb-5">
        {label}
      </div>
      <div className="flex flex-wrap  gap-3">
        {keywords.map((keyword, index) => (
          <button
            key={index}
            onClick={() => handleKeywordClick(keyword.value)}
            className="appearance-none text-ninjack-white text-xs leading-none items-center p-2 bg-ninjack-bg-gray border-ninjack-line-gray border-[1px] w-fit"
          >
            #{keyword.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeywordsGroup;
