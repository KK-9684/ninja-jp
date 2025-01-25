import Image from "next/image";
import RichContent from "@/app/components/Common/RichContent";
import { getMagazine } from "../fetcher";
import RecommendActivity from "@/app/components/Common/RecommendActivity";
import RecommendItem from "@/app/components/Common/RecommendItem";
import TagList from "@/app/components/Common/TagList";

export default async function MagazineDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const magazine = await getMagazine(id);

  if (magazine === null) {
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
          </tr>
        </thead>
        <tbody>
          <tr key={magazine.slug}>
            <td>{magazine.title}</td>
            <td>
              {magazine.category?.map((ct) => (
                <p key={ct.slug}>{ct.title}</p>
              ))}
            </td>
            <td>{magazine.tag}</td>
            <td>
              {magazine.image?.map((img) => (
                <Image
                  key={img.alt}
                  src={img.url}
                  alt={img.alt}
                  width={324}
                  height={160}
                />
              ))}
            </td>
            <td>{RichContent(magazine.content)}</td>
            <td>
              {magazine.writer && (
                <>
                  <p>{magazine.writer.name}</p>
                  {RichContent(magazine.writer.content)}
                </>
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
