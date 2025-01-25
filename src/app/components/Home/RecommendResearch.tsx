import Link from "next/link";
import Image from "next/image";
import { shuffle } from "@/lib/util/shuffle";
import { getResearchList } from "@/app/(pages)/research/fetcher";

// 忍者研究の最前線
export default async function RecommendResearch() {
  const list = await getResearchList({
    page: 1,
    perPage: 10,
  });

  const items = shuffle(list.items).slice(0, 6);

  return (
    <table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>画像</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.slug}>
            <td>
              <Link href={`/research/${item.slug}`} key={item.slug}>
                {item.title}
              </Link>
            </td>
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
