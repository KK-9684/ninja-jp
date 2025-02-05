import RecommendActivitySub from "./RecommendActivitySub";
import RecommendItemSub from "./RecommendItemSub";
import TagListSub from "./TagListSub";

export default function DetailSideContent() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <span className="text-[16px] text-[#ffffff]">\ 人気の体験 &nbsp;/</span>
        <RecommendActivitySub limit={4} />
      </section>

      <section className="flex flex-col gap-4 mt-[50px]">
        <span className="text-[16px] text-[#ffffff]">
          \ おすすめ商品 &nbsp;/
        </span>
        <div className="grid grid-cols-2 gap-5">
          <RecommendItemSub limit={4} />
        </div>
      </section>
      <section className="mt-[50px] bg-[#171717] rounded-[10px] px-5     ">
        <TagListSub limit={10} />
      </section>
    </>
  );
}
