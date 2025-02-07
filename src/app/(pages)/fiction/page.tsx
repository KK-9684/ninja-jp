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

const PER_PAGE = 12;

type SearchParams = Promise<{
  page: string;
  categories: string | string[];
  tag: string | null;
}>;

export default async function FictionPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // データ取得
  const list = await getFictionList({
    categories: params.categories ? toArrayOfStrings(params.categories) : [],
    tag: params.tag || "",
    page: currentPage,
    perPage: PER_PAGE,
  });

  // totalPagesの計算を追加
  const totalPages = Math.ceil(Number(list.total) / PER_PAGE);

  // カテゴリーとタグのデータを取得
  const categories = await getCategoryList("cultureCategory");
  const tag = await getTagList();

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
              <Image src={iconActivity} alt="創作作品" width={40} height={40} />
              <h2 className="text-[28px] font-bold text-ninjack-white">
                創作作品
              </h2>
            </div>
            <FilterItem />
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
              tag={shuffle(tag.items).slice(0, 10)}
            />
          </div>
          <div>
            <div className="mb-20 grid md:grid-cols-4 grid-cols-2 md:gap-[40px] gap-8">
              {list.items.map((item, index) => {
                if (!item?.slug) return null;
                console.log(item);
                return (
                  <div key={`fiction-${item.slug}-${index}`}>
                    <FictionItem
                      image={item.image?.[0]?.url || "/noimage.png"}
                      category={item.category?.[0]?.title || ""} // 修正: オプショナルチェイニングを使用
                      title={item.title || ""}
                      href={`/fiction/${item.slug}`}
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
}
