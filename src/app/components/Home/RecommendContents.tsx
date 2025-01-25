import Link from "next/link";
import Image from "next/image";
import { shuffle } from "@/lib/util/shuffle";
import { getLinkEntries } from "@/lib/contentful/sharedModel";

export default async function RecommendContents() {
  const list = await getLinkEntries();

  const items = shuffle(list.items).slice(0, 4);

  return (
    <table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>モデル</th>
          <th>画像</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.slug}>
            <td>
              <Link href={`/${item.model.id}/${item.slug}`} key={item.slug}>
                {item.title}
              </Link>
            </td>
            <td>{item.model.name}</td>
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
