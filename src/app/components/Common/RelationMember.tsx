import { getRelationMember } from "@/app/(pages)/ninja/fetcher";
import NinjaItem from "./ninjaItem";

type Props = {
  ids: string[];
};

export default async function RelationMember({ ids }: Props) {
  const list = await getRelationMember(ids);

  return (
    <>
      {list.items.map((item) => (
        <NinjaItem
          key={item.slug}
          image={item.image[0].url}
          category={item.category?.[0].name}
          title={item.name}
          position={item.position}
          summary={item.summary}
          href={`/ninja/${item.slug}`}
        />
      ))}
    </>
  );
}
