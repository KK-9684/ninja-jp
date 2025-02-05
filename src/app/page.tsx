import LatestMagazineList from "./components/Home/LatestMagazineList";
import RecommendActivity from "./components/Common/RecommendActivity";
import RecommendItem from "./components/Common/RecommendItem";
import RecommendMember from "./components/Home/RecommendMember";
import RecommendResearch from "./components/Home/RecommendResearch";
import TagList from "./components/Common/TagList";
import RecommendFiction from "./components/Home/RecommendFiction";
import RecommendMagazine from "./components/Home/RecommendMagazine";
import EachContentsCount from "./components/Home/EachContentsCount";

import Image from "next/image";
import iconNoroshi from "@/assets/icon_noroshi.svg";
import iconActivity from "@/assets/icon-activity.svg";
import iconItem from "@/assets/icon-item.svg";
import iconSearch from "@/assets/icon-search.svg";
import iconSpot from "@/assets/icon-spot.svg";
import iconResearch from "@/assets/icon-research.svg";
import iconFiction from "@/assets/icon-fiction.svg";
import iconNinja from "@/assets/icon-ninja.svg";
import imageNinjackConcept from "@/assets/image-ninjack-concept.png";
import DetailButton from "./components/Common/detailButton";
import SectionTitlePart from "./components/Common/sectionTitlePart";
import ActivitySwiper from "./components/activitySwiper";
import SpotSwiper from "./components/spotSwiper";
import SpotSelector from "./components/spotSelector";
import clsx from "clsx";
import { GeistFont } from "./components/Common/font";
import SpotSelectorPC from "./components/spotSelectorPc";
import SwitchContentNavigation from "./components/Common/SwitchContentNavigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ninja",
  description: "",
};

