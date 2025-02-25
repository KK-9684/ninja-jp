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
import Link from "next/link";

const PER_PAGE = 12;

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  try {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const categoryFilters = params.categories
      ? toArrayOfStrings(params.categories)
      : [];
    const tagFilter = typeof params.tag === "string" ? params.tag : "";
    const areaFilters = params.area ? toArrayOfStrings(params.area) : [];

    console.log("Item Page Filters:", {
      categoryFilters,
      tagFilter,
      currentPage,
      areaFilters,
    });

    // データ取得（並列処理で最適化）
    const [list, categories, tags, areas] = await Promise.all([
      getSpotList({
        categories: categoryFilters,
        area: areaFilters,
        tag: tagFilter,
        page: currentPage,
        perPage: PER_PAGE,
      }),
      getCategoryList("spotCategory"),
      getTagList(),
      getAreaList(),
    ]);

    const totalPages = Math.ceil(Number(list.total) / PER_PAGE);

    // カテゴリフィルター用オプション
    const categoryOptions = [
      { label: "すべて", value: "all" },
      ...categories.items.map((cat) => ({
        label: cat.title,
        value: cat.slug,
      })),
    ];

    const areaOptions = [
      { label: "すべて", value: "all" },
      ...areas.items.map((area) => ({
        label: area.title,
        value: area.slug,
      })),
    ];
    // キーワードフィルター用オプション
    const keywordOptions = shuffle(tags.items)
      .slice(0, 10)
      .map((tag) => ({
        label: tag.title,
        value: tag.slug,
      }));

    return (
      <>
        <div>
          <section className="container pt-[80px] pb-[52px] mx-auto px-5">
            <div className="md:flex hidden space-x-4 items-center">
              <Image src={iconSpot} alt="施設・史跡" width={40} height={40} />
              <h2 className="text-[36px] text-ninjack-white font-bold">
                施設・史跡
              </h2>
            </div>
            <div className="flex flex-row md:hidden items-center justify-between">
              <div className="flex flex-row gap-4">
                <Image src={iconSpot} alt="創作作品" width={40} height={40} />
                <h2 className="text-[28px] font-bold text-ninjack-white">
                  施設・史跡
                </h2>
              </div>
              <FilterItem
                categoryOptions={categoryOptions}
                areaOptions={areaOptions}
                keywordOptions={keywordOptions}
                modelType="spot"
              />
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
                categories={categories.items}
                area={areas.items}
                tag={shuffle(tags.items).slice(0, 10)}
              />
            </div>

            <div className="mb-20 grid md:grid-cols-3 grid-cols-2 md:gap-[40px] gap-6">
              {list.items.length === 0 ? (
                <div className="text-center text-ninjack-text-gray">
                  該当するスポットが見つかりませんでした
                </div>
              ) : (
                list.items.map((item, index) => (
                  <div key={`spot-${item.slug}-${index}`}>
                    <SpotListItem
                      image={item.image?.[0]?.url || "/noimage.png"}
                      category={item.category.title || ""}
                      areaName={item.area || ""}
                      title={item.title || ""}
                      price={item.price || ""}
                      href={`/spot/${item.slug}`}
                    />
                  </div>
                ))
              )}
            </div>
          </section>

          <Pagination totalPages={totalPages} />
        </div>
      </>
    );
  } catch (error) {
    console.error("SpotPage rendering error:", error);

    return (
      <div className="container mx-auto px-5 py-20 text-center">
        <h2 className="text-2xl text-ninjack-white mb-4">
          データの読み込みに問題が発生しました
        </h2>
        <p className="text-ninjack-text-gray mb-8">
          申し訳ありませんが、ページの表示中にエラーが発生しました。
          <br />
          しばらく経ってから再度お試しください。
        </p>
        <Link
          href="/spot"
          className="bg-ninjack-purple text-white px-6 py-2 rounded-lg"
        >
          施設・史跡ページに戻る
        </Link>
      </div>
    );
  }
}
