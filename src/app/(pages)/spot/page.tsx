"use client";

import Image from "next/image";
import iconSpot from "@/assets/icon-spot.svg";
import illus2 from "@/assets/illus-2.png";
import CheckboxGroup from "@/app/components/checkboxGroup";
import KeywordsGroup from "@/app/components/keywordsGroup";
import SpotListItem, { SpotListItemProps } from "@/app/components/Common/spotListItem";
import { spots } from "@/app/constant/spotList";
import { useRouter } from "next/navigation";
import Pagination from "@/app/components/pagination";
import FilterItem from "@/app/components/filterItem";

export default function SpotPage() {
  const router = useRouter();
  const showDetail = (index: number) => {
    router.push(`/spot/${index}`);
  }
  const handlePageChange = () =>{

  }
  return (
    <div>
      <section className="container pt-[80px] pb-[52px] mx-auto px-5">
        <div className="md:flex hidden space-x-4 items-center">
          <Image src={iconSpot} alt="施設・史跡" width={40} height={40} />
          <h2 className="text-[36px] text-ninjack-white">施設・史跡</h2>
        </div>
        <div className="flex flex-row md:hidden items-center justify-between">
          <div className="flex flex-row gap-4">
            <Image src={iconSpot} alt="創作作品" width={40} height={40} />
            <h2 className="text-[28px] font-bold text-ninjack-white">施設・史跡</h2>
          </div>
          <FilterItem />
        </div>
        <div className="md:flex hidden space-x-[88px] items-center">
          <p className="text-ninjack-text-gray text-[18px] leading-loose">
            忍者が活躍した歴史の残る史跡や忍者テーマの観光施設など、日本にはたくさんの忍者関連スポットがあります。古き時代の忍者たちの足跡をたどり、歴史的なロマンを感じてもよし。博物館や体験施設などで忍者を学び楽しむのもよし。さぁ、忍者を感じるたびに出かけましょうぞ！
          </p>
          <Image src={illus2} alt="忍者イラスト" width={265} height={150} />
        </div>

        <div className="md:hidden flex flex-col gap-8 items-center mt-10">
          <Image src={illus2} alt="忍者イラスト" width={265} height={150} />
          <p className="text-ninjack-text-gray text-[18px] leading-loose">
            忍者が活躍した歴史の残る史跡や忍者テーマの観光施設など、日本にはたくさんの忍者関連スポットがあります。古き時代の忍者たちの足跡をたどり、歴史的なロマンを感じてもよし。博物館や体験施設などで忍者を学び楽しむのもよし。さぁ、忍者を感じるたびに出かけましょうぞ！
          </p>
        </div>
      </section>
      <section className="container md:pb-[160px] mx-auto px-5 flex md:space-x-[60px]">
        <div className="md:block hidden max-w-[300px]">
          <CheckboxGroup
            label="カテゴリで絞り込む"
            options={[
              { label: "すべて", value: "すべて" },
              { label: "史跡", value: "史跡" },
              { label: "テーマパーク", value: "テーマパーク" },
              { label: "道場", value: "道場" },
              { label: "販売店", value: "販売店" },
              { label: "飲食店", value: "飲食店" },
              { label: "その他", value: "その他" },

            ]}
            onChange={(selectedValues) => {
              console.log(selectedValues);
            }}
            customClass="w-[240px] py-8"
            defaultCheckedValues={["すべて"]}
          />
          <CheckboxGroup
            label="エリア名で絞り込む"
            options={[
              { label: "すべて", value: "すべて" },
              { label: "北海道", value: "北海道" },
              { label: "東北", value: "東北" },
              { label: "関東", value: "関東" },
              { label: "中部", value: "中部" },
              { label: "近畿", value: "近畿" },
              { label: "中国", value: "中国" },
              { label: "四国", value: "四国" },
              { label: "九州", value: "九州" },
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
          <div className="mb-20 grid md:grid-cols-3 grid-cols-2 md:gap-[40px] gap-6">
            {spots.map((spots: SpotListItemProps, index) => {
              return (
                <button key={index} onClick={() => showDetail(index)}>
                  <SpotListItem
                    image={spots.image}
                    categroy={spots.categroy}
                    areaName={spots.areaName}
                    title={spots.title}

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
