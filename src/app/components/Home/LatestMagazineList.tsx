import { getMagazineList } from "@/app/(pages)/magazine/fetcher";
import NewsItem from "../Common/newsItem";

export default async function LatestMagazineList() {
  // 最新のマガジンを取得
  const latestMagazine = await getMagazineList({
    page: 1,
    perPage: 3,
    categories: [],
    tag: "",
  });
  console.log(latestMagazine);
  return (
    <>
      {latestMagazine.items.map((item) => (
        <NewsItem
          href={`/magazine/${item.slug}`}
          key={item.slug}
          date={item.createdAt}
          type={item.category[0].title}
          title={item.title}
        />
      ))}
    </>
  );
}
