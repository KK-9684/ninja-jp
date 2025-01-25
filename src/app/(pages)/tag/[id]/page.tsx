import Link from "next/link";
import Image from "next/image";
import { getTagLinkEntries } from "../fetcher";

export default async function TagDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const entries = await getTagLinkEntries(id);

  if (entries === null) {
    return <h1>Not Found</h1>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ジャンル</th>
            <th>タイトル</th>
            <th>画像</th>
          </tr>
        </thead>
        <tbody>
          {entries.items.map((item) => (
            <tr key={item.slug}>
              <td>{item.model.name}</td>
              <td>
                <Link href={`/${item.model.id}/${item.slug}`} key={item.slug}>
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
    </>
  );
}
