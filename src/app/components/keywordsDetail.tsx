"use client";

const KeywordsDetail = ({keywords }: any) => {
  return (
    <div className="py-8">
      <div className="flex md:flex-row flex-wrap gap-2 ">
        {keywords.map((item: any, index : any) => {
          return (
            <div
              key={index}
              className="text-ninjack-white text-xs leading-none items-center p-2 bg-ninjack-bg-gray border-ninjack-line-gray w-fit"
            >
              #{item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeywordsDetail;
