"use client";

interface KeywordItemProps {
  label: string;
  value: string;
}

interface KeywordsGroupProps {
  label: string;
  keywords: KeywordItemProps[];
}

const KeywordsGroup = ({ label, keywords }: KeywordsGroupProps) => {
  return (
    <div className="py-8 ">
      <div className="text-sm leading-none font-bold text-ninjack-white mb-5">{label}</div>
      <div className="flex flex-wrap  gap-3">
        {keywords.map((item: KeywordItemProps, index) => {
          return (
            <div
              key={index}
              className="text-ninjack-white text-xs leading-none items-center p-2 bg-ninjack-bg-gray border-ninjack-line-gray border-[1px] w-fit"
            >
              #{item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeywordsGroup;
