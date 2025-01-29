"use client";

import Image from "next/image";
import iconNoroshi from "@/assets/icon_noroshi.svg";
import iconActivity from "@/assets/icon-activity.svg";
import iconItem from "@/assets/icon-item.svg";
import iconSearch from "@/assets/icon-search.svg";
import imageNinjas from "@/assets/image-ninjas.jpg";
import iconSpot from "@/assets/icon-spot.svg";
import iconResearch from "@/assets/icon-research.svg";
import iconFiction from "@/assets/icon-fiction.svg";
import iconNinja from "@/assets/icon-ninja.svg";
import imageItemThumb from "@/assets/image-item-thumb.jpg";
import imageFictionThumb from "@/assets/image-fiction-thumb.png";
import imageNinjaThumb from "@/assets/image-ninja-thumb.jpg";
import imageMagazineThumb from "@/assets/image-magazine-thumb.jpg";
import imageMagazineNew from "@/assets/image-magazine-new.png";
import imageNinjackConcept from "@/assets/image-ninjack-concept.png";
import DetailButton from "./components/Common/detailButton";
import NewsItem from "./components/Common/newsItem";
import ActivityItem from "./components/Common/activityItem";
import SectionTitlePart from "./components/Common/sectionTitlePart";
import ActivitySwiper from "./components/activitySwiper";
import SpotSwiper from "./components/spotSwiper";
import SearchKeysGroup from "./components/searchKeysGroup";
import ItemItem from "./components/Common/itemItem";
import ResearchItem from "./components/Common/researchItem";
import FictionItem from "./components/Common/FictionItem";
import NinjaItem from "./components/Common/ninjaItem";
import SectionLinkGroup from "./components/Common/sectionLinkGroup";
import { sectionFictionLinks, sectionNinjackMagazineLinks } from "./constant/sectionLinks";
import MagazineItem from "./components/Common/magazineItem";
import ContentCountItem from "./components/Common/contentCountItem";
import SpotSelector from "./components/spotSelector";

