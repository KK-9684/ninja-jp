import KeywordsDetail from "../keywordsDetail";
const DetailItem = ({ categroy, areaName, title }: any) => {
  return (
    <div className="flex flex-col md:space-y-6 gap-4">
      <div className="flex flex-col justify-between py-1">
        <div className="mb-[27px] flex items-center md:gap-[20px] gap-4">
          <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none">{categroy}</div>
          <div className="flex items-center text-ninjack-text-gray">
            <span className="text-2xl leading-none">・</span>
            <span className="text-sm leading-none">{areaName}</span>
          </div>
        </div>
        <div>
          <p className="font-bold text-ninjack-white mb-3">{title}</p>
        </div>
        <KeywordsDetail
            keywords={[
              { label: "キーワード", value: "キーワード" },
              { label: "忍者体験", value: "忍者体験" },
              { label: "修行", value: "修行" },
              { label: "修行", value: "修行" },
              { label: "忍者体験", value: "忍者体験" },
              { label: "忍者体験", value: "忍者体験" },
            ]}
          />
      </div>
    </div>
  );
};

export default DetailItem;
