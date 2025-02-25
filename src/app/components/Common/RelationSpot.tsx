import { getRelationSpot } from "@/app/(pages)/spot/fetcher";
import SpotListItem from "./spotListItem";

type Props = {
  ids: string[];
};

export default async function RelationSpot({ ids }: Props) {
  const list = await getRelationSpot(ids);
  return (
    <>
      {list.items.map((item) => (
        <SpotListItem
          key={item.slug}
          image={item.image?.[0]?.url || "/noimage.png"}
          category={item.category.title || ""}
          areaName={item.area || ""}
          title={item.title || ""}
          href={`/spot/${item.slug}`}
        />
      ))}
    </>
  );
}
