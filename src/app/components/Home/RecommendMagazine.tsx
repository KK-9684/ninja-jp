import Link from "next/link";
import Image from "next/image";
import { magazineCategoryPerItems } from "@/app/(pages)/magazine/fetcher";

// 記事があるカテゴリのみ
// カテゴリごとに最新の5件表示
export default async function RecommendMagazine() {
  const result = await magazineCategoryPerItems(5);
  return (
    <>
      <ul>
        {result.map((category) => (
          <li key={category.slug}>{category.title}</li>
        ))}
      </ul>

      <table>
        <thead>
          <tr>
            <th>NEW</th>
            <th>タイトル</th>
            <th>カテゴリ</th>
            <th>画像</th>
            <th>サマリー</th>
            <th>公開日</th>
          </tr>
        </thead>
        <tbody>
          {result.map((category) =>
            category.items.map((item) => (
              <tr key={item.slug}>
                <td>{item.isNew ? "NEW" : ""}</td>
                <td>
                  <Link href={`/magazine/${item.slug}`} key={item.slug}>
                    {item.title}
                  </Link>
                </td>

                <td>
                  {item.category?.map((ct) => (
                    <p key={ct.slug}>{ct.title}</p>
                  ))}
                </td>
                <td>
                  {item.image?.map((img) => (
                    <Image
                      key={img.alt}
                      src={img.url}
                      alt={img.alt}
                      width={324}
                      height={160}
                    />
                  ))}
                </td>
                <td>{item.summary}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
