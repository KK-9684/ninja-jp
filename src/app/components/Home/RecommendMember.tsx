import Link from "next/link";
import Image from "next/image";
import { shuffle } from "@/lib/util/shuffle";
import { getMemberList } from "@/app/(pages)/ninja/fetcher";

// 今を生きる忍者たち
export default async function RecommendMember() {
  const list = await getMemberList({
    page: 1,
    perPage: 10,
  });

  const items = shuffle(list.items).slice(0, 6);

  return (
    <table>
      <thead>
        <tr>
          <th>名前</th>
          <th>画像</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.slug}>
            <td>
              <Link href={`/ninja/${item.slug}`} key={item.slug}>
                {item.name}
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
