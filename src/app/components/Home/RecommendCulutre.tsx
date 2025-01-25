import Link from "next/link";
import Image from "next/image";
import { cultureCategoryPerItems } from "@/app/(pages)/fiction/fetcher";

// 記事があるカテゴリのみ
// カテゴリごとに最新の5件表示
export default async function RecommendCulture() {
  const result = await cultureCategoryPerItems(6);

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
            <th>タイトル</th>
            <th>カテゴリ</th>
            <th>画像</th>
          </tr>
        </thead>
        <tbody>
          {result.map((category) =>
            category.items.map((item) => (
              <tr key={item.slug}>
                <td>
                  <Link href={`/fiction/${item.slug}`} key={item.slug}>
                    {item.title}
                  </Link>
                </td>
                <td>
                  {item.category?.map((ct) => (
                    <p key={ct.slug}>{ct.title}</p>
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
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
