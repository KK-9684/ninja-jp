import Image from "next/image";
import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import Pagination from "@/app/components/Common/Pagination";
import Link from "next/link";
import { getMagazineList } from "./fetcher";
import { getTagList } from "../tag/fetcher";
import { shuffle } from "@/lib/util/shuffle";

const PER_PAGE = 12;

export default async function MagazinePage({
  searchParams,
}: {
  searchParams: {
    page: string;
    categories: string | string[];
    tag: string | null;
  };
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const list = await getMagazineList({
    categories: params.categories ? toArrayOfStrings(params.categories) : [],
    tag: params.tag || "",
    page: currentPage,
    perPage: PER_PAGE,
  });

  const totalPages = Math.ceil(Number(list.total) / PER_PAGE);

  const tag = await getTagList();
  const tagItems = shuffle(tag.items).slice(0, 20);

  return (
    <>
      <ul>
        {tagItems.map((item) => (
          <li key={item.slug}>
            <Link href={`/magazine?tag=${item.slug}`} key={item.slug}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <h2>マガジン一覧</h2>
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
          {list.items.map((item) => (
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
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} />
    </>
  );
}
