import Image from "next/image";
import RichContent from "@/app/components/Common/RichContent";
import RelationActivity from "@/app/components/Common/RelationActivity";
import { shuffle } from "@/lib/util/shuffle";
import { getResearch } from "../fetcher";
import RelationItem from "@/app/components/Common/RelationItem";
import RecommendActivity from "@/app/components/Common/RecommendActivity";
import RecommendItem from "@/app/components/Common/RecommendItem";
import TagList from "@/app/components/Common/TagList";

export default async function ResearchDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const research = await getResearch(id);

  if (research === null) {
    return <h1>Not Found</h1>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>カテゴリ</th>
            <th>タグ</th>
            <th>画像</th>
            <th>コンテンツ</th>
            <th>編集者</th>
            <th>関連する体験</th>
            <th>関連する商品</th>
          </tr>
        </thead>
        <tbody>
          <tr key={research.slug}>
            <td>{research.title}</td>
            <td>{research.category.title}</td>
            <td>{research.tag}</td>
            <td>
              {research.image?.map((img) => (
                <Image
                  key={img.alt}
                  src={img.url}
                  alt={img.alt}
                  width={324}
                  height={160}
                />
              ))}
            </td>
            <td>{RichContent(research.content)}</td>
            <td>
              {research.writer && (
                <>
                  <p>{research.writer.name}</p>
                  {RichContent(research.writer.content)}
                </>
              )}
            </td>
            <td>
              {research.relationActivityIds && (
                <RelationActivity ids={shuffle(research.relationActivityIds)} />
              )}
            </td>
            <td>
              {" "}
              {research.relationItemIds && (
                <RelationItem ids={shuffle(research.relationItemIds)} />
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
