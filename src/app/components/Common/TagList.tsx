import Link from "next/link";
import { shuffle } from "@/lib/util/shuffle";
import { getTagList } from "@/app/(pages)/tag/fetcher";

// 気になるキーワードから探す
export default async function TagList({ limit }: { limit: number }) {
  const list = await getTagList();
  const items = shuffle(list.items).slice(0, limit);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.slug}>
          <Link href={`/tag/${item.slug}`} key={item.slug}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
