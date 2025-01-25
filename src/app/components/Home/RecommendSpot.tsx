import Link from "next/link";
import Image from "next/image";
import { shuffle } from "@/lib/util/shuffle";
import { getSpotList } from "@/app/(pages)/spot/fetcher";

// 記事があるカテゴリのみ
// カテゴリごとに最新の5件表示
export default async function RecommendSpot() {
  const list = await getSpotList({
    page: 1,
    perPage: 10,
  });

  const items = shuffle(list.items).slice(0, 6);

  return (
    <table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>エリア</th>
          <th>画像</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.slug}>
            <td>
              <Link href={`/fiction/${item.slug}`} key={item.slug}>
                {item.title}
              </Link>
            </td>
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
