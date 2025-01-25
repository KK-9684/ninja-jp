import Link from "next/link";
import Image from "next/image";
import { getRelationItem } from "@/app/(pages)/item/fetcher";

type Props = {
  ids: string[];
};

export default async function RelationItem({ ids }: Props) {
  const list = await getRelationItem(ids);

  return (
    <table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>画像</th>
        </tr>
      </thead>
      <tbody>
        {list.items.map((item) => (
          <tr key={item.slug}>
            <td>
              <Link href={`/item/${item.slug}`} key={item.slug}>
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
