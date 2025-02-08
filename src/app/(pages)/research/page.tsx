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

const PER_PAGE = 12;

type SearchParams = Promise<{
  page: string;
  categories: string | string[];
  tag: string | null;
}>;

export default async function ResearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const list = await getResearchList({
    categories: params.categories ? toArrayOfStrings(params.categories) : [],
    tag: params.tag || "",
    page: currentPage,
    perPage: PER_PAGE,
  });

  const totalPages = Math.ceil(Number(list.total) / PER_PAGE);
  const categories = await getCategoryList("researchCategory");
  const tag = await getTagList();

  return (
    <>
      <div>
        <section className="container pt-[80px] pb-[52px] mx-auto px-5">
          <div className="md:flex hidden space-x-4 items-center">
            <Image src={iconActivity} alt="体験・修行" width={40} height={40} />
            <h2 className="text-[36px] text-ninjack-white font-bold">
              研究情報
            </h2>
          </div>
          <div className="flex flex-row md:hidden items-center justify-between">
            <div className="flex flex-row gap-4">
              <Image src={iconActivity} alt="創作作品" width={40} height={40} />
              <h2 className="text-[28px] font-bold text-ninjack-white">
                研究情報
              </h2>
            </div>
            <FilterItem />
          </div>
          <div className="md:flex hidden space-x-[88px] items-center">
            <p className="text-ninjack-text-gray text-[18px] leading-loose">
              戦国時代から江戸時代にかけて活躍した忍者たちの歴史や人物、忍術書に記された秘伝の忍術や現代における忍者をとりまく社会などの最新忍者研究を詳しくご紹介します。忍者の実像に迫り、その奥深い世界を覗いてみてくだされ！
            </p>
            <Image src={illus4} alt="忍者イラスト" width={274} height={150} />
          </div>
          <div className="md:hidden flex flex-col gap-8 items-center mt-10">
            <Image src={illus4} alt="忍者イラスト" width={265} height={150} />
            <p className="text-ninjack-text-gray text-[18px] leading-loose">
              戦国時代から江戸時代にかけて活躍した忍者たちの歴史や人物、忍術書に記された秘伝の忍術や現代における忍者をとりまく社会などの最新忍者研究を詳しくご紹介します。忍者の実像に迫り、その奥深い世界を覗いてみてくだされ！
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
            <div className="mb-20">
              {list.items.map((item, index) => {
                if (!item?.slug) return null; // 必要なデータの存在チェック
                return (
                  <div key={`research-${item.slug}-${index}`}>
                    <ResearchItem
                      image={item.image?.[0]?.url || "/noimage.png"}
                      category={item.category.title || ""}
                      title={item.title || ""}
                      href={`/research/${item.slug}`}
                      summary={item.summary}
                      content={item.content}
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
