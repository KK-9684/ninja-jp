import Link from "next/link";
import Image from "next/image";
import { getRelationMember } from "@/app/(pages)/ninja/fetcher";

type Props = {
  ids: string[];
};

export default async function RelationMember({ ids }: Props) {
  const list = await getRelationMember(ids);

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
        {list.items.map((item) => (
          <tr key={item.slug}>
            <td>
              <Link href={`/ninja/${item.slug}`} key={item.slug}>
                {item.name}
              </Link>
            </td>
            <td>
              {item.category?.map((ct) => (
                <p key={ct.slug}>{ct.name}</p>
              ))}
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
