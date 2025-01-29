const searchKeys = [
  "キーワード",
  "忍者体験",
  "修行",
  "修行",
  "忍者体験",
  "忍者体験",
  "忍者体験",
  "忍者体験",
  "忍者体験",
  "キーワード",
  "忍者体験",
  "キーワード",
  "修行",
  "忍者体験",
  "忍者体験",
  "修行",
  "忍者体験",
  "修行",
  "修行",
  "キーワード",
  "忍者体験",
  "修行",
  "修行",
  "忍者体験",
  "忍者体験",
  "忍者体験",
  "忍者体験",
  "忍者体験",
];

const SearchKeysGroup = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {searchKeys.map((item: string, index: number) => (
        <div key={index} className="text-ninjack-white border border-ninjack-line-gray rounded md:p-3.5 p-2 leading-none">
          <span className="md:text-xs text-[10px]">#{item}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchKeysGroup;
