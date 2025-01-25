import Image from "next/image";
import { getActivity } from "../fetcher";
import RichContent from "@/app/components/Common/RichContent";
import RelationActivity from "@/app/components/Common/RelationActivity";
import RelationSpot from "@/app/components/Common/RelationSpot";
import { shuffle } from "@/lib/util/shuffle";
import RecommendActivity from "@/app/components/Common/RecommendActivity";
import TagList from "@/app/components/Common/TagList";
import RecommendItem from "@/app/components/Common/RecommendItem";

export default async function ActivityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const activity = await getActivity(id);

  if (activity === null) {
    return <h1>Not Found</h1>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>カテゴリ</th>
            <th>料金</th>
            <th>所要時間</th>
            <th>エリア</th>
            <th>画像</th>
            <th>コンテンツ</th>
            <th>タグ</th>
            <th>編集者</th>
            <th>関連する施設・史跡</th>
            <th>おすすめの体験・旅行</th>
          </tr>
        </thead>
        <tbody>
          <tr key={activity.slug}>
            <td>{activity.title}</td>
            <td>
              {activity.category?.map((ct) => (
                <p key={ct.slug}>{ct.title}</p>
              ))}
            </td>
            <td>{activity.price}</td>
            <td>{activity.time}</td>
            <td>{activity.area}</td>
            <td>
              {activity.image?.map((img) => (
                <Image
                  key={img.alt}
                  src={img.url}
                  alt={img.alt}
                  width={324}
                  height={160}
                />
              ))}
            </td>
            <td>{RichContent(activity.content)}</td>
            <td>{activity.tag}</td>
            <td>
              {activity.writer && (
                <>
                  <p>{activity.writer.name}</p>
                  {RichContent(activity.writer.content)}
                </>
              )}
            </td>
            <td>
              {activity.relationSpotIds && (
                <RelationSpot ids={shuffle(activity.relationSpotIds)} />
              )}
            </td>
            <td>
              {activity.relationActivityIds && (
                <RelationActivity ids={shuffle(activity.relationActivityIds)} />
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
