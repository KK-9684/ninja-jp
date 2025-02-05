"use client";

interface Keyword {
  label: string;
  id?: string; // もしIDが必要な場合
}

interface KeywordsDetailProps {
  keywords: Keyword[];
}

const KeywordsDetail = ({ keywords }: KeywordsDetailProps) => {
  return (
    <div className="py-8">
      <div className="flex md:flex-row flex-wrap gap-2">
        {keywords.map((item: Keyword, index: number) => (
          <div
            key={item.id || index}
            className="text-ninjack-white text-xs leading-none items-center p-2 bg-ninjack-bg-gray border-ninjack-line-gray w-fit"
          >
            #{item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordsDetail;
