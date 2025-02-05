import { getRelationActivity } from "@/app/(pages)/activity/fetcher";
import ActivityListItem from "./activityListItem";

type Props = {
  ids: string[];
};

export default async function RelationActivity({ ids }: Props) {
  if (!ids || ids.length === 0) {
    return null;
  }

  const list = await getRelationActivity(ids);

  if (!list || !list.items || list.items.length === 0) {
    return null;
  }
  console.log(list.items);
  return (
    <>
      {list.items.map((item) => (
        <ActivityListItem
          key={item.slug}
          image={item.image?.[0]?.url || "/noimage.png"}
          category={item.category?.[0]?.title || ""}
          areaName={item.area || ""}
          title={item.title || ""}
          time={item.time || ""}
          price={item.price || ""}
          imgWidth={320}
          imgHeight={220}
          href={`/activity/${item.slug}`}
        />
      ))}
    </>
  );
}
