"use client";

import Image from "next/image";
import iconActivity from "@/assets/icon-fiction.svg";
import illus1 from "@/assets/illus-5.png";
import CheckboxGroup from "@/app/components/checkboxGroup";
import KeywordsGroup from "@/app/components/keywordsGroup";
import imageFictionThumb from "@/assets/image-fiction-thumb.png";
import { useRouter } from "next/navigation";
import FictionItem from "@/app/components/Common/FictionItem";
import { title } from "process";
import Pagination from "@/app/components/pagination";
import FilterItem from "@/app/components/filterItem";

import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import Link from "next/link";
import SearchForm from "@/app/components/Common/SearchForm";
import { getCategoryList } from "@/lib/contentful/sharedModel";
import { getCultureList } from "./fetcher";
import { getTagList } from "../tag/fetcher";
import { shuffle } from "@/lib/util/shuffle";

const PER_PAGE = 12;

export default async function FictionPage({
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
  const list = await getCultureList({
    categories: params.categories ? toArrayOfStrings(params.categories) : [],
    tag: params.tag || "",
    page: currentPage,
    perPage: PER_PAGE,
  });

  const totalPages = Math.ceil(Number(list.total) / PER_PAGE);
  const categories = await getCategoryList("cultureCategory");
  const tag = await getTagList();

  const router = useRouter();
  const showDetail = (index: number) => {
    router.push(`/fiction/${index}`);
  };
  const handlePageChange = () => {};

  return (
    <>
      <SearchForm
        categories={categories.items}
        tag={shuffle(tag.items).slice(0, 10)}
      />
      <h2>商品・忍具一覧</h2>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>カテゴリ</th>
            <th>画像</th>
          </tr>
        </thead>
        <tbody>
          {list.items.map((item) => (
            <tr key={item.slug}>
              <td>
                <Link href={`/fiction/${item.slug}`} key={item.slug}>
                  {item.title}
                </Link>
              </td>

              <td>
                {item.category?.map((ct) => (
                  <p key={ct.slug}>{ct.title}</p>
                ))}
              </td>
              <td>
                {item.image?.map((img) => (
                  <Image
                    key={img.alt}
                    src={img.url}
                    alt={img.alt}
                    width={324}
                    height={160}
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} />
      <div>
        <section className="container pt-[80px] pb-[52px] mx-auto px-5">
          <div className="md:flex hidden space-x-4 items-center">
            <Image src={iconActivity} alt="創作作品" width={40} height={40} />
            <h2 className="text-[36px] text-ninjack-white">創作作品</h2>
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
        <section className="container md:pb-[160px] mx-auto px-5 flex md:space-x-[60px]">
          <div className="md:block hidden max-w-[300px]">
            <CheckboxGroup
              label="エリア名で絞り込む"
              options={[
                { label: "すべて", value: "すべて" },
                { label: "マンガ", value: "マンガ" },
                { label: "アニメ", value: "アニメ" },
                { label: "映画", value: "映画" },
                { label: "ドラマ", value: "ドラマ" },
                { label: "舞台", value: "舞台" },
                { label: "小説", value: "小説" },
                { label: "ゲーム", value: "ゲーム" },
                { label: "音楽", value: "音楽" },
                { label: "その他", value: "その他" },
              ]}
              onChange={(selectedValues) => {
                console.log(selectedValues);
              }}
              customClass="w-[240px] py-8"
              defaultCheckedValues={["すべて"]}
            />
            <KeywordsGroup
              label="キーワードから探す"
              keywords={[
                { label: "キーワード", value: "キーワード" },
                { label: "忍者体験", value: "忍者体験" },
                { label: "修行", value: "修行" },
                { label: "キーワード", value: "キーワード" },
                { label: "忍者体験", value: "忍者体験" },
                { label: "キーワード", value: "キーワード" },
                { label: "キーワード", value: "キーワード" },
                { label: "忍者体験", value: "忍者体験" },
                { label: "修行", value: "修行" },
              ]}
            />
          </div>
          <div>
            <div className="mb-20 grid md:grid-cols-4 grid-cols-2 md:gap-[40px] gap-8">
              {finctions.map((item: any, index: any) => {
                return (
                  <button key={index} onClick={() => showDetail(index)}>
                    <FictionItem
                      image={item.image}
                      title={item.title}
                      category={item.category}
                      price={item.price}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

const finctions = [
  {
    image: imageFictionThumb,
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    category: "ものづくり",
    price: "",
  },
  {
    image: imageFictionThumb,
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    category: "ものづくり",
    price: "",
  },
  {
    image: imageFictionThumb,
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    category: "ものづくり",
    price: "",
  },
  {
    image: imageFictionThumb,
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    category: "ものづくり",
    price: "",
  },
  {
    image: imageFictionThumb,
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    category: "ものづくり",
    price: "",
  },
  {
    image: imageFictionThumb,
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    category: "ものづくり",
    price: "",
  },
  {
    image: imageFictionThumb,
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    category: "ものづくり",
    price: "",
  },
  {
    image: imageFictionThumb,
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    category: "ものづくり",
    price: "",
  },
  {
    image: imageFictionThumb,
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    category: "ものづくり",
    price: "",
  },
  {
    image: imageFictionThumb,
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    category: "ものづくり",
    price: "",
  },
  {
    image: imageFictionThumb,
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    category: "ものづくり",
    price: "",
  },
  {
    image: imageFictionThumb,
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    category: "ものづくり",
    price: "",
  },
];