export default async function Home() {
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
              <p className="text-ninjack-text-gray text-base leading-none">
                新着情報
              </p>
              <p className="text-[28px] text-ninjack-white font-bold leading-none">
                おすすめコンテンツ
              </p>
            </div>
          </div>
          <ActivitySwiper />
        </div>
      </section>

      <section className="container flex mx-auto px-5">
        <div className="md:flex hidden items-center px-[60px] py-10 bg-ninjack-bg-gray border rounded-[10px] border-ninjack-line-gray w-full">
          <div className="flex flex-col me-[230px]">
            <div className="flex items-center mb-8 ">
              <p
                className={clsx(
                  "text-ninjack-white md:text-[24px] leading-none me-3 ",
                  GeistFont.className
                )}
              >
                WHAT’S NEW
              </p>
              <p className="text-ninjack-text-gray md:text-[12px]  leading-none ">
                / 新着記事
              </p>
            </div>
            <DetailButton href="/news" size={230} />
          </div>
          <div className="flex flex-col py-4 w-[100%]">
            <LatestMagazineList />
          </div>
        </div>

        <div className="flex flex-col self-start md:hidden p-8 bg-ninjack-bg-gray border rounded-[10px] border-ninjack-line-gray w-full">
          <div className="flex flex-col ">
            <div className="flex items-center mb-8 ">
              <p className="text-ninjack-white text-[20px] leading-none me-3">
                WHAT’S NEW
              </p>
              <p className="text-ninjack-text-gray text-[10px] leading-none">
                / 新着記事
              </p>
            </div>
          </div>
          <div className="flex flex-col py-4">
            <LatestMagazineList />
          </div>
          <DetailButton href="/news" size={300} />
        </div>
      </section>

      <section className="container mx-auto md:py-[100px] py-12 px-5">
        <div className="md:flex hidden justify-between">
          <SectionTitlePart
            icon={iconActivity}
            title="体験・修行"
            subTitle="注目の忍者体験アクティビティ"
          />
          <DetailButton href="/activity" size={160} />
        </div>
        <div className="md:hidden">
          <SectionTitlePart
            icon={iconActivity}
            title="体験・修行"
            subTitle="注目の忍者体験アクティビティ"
          />
        </div>
        <div className="hidden md:grid md:grid-cols-2 grid-cols-1 gap-x-[72px] justify-between mt-10">
          <RecommendActivity limit={6} />
        </div>
        <div className="md:hidden grid grid-cols-1 gap-6 justify-between my-10">
          <RecommendActivity limit={6} />
        </div>
        <div className="md:hidden mx-auto">
          <DetailButton href="/activity" size={350} />
        </div>
      </section>

      <section className="bg-ninjack-bg-gray">
        <div className="container flex md:flex-row flex-col gap-6 justify-between mx-auto px-5 md:py-[100px] py-8">
          <div className="flex flex-col space-y-10 md:me-[88px]">
            <SectionTitlePart
              icon={iconSpot}
              title="施設・史跡"
              subTitle="忍者の足跡を巡る"
            />
            <SpotSelectorPC />
            <SpotSelector />
            <div className="hidden md:block">
              <DetailButton href="/spot" size={280} />
            </div>
          </div>
          <SpotSwiper />
          <div className=" md:hidden">
            <DetailButton href="/spot" size={280} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="trapezoid"></div>
          <div className="flex items-center mt-[-15px] mb-[-20px]">
            <Image src={iconSearch} alt="検索アイコン" className="me-[5.5px]" />
            <p className="text-[18px] text-ninjack-text-gray font-bold">
              気になるキーワードから探す
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto md:py-[100px] py-10 px-5 ">
        <div className="flex flex-col items-center">
          <TagList limit={20} />
        </div>
      </section>
      <section className="bg-ninjack-bg-gray">
        <div className="container mx-auto md:py-[100px] py-12 px-5">
          <div className="md:flex hidden justify-between">
            <SectionTitlePart
              icon={iconItem}
              title="商品・忍具"
              subTitle="おすすめの忍者アイテム"
            />
            <DetailButton href="/fiction" size={160} />
          </div>
          <div className="md:hidden">
            <SectionTitlePart
              icon={iconItem}
              title="商品・忍具"
              subTitle="おすすめの忍者アイテム"
            />
          </div>
          <div className="grid md:grid-cols-5 grid-cols-3 md:gap-10 gap-4 justify-between mt-10">
            <RecommendItem limit={5} />
          </div>
          <div className="md:hidden mt-6">
            <DetailButton href="/item" size={160} />
          </div>
        </div>
      </section>

      <section className="container mx-auto md:pt-[100px] md:pb-[140px] py-12 px-5">
        <div className="md:flex hidden justify-between">
          <SectionTitlePart
            icon={iconResearch}
            title="研究情報"
            subTitle="忍者研究の最前線"
          />
          <DetailButton href="/research" size={160} />
        </div>
        <div className="md:hidden">
          <SectionTitlePart
            icon={iconResearch}
            title="施設・史跡"
            subTitle="忍者の足跡を巡る"
          />
        </div>
        <div className="hidden md:grid md:grid-cols-2 grid-cols-1 gap-x-[72px] justify-between mt-10">
          <RecommendResearch />
        </div>
        <div className="flex flex-col md:hidden mt-6">
          <RecommendResearch />
        </div>
        <div className="md:hidden mt-6">
          <DetailButton href="/research" size={160} />
        </div>
      </section>

      <SwitchContentNavigation />
      <section>
        <div className="container mx-auto md:py-[100px] py-12 px-5">
          <div className="md:flex hidden justify-between mb-10">
            <SectionTitlePart
              icon={iconFiction}
              title="創作作品"
              subTitle="フィクション世界のNINJAたち"
            />
            <DetailButton href="/fiction" size={160} />
          </div>
          <div className="md:hidden mb-8">
            <SectionTitlePart
              icon={iconFiction}
              title="創作作品"
              subTitle="フィクション世界のNINJAたち"
            />
          </div>
          <RecommendFiction />

          <div className="md:hidden mt-8">
            <DetailButton href="/fiction" size={160} />
          </div>
        </div>
      </section>

      <section className="bg-ninjack-bg-gray">
        <div className="container mx-auto md:py-[100px] py-12 px-5">
          <div className="md:flex hidden justify-between">
            <SectionTitlePart
              icon={iconNinja}
              title="現代忍者"
              subTitle="今を生きる忍者たち"
            />
            <DetailButton href="/ninja" size={160} />
          </div>
          <div className="md:hidden">
            <SectionTitlePart
              icon={iconNinja}
              title="現代忍者"
              subTitle="今を生きる忍者たち"
            />
          </div>
          <div className="hidden md:grid grid-cols-4 gap-10 justify-between mt-10">
            <RecommendMember />
          </div>
          <div className="md:hidden mt-6">
            <DetailButton href="/member" size={160} />
          </div>
        </div>
      </section>

      <section className="" id="aboutNinjack">
        <div className="container mx-auto md:py-[100px] py-12 px-5">
          <div className="flex md:flex-row flex-col gap-4 justify-center space-x-5 md:text-[66px] text-[40px] leading-none mb-12">
            <span className="text-ninjack-purple text-center">Ninjack</span>
            <span className="text-ninjack-white text-center">MAGAZINE</span>
          </div>
          <RecommendMagazine />
        </div>
        <div className="flex flex-col items-center">
          <div className="trapezoid2"></div>
          <div className="flex items-center mt-[-15px] mb-[-20px]">
            <Image src={iconSearch} alt="検索アイコン" className="me-[5.5px]" />
            <p className="text-[18px] text-ninjack-text-gray font-bold">
              Ninjackとは？
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ninjack-bg-gray">
        <div className="md:w-[1110px] mx-auto py-[60px] px-5">
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[120px] gap-10 items-center">
            <Image src={imageNinjackConcept} alt="ninjack" className="px-10" />
            <div className="flex flex-col space-y-7 text-ninjack-white items-center md:items-start">
              <p className="md:text-[35px] text-[24px] font-bold">
                すべての忍者をJackする。
              </p>
              <p className="md:text-[35px] text-[24px] font-bold">
                忍者ですべてをJackする。
              </p>
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
              <p>
                掲載している <br className="md:block hidden" />
                コンテンツ数
              </p>
            </div>
            <EachContentsCount />
          </div>
        </div>
      </section>
    </div>
  );
}
