import { shuffle } from "@/lib/util/shuffle";
import { getItemList } from "@/app/(pages)/item/fetcher";
import ItemItemSub from "./itemItemSub";
// おすすめの忍者アイテム
export default async function RecommendItemSub({ limit }: { limit: number }) {
  const list = await getItemList({
    page: 1,
    perPage: 10,
  });

  const items = shuffle(list.items).slice(0, limit);

  return (
    <>
      {items.map((item) => (
        <ItemItemSub
          image={item.image?.[0]?.url || "/noimage.png"}
          title={item.title || ""}
          price={item.price}
          category={item.category?.[0]?.title || ""}
          href={`/item/${item.slug}`}
          key={item.slug}
        />
      ))}
    </>
  );
}
