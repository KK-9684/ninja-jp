import { getRelationItem } from "@/app/(pages)/item/fetcher";
import ItemItem from "./itemItem";

type Props = {
  ids: string[];
};

export default async function RelationItem({ ids }: Props) {
  const list = await getRelationItem(ids);
  console.log(list);
  return (
    <>
      {list.items.map((item) => (
        <ItemItem
          key={item.slug}
          image={item.image[0].url}
          category={item.category?.[0].title}
          title={item.title}
          price={item.price}
          href={`/item/${item.slug}`}
        />
      ))}
    </>
  );
}
