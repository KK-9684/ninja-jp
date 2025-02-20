import Image from "next/image";
import { getActivityList, getAreaList } from "./fetcher";
import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import Pagination from "@/app/components/Common/Pagination";
import SearchForm from "@/app/components/Common/SearchForm";
import { getCategoryList } from "@/lib/contentful/sharedModel";
import { getTagList } from "../tag/fetcher";
import { shuffle } from "@/lib/util/shuffle";
import ActivityListItem from "@/app/components/Common/activityListItem";
import iconActivity from "@/assets/icon-activity.svg";
import illus1 from "@/assets/illus-1.png";
import FilterItem from "@/app/components/filterItem";

const PER_PAGE = 12;

type SearchParams = Promise<{
  page: string;
  categories: string | string[];
  area: string | string[];
  tag: string | null;
}>;

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // データ取得
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
      {/* PC表示のヘッダー */}
      <section className="container pt-[80px] pb-[52px] mx-auto px-5 md:block hidden">
        <div className="md:flex hidden space-x-4 items-center">
          <Image src={iconActivity} alt="体験・修行" width={40} height={40} />
          <h2 className="text-[36px] text-ninjack-white font-bold">
            体験・修行
          </h2>
        </div>
        <div className="flex space-x-[88px] items-center">
          <p className="text-ninjack-text-gray text-[18px] leading-loose">
            昔の忍者たちが書き残した忍術書に記された秘伝の忍術や、忍者たちが実践していた修行を体験できます。子どもから大人まで、本格的な修行から気軽に楽しめるアクティビティまで、リアルな忍者の世界に浸るでござる！
          </p>
          <Image src={illus1} alt="忍者イラスト" width={274} height={150} />
        </div>
      </section>

      {/* スマホ表示のヘッダー */}
      <section className="container pt-[80px] pb-[52px] mx-auto px-5 md:hidden">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4">
            <Image src={iconActivity} alt="体験・修行" width={40} height={40} />
            <h2 className="text-[28px] text-ninjack-white font-bold">
              体験・修行
            </h2>
          </div>
          <FilterItem />
        </div>
        <div className="flex flex-col gap-6 items-center mt-8">
          <Image src={illus1} alt="忍者イラスト" width={274} height={150} />
          <p className="text-ninjack-text-gray text-[18px] leading-loose">
            昔の忍者たちが書き残した忍術書に記された秘伝の忍術や、忍者たちが実践していた修行を体験できます。子どもから大人まで、本格的な修行から気軽に楽しめるアクティビティまで、リアルな忍者の世界に浸るでござる！
          </p>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section className="container md:pb-[160px] pb-[40px] mx-auto px-5 flex gap-[60px]">
        <div className="hidden md:block min-w-[240px] max-w-[300px]">
          <SearchForm
            categories={categories.items}
            area={area.items}
            tag={shuffle(tag.items).slice(0, 10)}
          />
        </div>
        <div className="flex flex-col w-[100%]">
          {list.items.map((item, index) => {
            if (!item?.slug) return null; // 必要なデータの存在チェック
            return (
              <div key={`activity-${item.slug}-${index}`}>
                <ActivityListItem
                  image={item.image?.[0]?.url || "/noimage.png"}
                  category={item.category?.[0]?.title || ""}
                  areaName={item.area || ""}
                  title={item.title || ""}
                  time={item.time || ""}
                  price={item.price || ""}
                  imgWidth={320}
                  imgHeight={220}
                  href={`/activity/${item.slug}`}
                />
              </div>
            );
          })}
        </div>
      </section>
      <Pagination totalPages={totalPages} />
    </>
  );
}
