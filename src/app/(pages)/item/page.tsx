"use client";

import Image from "next/image";
import iconActivity from "@/assets/icon-item.svg";
import illus3 from "@/assets/illus-3.png";
import CheckboxGroup from "@/app/components/checkboxGroup";
import KeywordsGroup from "@/app/components/keywordsGroup";
import { itemList } from "@/app/constant/itemList";
import { useRouter } from "next/navigation";
import ItemItem , {ItemItemProps} from "@/app/components/Common/itemItem";
import Pagination from "@/app/components/pagination";
import FilterItem from "@/app/components/filterItem";

export default function ItemPage() {
  const router = useRouter();
  const showDetail = (index: number) => {
    router.push(`/item/${index}`);
  }
  const handlePageChange = () => {

  }
  return (
    <div>
      <section className="container pt-[80px] pb-[52px] mx-auto px-5">
        <div className="md:flex hidden space-x-4 items-center">
          <Image src={iconActivity} alt="体験・修行" width={40} height={40} />
          <h2 className="text-[36px] text-ninjack-white">商品・忍具</h2>
        </div>

        <div className="flex flex-row md:hidden items-center justify-between">
          <div className="flex flex-row gap-4">
            <Image src={iconActivity} alt="創作作品" width={40} height={40} />
            <h2 className="text-[28px] font-bold text-ninjack-white">商品・忍具</h2>
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
      <section className="container md:pb-[160px] mx-auto px-5 flex md:space-x-[60px]">
        <div className="md:block hidden max-w-[300px]">
          <CheckboxGroup
            label="カテゴリで絞り込む"
            options={[
              { label: "すべて", value: "すべて" },
              { label: "忍具", value: "忍具" },
              { label: "衣装", value: "衣装" },
              { label: "書籍", value: "書籍" },
              { label: "アクセサリー", value: "アクセサリー" },
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
          <div className="mb-20 grid md:grid-cols-4 grid-cols-2 md:gap-[40px] gap-6">
            {itemList.map((item: any, index : any) => {
              return (
                <button key={index} onClick={() => showDetail(index)}>
                  <ItemItem
                    image={item.image}   
                    category="ものづくり"   
                    title={item.title}
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
  );
}
