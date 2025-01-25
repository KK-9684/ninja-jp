import Image from "next/image";
import RichContent from "@/app/components/Common/RichContent";
import { getCulture } from "../fetcher";
import { shuffle } from "@/lib/util/shuffle";
import RelationItem from "@/app/components/Common/RelationItem";
import RecommendActivity from "@/app/components/Common/RecommendActivity";
import RecommendItem from "@/app/components/Common/RecommendItem";
import TagList from "@/app/components/Common/TagList";

export default async function FictionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const item = await getCulture(id);

  if (item === null) {
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
            <th>関連する商品</th>
          </tr>
        </thead>
        <tbody>
          <tr key={item.slug}>
            <td>{item.title}</td>
            <td>
              {item.category?.map((ct) => (
                <p key={ct.slug}>{ct.title}</p>
              ))}
            </td>
            <td>{item.tag}</td>
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
              {item.writer && (
                <>
                  <p>{item.writer.name}</p>
                  {RichContent(item.writer.content)}
                </>
              )}
            </td>
            <td>
              {item.relationItemIds && (
                <RelationItem ids={shuffle(item.relationItemIds)} />
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
