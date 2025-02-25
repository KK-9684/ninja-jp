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
    const areaFilters = params.area ? toArrayOfStrings(params.area) : [];
    const tagFilter = typeof params.tag === "string" ? params.tag : "";

    console.log("Activity Page Filters:", {
      categoryFilters,
      areaFilters,
      tagFilter,
      currentPage,
    });

    // データ取得（並列処理で最適化）
    const [list, categories, areas, tags] = await Promise.all([
      getActivityList({
        categories: categoryFilters,
        area: areaFilters,
        tag: tagFilter,
        page: currentPage,
        perPage: PER_PAGE,
      }),
      getCategoryList("activityCategory"),
      getAreaList(),
      getTagList(),
    ]);

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

    const tagOptions = shuffle(tags.items)
      .slice(0, 8)
      .map((tag) => ({
        label: tag.title,
        value: tag.slug,
      }));

    const totalPages = Math.ceil(Number(list.total) / PER_PAGE);

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
              <Image
                src={iconActivity}
                alt="体験・修行"
                width={40}
                height={40}
              />
              <h2 className="text-[28px] text-ninjack-white font-bold">
                体験・修行
              </h2>
            </div>
            {/* 修正したFilterItemを使用 */}
            <FilterItem
              categoryOptions={categoryOptions}
              areaOptions={areaOptions}
              keywordOptions={tagOptions}
              modelType="activity"
            />
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
              area={areas.items}
              tag={shuffle(tags.items).slice(0, 10)}
              modelType="activity"
            />
          </div>
          <div className="flex flex-col w-[100%]">
            {/* アクティブフィルターの表示 */}
            {(categoryFilters.length > 0 ||
              areaFilters.length > 0 ||
              tagFilter) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {categoryFilters.map((slug) => {
                  const category = categories.items.find(
                    (c) => c.slug === slug
                  );
                  return category ? (
                    <div
                      key={`cat-${slug}`}
                      className="bg-ninjack-purple bg-opacity-20 text-ninjack-white px-3 py-1 rounded-full text-sm"
                    >
                      {category.title}
                    </div>
                  ) : null;
                })}

                {areaFilters.map((slug) => {
                  const area = areas.items.find((a) => a.slug === slug);
                  return area ? (
                    <div
                      key={`area-${slug}`}
                      className="bg-ninjack-purple bg-opacity-20 text-ninjack-white px-3 py-1 rounded-full text-sm"
                    >
                      {area.title}
                    </div>
                  ) : null;
                })}

                {tagFilter && (
                  <div className="bg-ninjack-purple bg-opacity-20 text-ninjack-white px-3 py-1 rounded-full text-sm">
                    #
                    {tags.items.find((t) => t.slug === tagFilter)?.title ||
                      tagFilter}
                  </div>
                )}
              </div>
            )}

            {/* 結果数の表示 */}
            <div className="mb-6 text-ninjack-text-gray">
              {list.total}件の体験・修行が見つかりました
            </div>

            {/* 検索結果表示 */}
            {list.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-ninjack-text-gray">
                <p className="text-xl mb-4">
                  該当する体験・修行が見つかりませんでした
                </p>
                <p>検索条件を変更して再度お試しください</p>
              </div>
            ) : (
              <div className="space-y-8">
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
            )}
          </div>
        </section>
        <Pagination totalPages={totalPages} />
      </>
    );
  } catch (error) {
    // 全体的なエラーハンドリング
    console.error("ActivityPage rendering error:", error);

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
          href="/activity"
          className="bg-ninjack-purple text-white px-6 py-2 rounded-lg"
        >
          体験・修行ページに戻る
        </Link>
      </div>
    );
  }
}
