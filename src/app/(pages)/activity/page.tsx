"use client";

import Image from "next/image";
import iconActivity from "@/assets/icon-activity.svg";
import illus1 from "@/assets/illus-1.png";
import CheckboxGroup from "@/app/components/checkboxGroup";
import KeywordsGroup from "@/app/components/keywordsGroup";
import ActivityListItem, { ActivityListItemProps } from "@/app/components/Common/activityListItem";
import { activities } from "@/app/constant/activityList";
import { useRouter } from "next/navigation";
import Pagination from "@/app/components/pagination";
import FilterItem from "@/app/components/filterItem";


export default function ActivityPage() {
  const router = useRouter();
  const showDetail = (index: number) => {
    router.push(`/activity/${index}`);
  }

  const handlePageChange = () => {

  }
  return (
    <div>
      <section className="container pt-[80px] pb-[52px] mx-auto px-5 md:block hidden">
        <div className="md:flex hidden space-x-4 items-center">
          <Image src={iconActivity} alt="体験・修行" width={40} height={40} />
          <h2 className="text-[36px] text-ninjack-white">体験・修行</h2>
        </div>

        <div className="flex space-x-[88px] items-center">
          <p className="text-ninjack-text-gray text-[18px] leading-loose">
            昔の忍者たちが書き残した忍術書に記された秘伝の忍術や、忍者たちが実践していた修行を体験できます。子どもから大人まで、本格的な修行から気軽に楽しめるアクティビティまで、リアルな忍者の世界に浸るでござる！
          </p>
          <Image src={illus1} alt="忍者イラスト" width={274} height={150} />
        </div>
      </section>
      <section className="container pt-[80px] pb-[52px] mx-auto px-5 md:hidden">
        <div className="flex flex-row md:hidden items-center justify-between">
          <div className="flex flex-row gap-4">
            <Image src={iconActivity} alt="体験・修行" width={40} height={40} />
            <h2 className="text-[28px] font-bold text-ninjack-white">体験・修行</h2>
          </div>
          <FilterItem />
        </div>
        <div className="flex flex-col gap-6 items-center mt-8">
          <Image src={illus1} alt="忍者イラスト" width={274} height={150} />
          <p className="text-ninjack-text-gray text-[18px] leading-loose">
            昔の忍者たちが書き残した忍術書に記された秘伝の忍術や、忍者たちが実践していた修行を体験できます。子どもから大人まで、本格的な修行から気軽に楽しめるアクティビティまで、リアルな忍者の世界に浸るでござる！
          </p>
        </div>
      </section>
      <section className="container md:pb-[160px] pb-[40px] mx-auto px-5 flex ">
        <div className="hidden md:block max-w-[300px]">
          <CheckboxGroup
            label="カテゴリで絞り込む"
            options={[
              { label: "すべて", value: "すべて" },
              { label: "ものづくり", value: "ものづくり" },
              { label: "体験", value: "体験" },
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
        <div className="md:mb-20 grid md:grid-cols-1 grid-cols-2 gap-8">
          {activities.map((activity: ActivityListItemProps, index) => {
            return (
              <button key={index} onClick={() => showDetail(index)}>
                <ActivityListItem
                  image={activity.image}
                  category={activity.category}
                  areaName={activity.areaName}
                  title={activity.title}
                  time={activity.time}
                  price={activity.price}
                  imgWidth={320}
                  imgHeight={220}
                />
              </button>
            );
          })}
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
