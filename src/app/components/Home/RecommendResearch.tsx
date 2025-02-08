import { shuffle } from "@/lib/util/shuffle";
import { getResearchList } from "@/app/(pages)/research/fetcher";
import ResearchItem from "../Common/researchItem";

// 忍者研究の最前線
export default async function RecommendResearch() {
  const list = await getResearchList({
    page: 1,
    perPage: 10,
  });

  const items = shuffle(list.items).slice(0, 6);

  return (
    <>
      {items.map((item) => {
        if (!item.slug || !item.title) {
          return null;
        }
        return (
          <ResearchItem
            key={item.slug}
            image={item.image?.[0]?.url || "/noimage.png"}
            href={`/research/${item.slug}`}
            category={item.category.title}
            title={item.title}
            summary={item.summary}
            content={item.content}
          />
        );
      })}
    </>
  );
}
