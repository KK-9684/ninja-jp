import Image from "next/image";
import iconSpot from "@/assets/icon-spot.svg";
import illus2 from "@/assets/illus-2.png";
import SpotListItem from "@/app/components/Common/spotListItem";
import FilterItem from "@/app/components/filterItem";

import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import { getAreaList } from "../activity/fetcher";
import SearchForm from "@/app/components/Common/SearchForm";
import { getSpotList } from "./fetcher";
import { getTagList } from "../tag/fetcher";
import { shuffle } from "@/lib/util/shuffle";
import { getCategoryList } from "@/lib/contentful/sharedModel";
import Pagination from "@/app/components/Common/Pagination";

const PER_PAGE = 12;

type SpotPageProps = {
  searchParams: Promise<{
    page: string;
    area: string | string[];
    categories: string | string[];
    tag: string | null;
  }>;
};

export default async function SpotPage({ searchParams }: SpotPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const list = await getSpotList({
    area: params.area ? toArrayOfStrings(params.area) : [],
    categories: params.categories ? toArrayOfStrings(params.categories) : [],
    tag: params.tag || "",
    page: currentPage,
    perPage: PER_PAGE,
  });

  const totalPages = Math.ceil(Number(list.total) / PER_PAGE);
  const area = await getAreaList();
  const tag = await getTagList();
  const categories = await getCategoryList("spotCategory");

  return (
    <>
      <div>
        <section className="container pt-[80px] pb-[52px] mx-auto px-5">
          <div className="md:flex hidden space-x-4 items-center">
            <Image src={iconSpot} alt="施設・史跡" width={40} height={40} />
            <h2 className="text-[36px] text-ninjack-white">施設・史跡</h2>
          </div>
          <div className="flex flex-row md:hidden items-center justify-between">
            <div className="flex flex-row gap-4">
              <Image src={iconSpot} alt="創作作品" width={40} height={40} />
              <h2 className="text-[28px] font-bold text-ninjack-white">
                施設・史跡
              </h2>
            </div>
            <FilterItem />
          </div>
          <div className="md:flex hidden space-x-[88px] items-center">
            <p className="text-ninjack-text-gray text-[18px] leading-loose">
              忍者が活躍した歴史の残る史跡や忍者テーマの観光施設など、日本にはたくさんの忍者関連スポットがあります。古き時代の忍者たちの足跡をたどり、歴史的なロマンを感じてもよし。博物館や体験施設などで忍者を学び楽しむのもよし。さぁ、忍者を感じるたびに出かけましょうぞ！
            </p>
            <Image src={illus2} alt="忍者イラスト" width={265} height={150} />
          </div>

          <div className="md:hidden flex flex-col gap-8 items-center mt-10">
            <Image src={illus2} alt="忍者イラスト" width={265} height={150} />
            <p className="text-ninjack-text-gray text-[18px] leading-loose">
              忍者が活躍した歴史の残る史跡や忍者テーマの観光施設など、日本にはたくさんの忍者関連スポットがあります。古き時代の忍者たちの足跡をたどり、歴史的なロマンを感じてもよし。博物館や体験施設などで忍者を学び楽しむのもよし。さぁ、忍者を感じるたびに出かけましょうぞ！
            </p>
          </div>
        </section>
        {/* メインコンテンツ */}
        <section className="container md:pb-[160px] pb-[40px] mx-auto px-5 flex gap-[60px]">
          <div className="hidden md:block min-w-[240px] max-w-[300px]">
            <SearchForm
              area={area.items}
              tag={shuffle(tag.items).slice(0, 10)}
              categories={categories.items}
            />
          </div>
          <div className="mb-20 grid md:grid-cols-3 grid-cols-2 md:gap-[40px] gap-6">
            {list.items.map((item, index) => {
              if (!item?.slug) return null; // 必要なデータの存在チェック
              return (
                <div key={`spot-${item.slug}-${index}`}>
                  <SpotListItem
                    image={item.image?.[0]?.url || "/noimage.png"}
                    categroy={item.category.title || ""}
                    areaName={item.area || ""}
                    title={item.title || ""}
                    href={`/spot/${item.slug}`}
                  />
                </div>
              );
            })}
          </div>
        </section>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
