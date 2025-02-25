import Image from "next/image";
import iconActivity from "@/assets/icon-research.svg";
import illus4 from "@/assets/illus-4.png";
import ResearchItem from "@/app/components/Common/researchItem";
import FilterItem from "@/app/components/filterItem";

import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import SearchForm from "@/app/components/Common/SearchForm";
import { getResearchList } from "./fetcher";
import { getCategoryList } from "@/lib/contentful/sharedModel";
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

    console.log("Research Page Filters:", {
      categoryFilters,
      tagFilter,
      currentPage,
    });

    // データ取得（並列処理で最適化）
    const [list, categories, tags] = await Promise.all([
      getResearchList({
        categories: categoryFilters,
        tag: tagFilter,
        page: currentPage,
        perPage: PER_PAGE,
      }),
      getCategoryList("researchCategory"),
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
              <Image src={iconActivity} alt="研究情報" width={40} height={40} />
              <h2 className="text-[36px] text-ninjack-white font-bold">
                研究情報
              </h2>
            </div>
            <div className="flex flex-row md:hidden items-center justify-between">
              <div className="flex flex-row gap-4">
                <Image
                  src={iconActivity}
                  alt="研究情報"
                  width={40}
                  height={40}
                />
                <h2 className="text-[28px] font-bold text-ninjack-white">
                  研究情報
                </h2>
              </div>
              <FilterItem
                categoryOptions={categoryOptions}
                keywordOptions={keywordOptions}
                modelType="research"
              />
            </div>
            <div className="md:flex hidden space-x-[88px] items-center">
              <p className="text-ninjack-text-gray text-[18px] leading-loose">
                戦国時代から江戸時代にかけて活躍した忍者たちの歴史や人物、忍術書に記された秘伝の忍術や
                現代における忍者をとりまく社会などの最新忍者研究を詳しくご紹介します。
                忍者の実像に迫り、その奥深い世界を覗いてみてくだされ！
              </p>
              <Image src={illus4} alt="忍者イラスト" width={274} height={150} />
            </div>
            <div className="md:hidden flex flex-col gap-8 items-center mt-10">
              <Image src={illus4} alt="忍者イラスト" width={265} height={150} />
              <p className="text-ninjack-text-gray text-[18px] leading-loose">
                戦国時代から江戸時代にかけて活躍した忍者たちの歴史や人物、忍術書に記された秘伝の忍術や
                現代における忍者をとりまく社会などの最新忍者研究を詳しくご紹介します。
                忍者の実像に迫り、その奥深い世界を覗いてみてくだされ！
              </p>
            </div>
          </section>

          {/* メインコンテンツ */}
          <section className="container md:pb-[160px] pb-[40px] mx-auto px-5 flex gap-[60px]">
            <div className="hidden md:block min-w-[240px] max-w-[300px]">
              <SearchForm
                categories={categories.items}
                tag={shuffle(tags.items).slice(0, 10)}
              />
            </div>

            <div className="mb-20">
              {list.items.length === 0 ? (
                <div className="text-center text-ninjack-text-gray">
                  該当する研究情報が見つかりませんでした
                </div>
              ) : (
                list.items.map((item, index) => (
                  <div key={`research-${item.slug}-${index}`}>
                    <ResearchItem
                      image={item.image?.[0]?.url || "/noimage.png"}
                      category={item.category?.title || ""}
                      title={item.title || ""}
                      href={`/research/${item.slug}`}
                      summary={item.summary}
                      content={item.content}
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
    console.error("ResearchPage rendering error:", error);

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
          href="/research"
          className="bg-ninjack-purple text-white px-6 py-2 rounded-lg"
        >
          研究情報ページに戻る
        </Link>
      </div>
    );
  }
}
