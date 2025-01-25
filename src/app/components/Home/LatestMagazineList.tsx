import { getMagazineList } from "@/app/(pages)/magazine/fetcher";
import Link from "next/link";

export default async function LatestMagazineList() {
  // 最新のマガジンを取得
  const latestMagazine = await getMagazineList({
    page: 1,
    perPage: 3,
    categories: [],
    tag: "",
  });
  return (
    <table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>カテゴリ</th>
          <th>公開日</th>
        </tr>
      </thead>
      <tbody>
        {latestMagazine.items.map((item) => (
          <tr key={item.slug}>
            <td>
              <Link href={`/magazine/${item.slug}`} key={item.slug}>
                {item.title}
              </Link>
            </td>

            <td>
              {/* {item.category?.map((ct) => (
                  <p key={ct.slug}>{ct.title}</p>
                ))} */}
            </td>
            <td>{item.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
