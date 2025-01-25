import Image from "next/image";
import RichContent from "@/app/components/Common/RichContent";
import { getMember } from "../fetcher";
import RelationActivity from "@/app/components/Common/RelationActivity";
import { shuffle } from "@/lib/util/shuffle";
import RelationMember from "@/app/components/Common/RelationMember";
import RecommendActivity from "@/app/components/Common/RecommendActivity";
import RecommendItem from "@/app/components/Common/RecommendItem";
import TagList from "@/app/components/Common/TagList";

export default async function NinjaDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const item = await getMember(id);

  if (item === null) {
    return <h1>Not Found</h1>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th>カテゴリ</th>
            <th>画像</th>
            <th>コンテンツ</th>
            <th>今を生きる忍者たち</th>
            <th>関連する旅行・体験</th>
          </tr>
        </thead>
        <tbody>
          <tr key={item.slug}>
            <td>{item.name}</td>
            <td>
              {item.category?.map((ct) => (
                <p key={ct.slug}>{ct.name}</p>
              ))}
            </td>
            <td>
              {item.image?.map((img) => (
                <Image
                  key={img.alt}
                  src={img.url}
                  alt={img.alt}
                  width={324}
                  height={160}
                />
              ))}
            </td>
            <td>{RichContent(item.content)}</td>
            <td>
              {item.relationMemberIds && (
                <RelationMember ids={shuffle(item.relationMemberIds)} />
              )}
            </td>
            <td>
              {item.relationActivityIds && (
                <RelationActivity ids={shuffle(item.relationActivityIds)} />
              )}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <RecommendActivity limit={4} />
      <RecommendItem limit={4} />
      <TagList limit={10} />
    </>
  );
}
