import { shuffle } from "@/lib/util/shuffle";
import { getMemberList } from "@/app/(pages)/ninja/fetcher";
import NinjaItem from "../Common/ninjaItem";

// 今を生きる忍者たち
export default async function RecommendMember() {
  const list = await getMemberList({
    page: 1,
    perPage: 10,
  });

  const items = shuffle(list.items).slice(0, 6);

  return (
    <>
      {items.map((item) => (
        <NinjaItem
          key={item.slug}
          image={item.image[0].url}
          title={item.name}
          position={item.position}
          content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ"
          href={`/member/${item.slug}`}
        />
      ))}
    </>
  );
}
