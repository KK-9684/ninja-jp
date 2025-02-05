import IconSearch from "@/assets/icon-search-magazine.svg";
import Image from "next/image";
import MagazineList from "@/app/components/Common/magazineList";
import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import { getMagazineList } from "./fetcher";
// import { getTagList } from "../tag/fetcher";
// import { shuffle } from "@/lib/util/shuffle";
import Pagination from "@/app/components/Common/Pagination";
import TagList from "@/app/components/Common/TagList";
import clsx from "clsx";

const PER_PAGE = 12;

export default async function MagazinePage({
  searchParams,
}: {
  searchParams: {
    page: string;
    categories: string | string[];
    tag: string | null;
  };
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const list = await getMagazineList({
    categories: params.categories ? toArrayOfStrings(params.categories) : [],
    tag: params.tag || "",
    page: currentPage,
    perPage: PER_PAGE,
  });

  const totalPages = Math.ceil(Number(list.total) / PER_PAGE);

  // const tag = await getTagList();
  // const tagItems = shuffle(tag.items).slice(0, 20);

  return (
    <>
      <div className="container w-full mx-auto">
        <section className="flex flex-col gap-8 md:mt-[100px] mt-[64px]">
          <div className="flex md:flex-row flex-col justify-center md:space-x-5 gap-4 text-center md:text-[66px] text-[48px] leading-none">
            <span className="text-ninjack-purple">Ninjack</span>
            <span className="text-ninjack-white">MAGAZINE</span>
          </div>
          {/* FIXME:カテゴリ実装 */}
          <div className="border border-ninjack-line-gray rounded-[30px] flex min-w-[400px] md:overflow-hidden md:w-fit self-center mx-auto overflow-x-scroll">
            <div
              key="all"
              role="button"
              tabIndex={0}
              className="cursor-pointer"
            >
              <div
                className={clsx(
                  "md:py-4 py-3 md:px-5 px-4 textsm leading-none",
                  "border border-ninjack-line-gray rounded-[30px] bg-ninjack-bg-gray text-ninjack-white",
                  "hover:border hover:border-ninjack-line-gray hover:rounded-[30px] hover:bg-ninjack-bg-gray hover:text-ninjack-white"
                )}
              >
                すべて
              </div>
            </div>

            <div role="button" tabIndex={0} className="cursor-pointer">
              <div
                className={clsx(
                  "md:py-4 py-3 md:px-5 px-4 textsm leading-none border border-transparent",
                  "text-ninjack-text-gray md:text-[16px] text-[12px]",
                  "hover:border hover:border-ninjack-line-gray hover:rounded-[30px] hover:bg-ninjack-bg-gray hover:text-ninjack-white"
                )}
              >
                カテゴリ
              </div>
            </div>
            <div role="button" tabIndex={0} className="cursor-pointer">
              <div
                className={clsx(
                  "md:py-4 py-3 md:px-5 px-4 textsm leading-none border border-transparent",
                  "text-ninjack-text-gray md:text-[16px] text-[12px]",
                  "hover:border hover:border-ninjack-line-gray hover:rounded-[30px] hover:bg-ninjack-bg-gray hover:text-ninjack-white"
                )}
              >
                カテゴリ
              </div>
            </div>
            <div role="button" tabIndex={0} className="cursor-pointer">
              <div
                className={clsx(
                  "md:py-4 py-3 md:px-5 px-4 textsm leading-none border border-transparent",
                  "text-ninjack-text-gray md:text-[16px] text-[12px]",
                  "hover:border hover:border-ninjack-line-gray hover:rounded-[30px] hover:bg-ninjack-bg-gray hover:text-ninjack-white"
                )}
              >
                カテゴリ
              </div>
            </div>
            <div role="button" tabIndex={0} className="cursor-pointer">
              <div
                className={clsx(
                  "md:py-4 py-3 md:px-5 px-4 textsm leading-none border border-transparent",
                  "text-ninjack-text-gray md:text-[16px] text-[12px]",
                  "hover:border hover:border-ninjack-line-gray hover:rounded-[30px] hover:bg-ninjack-bg-gray hover:text-ninjack-white"
                )}
              >
                カテゴリ
              </div>
            </div>
            {/* <SectionLinkGroup links={sectionNinjackMagazineLinks} /> */}
          </div>
          <div className="md:px-[139px] px-8">
            <div className="flex flex-col gap-[20px] px-[23px] py-[20px] bg-ninjack-bg-gray rounded-[10px]">
              <div className="self-center flex flex-row gap-3">
                <Image src={IconSearch} alt="" />
                <span className="text-[14px] text-ninjack-white">
                  キーワードから探す
                </span>
              </div>
              <TagList limit={10} />
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 grid-cols-1 gap-[50px] mt-[80px] px-8 mb-10">
          {list.items.map((item, index) => (
            <div key={`magazine-${item.slug}-${index}`}>
              <MagazineList
                image={item.image?.[0].url || "/noimage.png"}
                newone={item.isNew}
                category={item.category?.[0].title || ""}
                date={item.createdAt}
                title={item.title}
                content={item.summary}
                href={`/magazine/${item.slug}`}
              />
            </div>
          ))}
        </section>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
