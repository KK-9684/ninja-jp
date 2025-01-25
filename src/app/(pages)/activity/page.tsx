import Image from "next/image";
import { getActivityList, getAreaList } from "./fetcher";
import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import Pagination from "@/app/components/Common/Pagination";
import Link from "next/link";
import SearchForm from "@/app/components/Common/SearchForm";
import { getCategoryList } from "@/lib/contentful/sharedModel";
import { getTagList } from "../tag/fetcher";
import { shuffle } from "@/lib/util/shuffle";

const PER_PAGE = 12;

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: {
    page: string;
    categories: string | string[];
    area: string | string[];
    tag: string | null;
  };
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const list = await getActivityList({
    categories: params.categories ? toArrayOfStrings(params.categories) : [],
    area: params.area ? toArrayOfStrings(params.area) : [],
    tag: params.tag || "",
    page: currentPage,
    perPage: PER_PAGE,
  });
  const totalPages = Math.ceil(Number(list.total) / PER_PAGE);
  const categories = await getCategoryList("activityCategory");
  const tag = await getTagList();
  const area = await getAreaList();

  return (
    <>
      <SearchForm
        categories={categories.items}
        area={area.items}
        tag={shuffle(tag.items).slice(0, 10)}
      />
      <h2>アクティビティ一覧</h2>

      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>カテゴリ</th>
            <th>料金</th>
            <th>所要時間</th>
            <th>エリア</th>
            <th>画像</th>
          </tr>
        </thead>
        <tbody>
          {list.items.map((item) => (
            <tr key={item.slug}>
              <td>
                <Link href={`/activity/${item.slug}`} key={item.slug}>
                  {item.title}
                </Link>
              </td>
              <td>
                {item.category?.map((ct) => (
                  <p key={ct.slug}>{ct.title}</p>
                ))}
              </td>
              <td>{item.price}</td>
              <td>{item.time}</td>
              <td>{item.area}</td>
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
      <Pagination totalPages={totalPages} />
    </>
  );
}
