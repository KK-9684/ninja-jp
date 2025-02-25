import Image from "next/image";
import iconActivity from "@/assets/icon-fiction.svg";
import illus1 from "@/assets/illus-5.png";
import FictionItem from "@/app/components/Common/FictionItem";
import FilterItem from "@/app/components/filterItem";

import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import SearchForm from "@/app/components/Common/SearchForm";
import { getCategoryList } from "@/lib/contentful/sharedModel";
import { getFictionList } from "./fetcher";
import { getTagList } from "../tag/fetcher";
import { shuffle } from "@/lib/util/shuffle";
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

    console.log("Fiction page filters:", {
      categoryFilters,
      tagFilter,
      currentPage,
    });

    // データ取得（並列処理で最適化）
    const [list, categories, tags] = await Promise.all([
      getFictionList({
        categories: categoryFilters,
        tag: tagFilter,
        page: currentPage,
        perPage: PER_PAGE,
      }),
      getCategoryList("spotCategory"),
      getTagList(),
    ]);

    const totalPages = Math.ceil(Number(list.total) / PER_PAGE);

    // フィルター用オプション
    const categoryOptions = [
      { label: "すべて", value: "all" },
      ...categories.items.map((cat) => ({
        label: cat.title,
        value: cat.slug,
      })),
    ];

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
              <Image src={iconActivity} alt="創作作品" width={40} height={40} />
              <h2 className="text-[36px] text-ninjack-white font-bold">
                創作作品
              </h2>
            </div>

            <div className="flex flex-row md:hidden items-center justify-between">
              <div className="flex flex-row gap-4">
                <Image
                  src={iconActivity}
                  alt="創作作品"
                  width={40}
                  height={40}
                />
                <h2 className="text-[28px] font-bold text-ninjack-white">
                  創作作品
                </h2>
              </div>
              {/* 修正したFilterItemを使用 */}
              <FilterItem
                categoryOptions={categoryOptions}
                keywordOptions={keywordOptions}
                modelType="fiction"
              />
            </div>

            <div className="md:flex hidden space-x-[88px] items-center">
              <p className="text-ninjack-text-gray text-[18px] leading-loose">
                忍者をテーマにした映画・漫画・アニメ・小説・ゲームなどの創作の世界をご案内します。フィクション作品に登場する多彩な忍者キャラクターやストーリーを見れば、あなたにぴったりの忍者作品があるかも？ぜひとも好きな忍者を見つけてくだされ！
              </p>
              <Image src={illus1} alt="忍者イラスト" width={274} height={150} />
            </div>
            <div className="md:hidden flex flex-col gap-8 items-center mt-10">
              <Image src={illus1} alt="忍者イラスト" width={265} height={150} />
              <p className="text-ninjack-text-gray text-[18px] leading-loose">
                忍者をテーマにした映画・漫画・アニメ・小説・ゲームなどの創作の世界をご案内します。フィクション作品に登場する多彩な忍者キャラクターやストーリーを見れば、あなたにぴったりの忍者作品があるかも？ぜひとも好きな忍者を見つけてくだされ！
              </p>
            </div>
          </section>

          {/* メインコンテンツ */}
          <section className="container md:pb-[160px] pb-[40px] mx-auto px-5 flex gap-[60px]">
            <div className="hidden md:block min-w-[240px] max-w-[300px]">
              <SearchForm
                categories={categories.items}
                tag={shuffle(tags.items).slice(0, 10)}
                modelType="fiction"
              />
            </div>
            <div className="w-full">
              {/* 結果数の表示 */}
              <div className="mb-6 text-ninjack-text-gray">
                {list.total}件の創作作品が見つかりました
              </div>

              {/* 検索結果表示 */}
              {list.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-ninjack-text-gray">
                  <p className="text-xl mb-4">
                    該当する創作作品が見つかりませんでした
                  </p>
                  <p>検索条件を変更して再度お試しください</p>
                </div>
              ) : (
                <div className="mb-20 grid md:grid-cols-4 grid-cols-2 md:gap-[40px] gap-8">
                  {list.items.map((item, index) => (
                    <div key={`fiction-${item.slug}-${index}`}>
                      <FictionItem
                        image={item.image?.[0]?.url || "/noimage.png"}
                        category={item.category?.[0]?.title || ""}
                        title={item.title || ""}
                        href={`/fiction/${item.slug}`}
                      />
                    </div>
                  ))}
                </div>
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
          href="/fiction"
          className="bg-ninjack-purple text-white px-6 py-2 rounded-lg"
        >
          施設・史跡ページに戻る
        </Link>
      </div>
    );
  }
}
