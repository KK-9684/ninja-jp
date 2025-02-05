import Link from "next/link";
import { shuffle } from "@/lib/util/shuffle";
import { getTagList } from "@/app/(pages)/tag/fetcher";
import clsx from "clsx";

// 気になるキーワードから探す
export default async function TagListSub({ limit }: { limit: number }) {
  const list = await getTagList();
  const items = shuffle(list.items).slice(0, limit);

  return (
    <div className="py-8 ">
      <div className="text-sm leading-none font-bold text-ninjack-white mb-5">
        関連キーワード
      </div>
      <div className="flex flex-wrap  gap-3">
        {items.map((item, index) => (
          <Link
            href={`/tag/${item.slug}`}
            key={index}
            className={clsx(
              "text-ninjack-white border border-ninjack-line-gray rounded p-[8px_12px] px-2 leading-none",
              "hover:bg-ninjack-purple hover:text-ninjack-white"
            )}
          >
            <span className="md:text-xs text-[10px]">#{item.title}</span>
          </Link>
        ))}

        {/* {keywords.map((item: KeywordItemProps, index) => {
          return (
            <div
              key={index}
              className="text-ninjack-white text-xs leading-none items-center p-2 bg-ninjack-bg-gray border-ninjack-line-gray border-[1px] w-fit"
            >
              #{item.label}
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
