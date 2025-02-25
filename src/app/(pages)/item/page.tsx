import Image from "next/image";
import iconActivity from "@/assets/icon-item.svg";
import illus3 from "@/assets/illus-3.png";
import ItemItem from "@/app/components/Common/itemItem";
import FilterItem from "@/app/components/filterItem";
import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import SearchForm from "@/app/components/Common/SearchForm";
import { getItemList } from "./fetcher";
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

    console.log("Item Page Filters:", {
      categoryFilters,
      tagFilter,
      currentPage,
    });

    // データ取得（並列処理で最適化）
    const [list, categories, tags] = await Promise.all([
      getItemList({
        categories: categoryFilters,
        tag: tagFilter,
        page: currentPage,
        perPage: PER_PAGE,
      }),
      getCategoryList("itemCategory"),
      getTagList(),
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
            {/* ヘッダー */}
            <div className="md:flex hidden space-x-4 items-center">
              <Image
                src={iconActivity}
                alt="商品・忍具"
                width={40}
                height={40}
              />
              <h2 className="text-[36px] text-ninjack-white font-bold">
                商品・忍具
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
                  商品・忍具
                </h2>
              </div>
              <FilterItem
                categoryOptions={categoryOptions}
                keywordOptions={keywordOptions}
                modelType="item"
              />
            </div>

            <div className="md:flex hidden space-x-[88px] items-center">
              <p className="text-ninjack-text-gray text-[18px] leading-loose">
                忍者が使用した衣装や道具、現代風にアレンジされた忍者グッズなどを取り揃えております。忍者を感じさせるユニークな忍具・忍器から、実用的なグッズまで、幅広く紹介しています。ここでおぬしのお気に入りの忍者アイテムを見つけるがよい！
              </p>
              <Image src={illus3} alt="忍者イラスト" width={274} height={150} />
            </div>
            <div className="md:hidden flex flex-col gap-8 items-center mt-10">
              <Image src={illus3} alt="忍者イラスト" width={265} height={150} />
              <p className="text-ninjack-text-gray text-[18px] leading-loose">
                忍者が使用した衣装や道具、現代風にアレンジされた忍者グッズなどを取り揃えております。忍者を感じさせるユニークな忍具・忍器から、実用的なグッズまで、幅広く紹介しています。ここでおぬしのお気に入りの忍者アイテムを見つけるがよい！
              </p>
            </div>
          </section>

          {/* メインコンテンツ */}
          <section className="container md:pb-[160px] pb-[40px] mx-auto px-5 flex gap-[60px]">
            {/* サイドバー（PCのみ表示） */}
            <div className="hidden md:block min-w-[240px] max-w-[300px]">
              <SearchForm
                categories={categories.items}
                tag={shuffle(tags.items).slice(0, 10)}
              />
            </div>

            {/* メインの商品リスト */}
            <div>
              <div className="mb-20 grid md:grid-cols-4 grid-cols-2 md:gap-[40px] gap-6">
                {list.items.length === 0 ? (
                  <div className="text-center text-ninjack-text-gray">
                    商品が見つかりませんでした。別のカテゴリを試してください。
                  </div>
                ) : (
                  list.items.map((item, index) => {
                    if (!item?.slug) return null;
                    return (
                      <div key={`item-${item.slug}-${index}`}>
                        <ItemItem
                          image={item.image?.[0]?.url || "/noimage.png"}
                          category={item.category?.[0]?.title || ""}
                          title={item.title}
                          price={item.price}
                          href={`/item/${item.slug}`}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          {/* ページネーション */}
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
          href="/item"
          className="bg-ninjack-purple text-white px-6 py-2 rounded-lg"
        >
          商品・忍具ページに戻る
        </Link>
      </div>
    );
  }
}
