import { getActivityList } from "@/app/(pages)/activity/fetcher";
import { shuffle } from "@/lib/util/shuffle";
import ActivitySubList from "./activitySubList";

// 注目の体験
export default async function RecommendActivitySub({
  limit,
}: {
  limit: number;
}) {
  const list = await getActivityList({
    page: 1,
    perPage: 10,
  });

  const items = shuffle(list.items).slice(0, limit);

  return (
    <div>
      {items.map((item, index) => (
        <div key={`activity-${item.slug}-${index}`}>
          <ActivitySubList
            image={item.image?.[0]?.url || "/noimage.png"}
            category={item.category?.[0]?.title || ""}
            title={item.title}
            time={item.time}
            price={item.price}
            href={`/activity/${item.slug}`}
          />
        </div>
      ))}
    </div>
  );
}