export default function Home() {
  return (
    <div>
      <section className="pt-9 pb-14 flex">
        <div className=" hidden w-3/12 h-[740px] text-center text-2xl text-ninjack-white ms-8 md:flex flex-col justify-center bg-ninjack-bg-gray">
          <div>動画を入れる</div>
          <div>スペース</div>
        </div>
        <div className="md:w-9/12 md:ms-[70px] w-full">
          <div className="flex gap-3 mb-10 pl-8">
            <Image src={iconNoroshi} alt="新着情報" />
            <div className="flex flex-col justify-between">
              <p className="text-ninjack-text-gray text-base leading-none">新着情報</p>
              <p className="text-[28px] text-ninjack-white font-bold leading-none">おすすめコンテンツ</p>
            </div>
          </div>
          <ActivitySwiper />
        </div>
      </section>

      <section className="container flex mx-auto px-5">

        <div className="md:flex hidden items-center px-[60px] py-10 bg-ninjack-bg-gray border rounded-[10px] border-ninjack-line-gray w-full">
          <div className="flex flex-col me-[130px]">
            <div className="flex items-center mb-8 ">
              <p className="text-ninjack-white md:text-2xl  leading-none me-3 ">WHAT’S NEW</p>
              <p className="text-ninjack-text-gray md:text-md  leading-none">/ 新着記事</p>
            </div>
            <DetailButton size={230} />
          </div>
          <div className="flex flex-col py-4">
            <NewsItem date="2024.01.01" type="ニュース" title="記事タイトル記事タイトル記事タイトル記事タイトル" />
            <NewsItem date="2024.01.01" type="レビュー" title="記事タイトル記事タイトル記事タイトル記事タイトル" />
            <NewsItem date="2024.01.01" type="インタビュー" title="記事タイトル記事タイトル記事タイトル記事タイトル" />
          </div>
        </div>

        <div className="flex flex-col self-start md:hidden p-8 bg-ninjack-bg-gray border rounded-[10px] border-ninjack-line-gray w-full">
          <div className="flex flex-col ">
            <div className="flex items-center mb-8 ">
              <p className="text-ninjack-white text-[20px] leading-none me-3">WHAT’S NEW</p>
              <p className="text-ninjack-text-gray text-[10px] leading-none">/ 新着記事</p>
            </div>
          </div>
          <div className="flex flex-col py-4">
            <NewsItem date="2024.01.01" type="ニュース" title="記事タイトル記事タイトル記事タイトル記事タイトル" />
            <NewsItem date="2024.01.01" type="レビュー" title="記事タイトル記事タイトル記事タイトル記事タイトル" />
            <NewsItem date="2024.01.01" type="インタビュー" title="記事タイトル記事タイトル記事タイトル記事タイトル" />
          </div>
          <DetailButton size={300} />
        </div>
      </section>

      <section className="container mx-auto md:py-[100px] py-12 px-5">
        <div className="md:flex hidden justify-between">
          <SectionTitlePart icon={iconActivity} title="体験・修行" subTitle="注目の忍者体験アクティビティ" />
          <DetailButton size={160} />
        </div>
        <div className="md:hidden">
          <SectionTitlePart icon={iconActivity} title="体験・修行" subTitle="注目の忍者体験アクティビティ" />
        </div>
        <div className="hidden md:grid md:grid-cols-2 grid-cols-1 gap-x-[72px] justify-between mt-10">
          <ActivityItem
            image={imageNinjas}
            category="ものづくり"
            areaName="エリア名"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            price="XXXX"
            time="1時間30分"
          />
          <ActivityItem
            image={imageNinjas} 
            category="ものづくり"
            areaName="エリア名"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            price="XXXX"
            time="1時間30分"
          />
          <ActivityItem
            image={imageNinjas}
            category="ものづくり"
            areaName="エリア名"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            price="XXXX"
            time="1時間30分"
          />
          <ActivityItem
            image={imageNinjas}
            category="ものづくり"
            areaName="エリア名"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            price="XXXX"
            time="1時間30分"
          />
          <ActivityItem
            image={imageNinjas}
            category="ものづくり"
            areaName="エリア名"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            price="XXXX"
            time="1時間30分"
          />
          <ActivityItem
            image={imageNinjas}
            category="ものづくり"
            areaName="エリア名"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            price="XXXX"
            time="1時間30分"
          />
        </div>
        <div className="md:hidden grid grid-cols-1 gap-6 justify-between my-10">
          <ActivityItem
            image={imageNinjas}
            category="ものづくり"
            areaName="エリア名"
            title="タイトルタイトルタイトルタイトルタイトル"
            price="XXXX"
            time="1時間30分"
          />
          <ActivityItem
            image={imageNinjas}
            category="ものづくり"
            areaName="エリア名"
            title="タイトルタイトルタイトルタイトルタイトル"
            price="XXXX"
            time="1時間30分"
          />
          <ActivityItem
            image={imageNinjas}
            category="ものづくり"
            areaName="エリア名"
            title="タイトルタイトルタイトルタイトルタイトル"
            price="XXXX"
            time="1時間30分"
          />
        </div>
        <div className="md:hidden mx-auto">
          <DetailButton size={350} />
        </div>
      </section>

      <section className="bg-ninjack-bg-gray">
        <div className="container flex md:flex-row flex-col gap-6 justify-between mx-auto px-5 md:py-[100px] py-8">
          <div className="flex flex-col space-y-10 md:me-[88px]">
            <SectionTitlePart icon={iconSpot} title="施設・史跡" subTitle="忍者の足跡を巡る" />
            <div className="text-ninjack-text-gray md:flex hidden flex-col text-center text-sm">
              <div className="text-ninjack-white border-b border-t border-ninjack-line-gray p-4">すべて</div>
              <div className="border-b border-ninjack-line-gray p-4">史跡</div>
              <div className="border-b border-ninjack-line-gray p-4">テーマパーク</div>
              <div className="border-b border-ninjack-line-gray p-4">道場</div>
              <div className="border-b border-ninjack-line-gray p-4">販売店</div>
              <div className="border-b border-ninjack-line-gray p-4">飲食店</div>
              <div className="border-b border-ninjack-line-gray p-4">その他</div>
            </div>
            <SpotSelector />
            <div className="hidden md:block">
              <DetailButton size={280} />
            </div>
          </div>
          <SpotSwiper />
          <div className=" md:hidden">
            <DetailButton size={280} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="trapezoid"></div>
          <div className="flex items-center mt-[-15px] mb-[-20px]">
            <Image src={iconSearch} alt="検索アイコン" className="me-[5.5px]" />
            <p className="text-[18px] text-ninjack-text-gray font-bold">気になるキーワードから探す</p>
          </div>
        </div>


      </section>

      <section className="container mx-auto md:py-[100px] py-10 px-5 ">
        <div className="flex flex-col items-center">
          <SearchKeysGroup />
        </div>
      </section>
      <section className="bg-ninjack-bg-gray">
        <div className="container mx-auto md:py-[100px] py-12 px-5">
          <div className="md:flex hidden justify-between">
            <SectionTitlePart icon={iconItem} title="商品・忍具" subTitle="おすすめの忍者アイテム" />
            <DetailButton size={160} />
          </div>
          <div className="md:hidden">
            <SectionTitlePart icon={iconItem} title="商品・忍具" subTitle="おすすめの忍者アイテム" />
          </div>
          <div className="grid md:grid-cols-5 grid-cols-3 md:gap-10 gap-4 justify-between mt-10">
            <ItemItem image={imageItemThumb} title="タイトルタイトルタイトルタイトルタイトルタイトルタイ" price="XXXX" category="" />
            <ItemItem image={imageItemThumb} title="タイトルタイトルタイトルタイトルタイトルタイトルタイ" price="XXXX" category="" />
            <ItemItem image={imageItemThumb} title="タイトルタイトルタイトルタイトルタイトルタイトルタイ" price="XXXX" category="" />
            <ItemItem image={imageItemThumb} title="タイトルタイトルタイトルタイトルタイトルタイトルタイ" price="XXXX" category="" />
            <ItemItem image={imageItemThumb} title="タイトルタイトルタイトルタイトルタイトルタイトルタイ" price="XXXX" category="" />
            <div className="md:hidden">
              <ItemItem image={imageItemThumb} title="タイトルタイトルタイトルタイトルタイトルタイトルタイ" price="XXXX" category="" />
            </div>
          </div>
          <div className="md:hidden mt-6">
            <DetailButton size={160} />
          </div>
        </div>
      </section>

      <section className="container mx-auto md:pt-[100px] md:pb-[140px] py-12 px-5">
        <div className="md:flex hidden justify-between">
          <SectionTitlePart icon={iconResearch} title="施設・史跡" subTitle="忍者の足跡を巡る" />
          <DetailButton size={160} />
        </div>
        <div className="md:hidden">
          <SectionTitlePart icon={iconResearch} title="施設・史跡" subTitle="忍者の足跡を巡る" />
        </div>
        <div className="hidden md:grid md:grid-cols-2 grid-cols-1 gap-x-[72px] justify-between mt-10">
          <ResearchItem
            image={imageNinjas}
            categroy="ものづくり"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ"
          />
          <ResearchItem
            image={imageNinjas}
            categroy="ものづくり"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ"
          />
          <ResearchItem
            image={imageNinjas}
            categroy="ものづくり"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ"
          />
          <ResearchItem
            image={imageNinjas}
            categroy="ものづくり"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ"
          />
          <ResearchItem
            image={imageNinjas}
            categroy="ものづくり"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ"
          />
          <ResearchItem
            image={imageNinjas}
            categroy="ものづくり"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ"
          />
        </div>
        <div className="flex flex-col md:hidden mt-6">
          <ResearchItem
            image={imageNinjas}
            categroy="ものづくり"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            content="これはじゅうもじですこれはじゅうもじですこれ..."
          />
          <ResearchItem
            image={imageNinjas}
            categroy="ものづくり"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            content="これはじゅうもじですこれはじゅうもじですこれ..."
          />
          <ResearchItem
            image={imageNinjas}
            categroy="ものづくり"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
            content="これはじゅうもじですこれはじゅうもじですこれ..."
          />
        </div>
        <div className="md:hidden mt-6">
          <DetailButton size={160} />
        </div>
      </section>

      <section className="bg-ninjack-bg-gray">
        <div className="container mx-auto py-[60px] px-5 flex md:flex-row flex-col justify-between items-center">
          <div>
            <div className="hidden md:block text-[40px] text-ninjack-white leading-none mb-3">View more </div>
            <div className="md:hidden mb-6">
              <div className="text-[24px] text-ninjack-white leading-none mb-3 flex flex-row gap-2">View more <div className="text-ninjack-purple">CONTENTS.</div></div>
            </div>
            <div className="text-[40px] leading-none mb-1 md:block hidden">
              <span className="text-ninjack-white">about </span>
              <span className="text-ninjack-purple">FICTION.</span>
            </div>

            <div className="text-ninjack-purple text-sm text-end leading-none hidden md:block">創作作品</div>
          </div>
          <div className="flex gap-6">
            <Image src={iconActivity} alt="体験・修行" width={72} height={72} className="md:m-8" />
            <Image src={iconSpot} alt="施設・史跡" width={72} height={72} className="md:m-8" />
            <Image src={iconItem} alt="商品・忍具" width={72} height={72} className="md:m-8" />
            <Image src={iconResearch} alt="研究情報" width={72} height={72} className="md:m-8" />
            <Image src={iconFiction} alt="創作作品" width={72} height={72} className="md:m-8" />
            <Image src={iconNinja} alt="現代忍者" width={72} height={72} className="md:m-8" />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto md:py-[100px] py-12 px-5">
          <div className="md:flex hidden justify-between mb-10">
            <SectionTitlePart icon={iconFiction} title="創作作品" subTitle="フィクション世界のNINJAたち" />
            <DetailButton size={160} />
          </div>
          <div className="md:hidden mb-8">
            <SectionTitlePart icon={iconFiction} title="創作作品" subTitle="フィクション世界のNINJAたち" />
          </div>
          <div className="">
            <SectionLinkGroup links={sectionFictionLinks} />
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 gap-10 justify-between mt-10">
            <FictionItem
              image={imageFictionThumb}
              title="タイトルタイトルタイトルタイトルタイトルタイトルタイトル"
              category="ものづくり"
              price="XXXX"
            />
            <FictionItem
              image={imageFictionThumb}
              title="タイトルタイトルタイトルタイトルタイトルタイトルタイトル"
              category="ものづくり"
              price="XXXX"
            />
            <FictionItem
              image={imageFictionThumb}
              title="タイトルタイトルタイトルタイトルタイトルタイトルタイトル"
              category="ものづくり"
              price="XXXX"
            />
            <FictionItem
              image={imageFictionThumb}
              title="タイトルタイトルタイトルタイトルタイトルタイトルタイトル"
              category="ものづくり"
              price="XXXX"
            />
            <div className="hidden md:block">
              <FictionItem
                image={imageFictionThumb}
                title="タイトルタイトルタイトルタイトルタイトルタイトルタイトル"
                category="ものづくり"
                price="XXXX"
              />
            </div>
          </div>

          <div className="md:hidden mt-8">
            <DetailButton size={160} />
          </div>
        </div>
      </section>

      <section className="bg-ninjack-bg-gray">
        <div className="container mx-auto md:py-[100px] py-12 px-5">
          <div className="md:flex hidden justify-between">
            <SectionTitlePart icon={iconNinja} title="現代忍者" subTitle="今を生きる忍者たち" />
            <DetailButton size={160} />
          </div>
          <div className="md:hidden">
            <SectionTitlePart icon={iconNinja} title="現代忍者" subTitle="今を生きる忍者たち" />
          </div>
          <div className="hidden md:grid grid-cols-4 gap-10 justify-between mt-10">
            <NinjaItem
              image={imageNinjaThumb}
              category=""
              title="名前名前名前名前"
              subTitle="ここに肩書き入れる"
              content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ"
            />
            <NinjaItem
              image={imageNinjaThumb}
              category=""
              title="名前名前名前名前"
              subTitle="ここに肩書き入れる"
              content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ"
            />
            <NinjaItem
              image={imageNinjaThumb}
              category=""
              title="名前名前名前名前"
              subTitle="ここに肩書き入れる"
              content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ"
            />
            <NinjaItem
              image={imageNinjaThumb}
              category=""
              title="名前名前名前名前"
              subTitle="ここに肩書き入れる"
              content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ"
            />
          </div>
          <div className="md:hidden mt-6 px-10">
            <NinjaItem
              image={imageNinjaThumb}
              category=""
              title="名前名前名前名前"
              subTitle="ここに肩書き入れる"
              content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ"
            />
          </div>
          <div className="md:hidden mt-6">
            <DetailButton size={160} />
          </div>
        </div>
      </section>
      
      <section className="">
        <div className="container mx-auto md:py-[100px] py-12 px-5">
          <div className="flex md:flex-row flex-col gap-4 justify-center space-x-5 md:text-[66px] text-[40px] leading-none mb-12">
            <span className="text-ninjack-purple text-center">Ninjack</span>
            <span className="text-ninjack-white text-center">MAGAZINE</span>
          </div>
          <div className="flex justify-center mb-20">
            <SectionLinkGroup links={sectionNinjackMagazineLinks} />
          </div>
          <div className="">
            <div className="flex items-baseline space-x-3 mb-10">
              <span className="text-ninjack-white text-[28px] leading-none">What’ new.</span>
              <span className="text-ninjack-text-gray text-sm leading-none">/ 新着記事</span>
            </div>
            <div className="flex md:flex-row flex-col justify-between gap-x-20">
              <div className="flex flex-col space-y-10">
                <Image src={imageMagazineNew} alt="記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル" className="" />
                <div>
                  <div className="flex justify-between mb-9">
                    <div className="flex space-x-4 items-cente r">
                      <div className="text-xs leading-none bg-ninjack-white px-[7px] py-[5px]">NEW</div>
                      <div className="flex space-x-1 items-center">
                        <span className="text-2xl" style={{ color: "#63B8A7" }}>
                          ・
                        </span>
                        <span className="text-ninjack-text-gray text-xs">ニュース</span>
                      </div>
                    </div>
                    <div className="text-sm text-ninjack-text-gray">2024.01.01</div>
                  </div>
                  <p className="text-ninjack-white text-xl font-bold mb-4">記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル</p>
                  <p className="text-ninjack-text-gray text-xs">
                    これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between items-center my-8">
                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-12 gap-6 mb-8">
                  <MagazineItem
                    image={imageMagazineThumb}
                    isNew={true}
                    category="レポート"
                    date="2024.01.01"
                    title="記事タイトル記事タイトル記事タイトル記事タイトル記事"
                    content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじでうもじですこれはじゅうもじですこれはじゅ"
                  />
                  <MagazineItem
                    image={imageMagazineThumb}
                    isNew={true}
                    category="レポート"
                    date="2024.01.01"
                    title="記事タイトル記事タイトル記事タイトル記事タイトル記事"
                    content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじでうもじですこれはじゅうもじですこれはじゅ"
                  />
                  <MagazineItem
                    image={imageMagazineThumb}
                    isNew={true}
                    category="レポート"
                    date="2024.01.01"
                    title="記事タイトル記事タイトル記事タイトル記事タイトル記事"
                    content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじでうもじですこれはじゅうもじですこれはじゅ"
                  />
                  <MagazineItem
                    image={imageMagazineThumb}
                    isNew={true}
                    category="レポート"
                    date="2024.01.01"
                    title="記事タイトル記事タイトル記事タイトル記事タイトル記事"
                    content="これはじゅうもじですこれはじゅうもじですこれはじゅうもじでうもじですこれはじゅうもじですこれはじゅ"
                  />
                </div>

                <DetailButton size={400}/>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="trapezoid2"></div>
          <div className="flex items-center mt-[-15px] mb-[-20px]">
            <Image src={iconSearch} alt="検索アイコン" className="me-[5.5px]" />
            <p className="text-[18px] text-ninjack-text-gray font-bold">Ninjackとは？</p>
          </div>
        </div>
      </section>

      
      <section className="bg-ninjack-bg-gray">
        <div className="md:w-[1110px] mx-auto py-[60px] px-5">
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[120px] gap-10 items-center">
            <Image src={imageNinjackConcept} alt="ninjack" className="px-10"/>
            <div className="flex flex-col space-y-7 text-ninjack-white items-center md:items-start">
              <p className="md:text-[35px] text-[24px] font-bold">すべての忍者をJackする。</p>
              <p className="md:text-[35px] text-[24px] font-bold">忍者ですべてをJackする。</p>
              <p className="md:text-[20px] text-[14px]">
                Ninjack.jpは、忍者体験・スポット・アイテム・フィクション・現代忍者・最新ニュース・研究情報など、忍者に関するあらゆる情報を網羅した“忍者総合ポータルサイト”です。
                「すべての忍者をJackする。忍者ですべてをJackする。」をコンセプトに、忍者に関する多彩なコンテンツを提供しています。
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-[1160px] pb-[100px] mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between items-center border-[1px] border-ninjack-text-gray rounded-2xl p-6">
            <div className="md:text-[27px] text-[20px] text-ninjack-text-gray ">
              <p>掲載している <br className="md:block hidden"/>コンテンツ数</p>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-[44px] justify-between md:w-[734px] mt-4">
              <ContentCountItem icon={iconActivity} label="体験・修行" counts={30} />
              <ContentCountItem icon={iconSpot} label="体験・修行" counts={30} />
              <ContentCountItem icon={iconItem} label="体験・修行" counts={10} />
              <ContentCountItem icon={iconResearch} label="体験・修行" counts={20} />
              <ContentCountItem icon={iconFiction} label="体験・修行" counts={20} />
              <ContentCountItem icon={iconNinja} label="体験・修行" counts={20} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
