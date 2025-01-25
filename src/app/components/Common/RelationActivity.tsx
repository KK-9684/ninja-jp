import { getRelationActivity } from "@/app/(pages)/activity/fetcher";
import Link from "next/link";
import Image from "next/image";

type Props = {
  ids: string[];
};

export default async function RelationActivity({ ids }: Props) {
  const list = await getRelationActivity(ids);

  return (
    <table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>カテゴリ</th>
          <th>料金</th>
          <th>所要時間</th>
          <th>エリア</th>
          <th>画像</th>
        </tr>
      </thead>
      <tbody>
        {list.items.map((item) => (
          <tr key={item.slug}>
            <td>
              <Link href={`/activity/${item.slug}`} key={item.slug}>
                {item.title}
              </Link>
            </td>
            <td>
              {item.category?.map((ct) => (
                <p key={ct.slug}>{ct.title}</p>
              ))}
            </td>
            <td>{item.price}</td>
            <td>{item.time}</td>
            <td>{item.area}</td>
            <td>
              {item.image && (
                <Image
                  src={item.image[0].url}
                  alt={item.image[0].alt}
                  width={324}
                  height={160}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
