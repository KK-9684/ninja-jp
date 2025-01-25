import Image from "next/image";
import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import Pagination from "@/app/components/Common/Pagination";
import Link from "next/link";
import { getAreaList } from "../activity/fetcher";
import SearchForm from "@/app/components/Common/SearchForm";
import { getSpotList } from "./fetcher";
import { getTagList } from "../tag/fetcher";
import { shuffle } from "@/lib/util/shuffle";

const PER_PAGE = 12;

export default async function SpotPage({
  searchParams,
}: {
  searchParams: {
    page: string;
    area: string | string[];
    tag: string | null;
  };
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const list = await getSpotList({
    area: params.area ? toArrayOfStrings(params.area) : [],
    tag: params.tag || "",
    page: currentPage,
    perPage: PER_PAGE,
  });

  const totalPages = Math.ceil(Number(list.total) / PER_PAGE);
  const area = await getAreaList();
  const tag = await getTagList();

  return (
    <>
      <SearchForm area={area.items} tag={shuffle(tag.items).slice(0, 10)} />
      <h2>施設・史跡一覧</h2>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>エリア</th>
            <th>画像</th>
          </tr>
        </thead>
        <tbody>
          {list.items.map((spot) => (
            <tr key={spot.slug}>
              <td>
                <Link href={`/spot/${spot.slug}`} key={spot.slug}>
                  {spot.title}
                </Link>
              </td>

              <td>{spot.area}</td>
              <td>
                {spot.image?.map((img) => (
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
