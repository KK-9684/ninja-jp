import Image from "next/image";
import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import Pagination from "@/app/components/Common/Pagination";
import Link from "next/link";
import SearchForm from "@/app/components/Common/SearchForm";
import { getCategoryList } from "@/lib/contentful/sharedModel";
import { getCultureList } from "./fetcher";
import { getTagList } from "../tag/fetcher";
import { shuffle } from "@/lib/util/shuffle";

const PER_PAGE = 12;

export default async function FictionPage({
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
  const list = await getCultureList({
    categories: params.categories ? toArrayOfStrings(params.categories) : [],
    tag: params.tag || "",
    page: currentPage,
    perPage: PER_PAGE,
  });

  const totalPages = Math.ceil(Number(list.total) / PER_PAGE);
  const categories = await getCategoryList("cultureCategory");
  const tag = await getTagList();

  return (
    <>
      <SearchForm
        categories={categories.items}
        tag={shuffle(tag.items).slice(0, 10)}
      />
      <h2>商品・忍具一覧</h2>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>カテゴリ</th>
            <th>画像</th>
          </tr>
        </thead>
        <tbody>
          {list.items.map((item) => (
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
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} />
    </>
  );
}
