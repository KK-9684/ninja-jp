import { getActivityList } from "@/app/(pages)/activity/fetcher";
import { shuffle } from "@/lib/util/shuffle";
import ActivityListItem from "./activityListItem";
// 注目の体験
export default async function RecommendActivity({ limit }: { limit: number }) {
  const list = await getActivityList({
    page: 1,
    perPage: 10,
  });

  const items = shuffle(list.items).slice(0, limit);

  return (
    <>
      {items.map((item) => (
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
