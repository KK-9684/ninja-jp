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

const PER_PAGE = 12;

type SearchParams = Promise<{
  page: string;
  categories: string | string[];
  tag: string | null;
}>;

export default async function ItemPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const list = await getItemList({
    categories: params.categories ? toArrayOfStrings(params.categories) : [],
    tag: params.tag || "",
    page: currentPage,
    perPage: PER_PAGE,
  });

  const totalPages = Math.ceil(Number(list.total) / PER_PAGE);
  const categories = await getCategoryList("itemCategory");
  const tag = await getTagList();
  return (
    <>
      <div>
        <section className="container pt-[80px] pb-[52px] mx-auto px-5">
          <div className="md:flex hidden space-x-4 items-center">
            <Image src={iconActivity} alt="体験・修行" width={40} height={40} />
            <h2 className="text-[36px] text-ninjack-white font-bold">
              商品・忍具
            </h2>
          </div>

          <div className="flex flex-row md:hidden items-center justify-between">
            <div className="flex flex-row gap-4">
              <Image src={iconActivity} alt="創作作品" width={40} height={40} />
              <h2 className="text-[28px] font-bold text-ninjack-white">
                商品・忍具
              </h2>
            </div>
            <FilterItem />
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
        <section className="container md:pb-[160px] pb-[40px] mx-auto px-5 flex gap-[60px]">
          <div className="hidden md:block min-w-[240px] max-w-[300px]">
            <SearchForm
              categories={categories.items}
              tag={shuffle(tag.items).slice(0, 10)}
            />
          </div>
          <div>
            <div className="mb-20 grid md:grid-cols-4 grid-cols-2 md:gap-[40px] gap-6">
              {list.items.map((item, index) => (
                <div key={`spot-${item.slug}-${index}`}>
                  <ItemItem
                    image={item.image?.[0]?.url || "/noimage.png"}
                    category={item.category?.[0].title || ""}
                    title={item.title}
                    price={item.price}
                    href={`/item/${item.slug}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
