"use client";

import Image from "next/image";
import iconActivity from "@/assets/icon-ninja.svg";
import illus6 from "@/assets/illus-6.png";
import CheckboxGroup from "@/app/components/checkboxGroup";
import KeywordsGroup from "@/app/components/keywordsGroup";
import { useRouter } from "next/navigation";
import imageNinjaThumb from "@/assets/image-ninja-thumb.jpg";
import NinjaItem from "@/app/components/Common/ninjaItem";
import Pagination from "@/app/components/pagination";
import FilterItem from "@/app/components/filterItem";

import { toArrayOfStrings } from "@/lib/util/toArrayOfStrings";
import Link from "next/link";
import SearchForm from "@/app/components/Common/SearchForm";
import { getCategoryList } from "@/lib/contentful/sharedModel";
import { getMemberList } from "./fetcher";

const PER_PAGE = 12;

export default async function NinjaPage({
  searchParams,
}: {
  searchParams: {
    page: string;
    categories: string | string[];
  };
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const list = await getMemberList({
    categories: params.categories ? toArrayOfStrings(params.categories) : [],
    page: currentPage,
    perPage: PER_PAGE,
  });

  const totalPages = Math.ceil(Number(list.total) / PER_PAGE);
  const categories = await getCategoryList("memberCategory");

  const router = useRouter();
  const showDetail = (index: number) => {
    router.push(`/ninja/${index}`);
  };
  const handlePageChange = () => {};

  return (
    <>
      <SearchForm categories={categories.items} />
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
                <Link href={`/ninja/${item.slug}`} key={item.slug}>
                  {item.name}
                </Link>
              </td>

              <td>
                {item.category?.map((ct) => (
                  <p key={ct.slug}>{ct.name}</p>
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
            <Image src={iconActivity} alt="現代忍者" width={40} height={40} />
            <h2 className="text-[36px] text-ninjack-white">現代忍者</h2>
          </div>

          <div className="flex flex-row md:hidden items-center justify-between">
            <div className="flex flex-row gap-4">
              <Image src={iconActivity} alt="創作作品" width={40} height={40} />
              <h2 className="text-[28px] font-bold text-ninjack-white">
                現代忍者
              </h2>
            </div>
            <FilterItem />
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
        <section className="container md:pb-[160px] mx-auto px-5 flex md:space-x-[60px]">
          <div className="md:block hidden max-w-[300px]">
            <CheckboxGroup
              label="エリア名で絞り込む"
              options={[
                { label: "すべて", value: "すべて" },
                { label: "団体・チーム", value: "団体・チーム" },
                { label: "個人", value: "個人" },
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
            <div className="mb-20 grid md:grid-cols-3 grid-cols-2 md:gap-[40px] gap-8">
              {ninjas.map((item: any, index: any) => {
                return (
                  <button key={index} onClick={() => showDetail(index)}>
                    <NinjaItem
                      image={item.image}
                      category="ものづくり"
                      title={item.title}
                      subTitle={item.subTitle}
                      content={item.content}
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

const ninjas = [
  {
    image: imageNinjaThumb,
    title: "名前名前名前名前",
    subTitle: "ここに肩書き入れる",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ",
  },
  {
    image: imageNinjaThumb,
    title: "名前名前名前名前",
    subTitle: "ここに肩書き入れる",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ",
  },
  {
    image: imageNinjaThumb,
    title: "名前名前名前名前",
    subTitle: "ここに肩書き入れる",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ",
  },
  {
    image: imageNinjaThumb,
    title: "名前名前名前名前",
    subTitle: "ここに肩書き入れる",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ",
  },
  {
    image: imageNinjaThumb,
    title: "名前名前名前名前",
    subTitle: "ここに肩書き入れる",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ",
  },
  {
    image: imageNinjaThumb,
    title: "名前名前名前名前",
    subTitle: "ここに肩書き入れる",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ",
  },
  {
    image: imageNinjaThumb,
    title: "名前名前名前名前",
    subTitle: "ここに肩書き入れる",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ",
  },
  {
    image: imageNinjaThumb,
    title: "名前名前名前名前",
    subTitle: "ここに肩書き入れる",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ",
  },
  {
    image: imageNinjaThumb,
    title: "名前名前名前名前",
    subTitle: "ここに肩書き入れる",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ",
  },
  {
    image: imageNinjaThumb,
    title: "名前名前名前名前",
    subTitle: "ここに肩書き入れる",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ",
  },
  {
    image: imageNinjaThumb,
    title: "名前名前名前名前",
    subTitle: "ここに肩書き入れる",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ",
  },
  {
    image: imageNinjaThumb,
    title: "名前名前名前名前",
    subTitle: "ここに肩書き入れる",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ",
  },
];
