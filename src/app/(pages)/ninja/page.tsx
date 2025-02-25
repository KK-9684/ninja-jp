import Image from "next/image";
import iconActivity from "@/assets/icon-ninja.svg";
import illus6 from "@/assets/illus-6.png";
import NinjaItem from "@/app/components/Common/ninjaItem";
import FilterItem from "@/app/components/filterItem";

import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import SearchForm from "@/app/components/Common/SearchForm";
import { getCategoryList } from "@/lib/contentful/sharedModel";
import { getMemberList } from "./fetcher";
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

    console.log("Item Page Filters:", {
      categoryFilters,
      currentPage,
    });

    // データ取得（並列処理で最適化）
    const [list, categories] = await Promise.all([
      getMemberList({
        categories: categoryFilters,
        page: currentPage,
        perPage: PER_PAGE,
      }),
      getCategoryList("memberCategory"),
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

    return (
      <>
        <div>
          <section className="container pt-[80px] pb-[52px] mx-auto px-5">
            <div className="md:flex hidden space-x-4 items-center">
              <Image src={iconActivity} alt="現代忍者" width={40} height={40} />
              <h2 className="text-[36px] text-ninjack-white font-bold">
                現代忍者
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
                <h2 className="text-[28px] text-ninjack-white font-bold">
                  現代忍者
                </h2>
              </div>
              <FilterItem categoryOptions={categoryOptions} modelType="ninja" />
            </div>

            <div className="md:flex hidden space-x-[88px] items-center">
              <p className="text-ninjack-text-gray text-[18px] leading-loose">
                忍者ショーで人を魅了する忍者や、自ら修行を重ねて伝統的な忍術を後世へと残そうとする忍者、忍者を学問的に研究する専門家など、さまざまな形で活躍する現代の忍者たちを取り上げます。気になる忍者への任務の依頼も承りまする！
              </p>
              <Image src={illus6} alt="忍者イラスト" width={274} height={150} />
            </div>
            <div className="md:hidden flex flex-col gap-8 items-center mt-10">
              <Image src={illus6} alt="忍者イラスト" width={265} height={150} />
              <p className="text-ninjack-text-gray text-[18px] leading-loose">
                忍者ショーで人を魅了する忍者や、自ら修行を重ねて伝統的な忍術を後世へと残そうとする忍者、忍者を学問的に研究する専門家など、さまざまな形で活躍する現代の忍者たちを取り上げます。気になる忍者への任務の依頼も承りまする！
              </p>
            </div>
          </section>
          {/* メインコンテンツ */}
          <section className="container md:pb-[160px] pb-[40px] mx-auto px-5 flex gap-[60px]">
            <div className="hidden md:block min-w-[240px] max-w-[300px]">
              <SearchForm categories={categories.items} />
            </div>
            <div>
              <div className="mb-20 grid md:grid-cols-3 grid-cols-2 md:gap-[40px] gap-8">
                {list.items.map((item, index) => {
                  if (!item?.slug) return null; // 必要なデータの存在チェック
                  return (
                    <div key={`research-${item.slug}-${index}`}>
                      <NinjaItem
                        image={item.image?.[0]?.url || "/noimage.png"}
                        category={
                          (item.category && item.category[0].slug) || ""
                        }
                        title={item.name || ""}
                        href={`/ninja/${item.slug}`}
                        position={item.position || ""}
                        summary={item.summary}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <Pagination totalPages={totalPages} />
        </div>
      </>
    );
  } catch (error) {
    console.error("ItemPage rendering error:", error);

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
          href="/ninja"
          className="bg-ninjack-purple text-white px-6 py-2 rounded-lg"
        >
          忍者ページに戻る
        </Link>
      </div>
    );
  }
}
