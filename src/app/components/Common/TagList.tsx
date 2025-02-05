import Link from "next/link";
import { shuffle } from "@/lib/util/shuffle";
import { getTagList } from "@/app/(pages)/tag/fetcher";
import clsx from "clsx";

// 気になるキーワードから探す
export default async function TagList({ limit }: { limit: number }) {
  const list = await getTagList();
  const items = shuffle(list.items).slice(0, limit);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((item) => (
        <Link
          href={`/tag/${item.slug}`}
          key={item.slug}
          className={clsx(
            "text-ninjack-white border border-ninjack-line-gray rounded p-[8px_12px] px-2 leading-none",
            "hover:bg-ninjack-purple hover:text-ninjack-white"
          )}
        >
          <span className="md:text-xs text-[10px]">#{item.title}</span>
        </Link>
      ))}
    </div>
  );
}
