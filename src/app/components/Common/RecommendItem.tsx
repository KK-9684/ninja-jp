import Link from "next/link";
import Image from "next/image";
import { shuffle } from "@/lib/util/shuffle";
import { getItemList } from "@/app/(pages)/item/fetcher";

// おすすめの忍者アイテム
export default async function RecommendItem({ limit }: { limit: number }) {
  const list = await getItemList({
    page: 1,
    perPage: 10,
  });

  const items = shuffle(list.items).slice(0, limit);

  return (
    <table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>価格</th>
          <th>画像</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.slug}>
            <td>
              <Link href={`/item/${item.slug}`} key={item.slug}>
                {item.title}
              </Link>
            </td>
            <td>{item.price}</td>
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
