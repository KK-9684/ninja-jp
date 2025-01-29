"use client";

import Image from "next/image";
import iconActivity from "@/assets/icon-research.svg";
import illus4 from "@/assets/illus-4.png";
import CheckboxGroup from "@/app/components/checkboxGroup";
import KeywordsGroup from "@/app/components/keywordsGroup";
import { useRouter } from "next/navigation";
import ResearchItem from "@/app/components/Common/researchItem";
import imageNinjas from "@/assets/image-ninjas.jpg";
import Pagination from "@/app/components/pagination";
import FilterItem from "@/app/components/filterItem";

export default function ResearchPage() {
  const router = useRouter();
  const showDetail = (index: number) => {
    router.push(`/research/${index}`);
  }
  const handlePageChange = () => {

  }
  return (
    <div>
      <section className="container pt-[80px] pb-[52px] mx-auto px-5">
        <div className="md:flex hidden space-x-4 items-center">
          <Image src={iconActivity} alt="体験・修行" width={40} height={40} />
          <h2 className="text-[36px] text-ninjack-white">研究情報</h2>
        </div>
        <div className="flex flex-row md:hidden items-center justify-between">
          <div className="flex flex-row gap-4">
            <Image src={iconActivity} alt="創作作品" width={40} height={40} />
            <h2 className="text-[28px] font-bold text-ninjack-white">研究情報</h2>
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
      <section className="container md:pb-[160px] mx-auto px-5 flex md:space-x-[60px]">
      <div className="md:block hidden max-w-[300px]">
          <CheckboxGroup
            label="カテゴリで絞り込む"
            options={[
              { label: "すべて", value: "すべて" },
              { label: "書籍・論文", value: "書籍・論文" },
              { label: "歴史・人物", value: "歴史・人物" },
              { label: "忍術", value: "忍術" },
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
          <div className="mb-20">
            {researchList.map((list: any, index : any) => {
              return (
                <button key={index} onClick={() => showDetail(index)}>
                  <ResearchItem
                    image={list.image}
                    categroy={list.category}
                    title={list.title}
                    content={list.content}
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
  );
}

const researchList = [
  {
    image:imageNinjas,
    category:"ものづくり",
    title:'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
    content: "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ…"
  }, 
  {
    image:imageNinjas,
    category:"ものづくり",
    title:'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
    content: "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ…"
  }, 
  {
    image:imageNinjas,
    category:"ものづくり",
    title:'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
    content: "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ…"
  }, 
  {
    image:imageNinjas,
    category:"ものづくり",
    title:'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
    content: "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ…"
  }, 
  {
    image:imageNinjas,
    category:"ものづくり",
    title:'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
    content: "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ…"
  }, 
  {
    image:imageNinjas,
    category:"ものづくり",
    title:'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
    content: "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ…"
  }, 
  {
    image:imageNinjas,
    category:"ものづくり",
    title:'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
    content: "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ…"
  }, 
  {
    image:imageNinjas,
    category:"ものづくり",
    title:'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
    content: "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ…"
  }, 
  {
    image:imageNinjas,
    category:"ものづくり",
    title:'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
    content: "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ…"
  }, 
  {
    image:imageNinjas,
    category:"ものづくり",
    title:'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
    content: "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ…"
  }, 
  {
    image:imageNinjas,
    category:"ものづくり",
    title:'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
    content: "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ…"
  }, 
  {
    image:imageNinjas,
    category:"ものづくり",
    title:'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
    content: "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ…"
  }, 
];
