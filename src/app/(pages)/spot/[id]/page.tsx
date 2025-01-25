import Image from "next/image";
import RichContent from "@/app/components/Common/RichContent";
import { getSpot } from "../fetcher";
import RelationActivity from "@/app/components/Common/RelationActivity";
import { shuffle } from "@/lib/util/shuffle";
import RecommendActivity from "@/app/components/Common/RecommendActivity";
import RecommendItem from "@/app/components/Common/RecommendItem";
import TagList from "@/app/components/Common/TagList";

export default async function SpotDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const spot = await getSpot(id);

  if (spot === null) {
    return <h1>Not Found</h1>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>エリア</th>
            <th>画像</th>
            <th>コンテンツ</th>
            <th>編集者</th>
            <th>関連する施設・史跡</th>
          </tr>
        </thead>
        <tbody>
          <tr key={spot.slug}>
            <td>{spot.title}</td>
            <td>{spot.area}</td>
            <td>
              {spot.image?.map((img) => (
                <Image
                  key={img.alt}
                  src={img.url}
                  alt={img.alt}
                  width={324}
                  height={160}
                />
              ))}
            </td>
            <td>{RichContent(spot.content)}</td>
            <td>
              {spot.writer && (
                <>
                  <p>{spot.writer.name}</p>
                  {RichContent(spot.writer.content)}
                </>
              )}
            </td>
            <td>
              {spot.relationActivityIds && (
                <RelationActivity ids={shuffle(spot.relationActivityIds)} />
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <RecommendActivity limit={4} />
      <RecommendItem limit={4} />
      <TagList limit={10} />
    </>
  );
}
