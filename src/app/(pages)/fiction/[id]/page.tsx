import Image from "next/image";
import RichContent from "@/app/components/Common/RichContent";
import { getFiction } from "../fetcher";
import { shuffle } from "@/lib/util/shuffle";
import RelationItem from "@/app/components/Common/RelationItem";

import ImageMap from "@/assets/image-map.png";
import ImageCeo from "@/assets/image-ceo.png";
import IconYoutube from "@/assets/icon-youtube.svg";
import IconX from "@/assets/icon-x1.svg";
import IconInstagram from "@/assets/icon-instagram.svg";
import iconItem from "@/assets/icon-item.svg";
import ImageSub from "@/assets/image-sub-fiction.png";
import ShareButton from "@/app/components/Common/sharebutton";
import DetailSideContent from "@/app/components/Common/detailSideContent";
import { Metadata } from "next/types";
import DetailPageSwiper from "@/app/components/detailPageSwiper";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
  metadataBase: new URL(
    // FIXME:きよしさん->記事のURL
    process.env.NEXT_PUBLIC_BASE_URL + "fiction" || "http://localhost:3000"
  ),
  // FIXME:きよしさん->記事のタイトル
  title: "創作作品 - 忍者ポータルサイト「Ninjack」",
  // FIXME:きよしさん->記事の本文の冒頭80文字
  description:
    "すべての忍者をJackする。忍者ですべてをJackする。Ninjack.jpは、忍者体験・スポット・アイテム・フィクション・現代忍者・最新ニュース・研究情報など、忍者に関するあらゆる情報を網羅した“忍者総合ポータルサイト”です。 「すべての忍者をJackする。忍者ですべてをJackする。」をコンセプトに、忍者に関する多彩なコンテンツを提供しています。",
  openGraph: {
    // FIXME:きよしさん->記事のタイトル
    title: "忍者ポータルサイト「Ninjack」",
    // FIXME:きよしさん->記事の本文の冒頭80文字
    description:
      "すべての忍者をJackする。忍者ですべてをJackする。Ninjack.jpは、忍者体験・スポット・アイテム・フィクション・現代忍者・最新ニュース・研究情報など、忍者に関するあらゆる情報を網羅した“忍者総合ポータルサイト”です。 「すべての忍者をJackする。忍者ですべてをJackする。」をコンセプトに、忍者に関する多彩なコンテンツを提供しています。",
    url:
      // FIXME:きよしさん->記事のURL
      process.env.NEXT_PUBLIC_BASE_URL + "fiction" || "http://localhost:3000",
    siteName: "忍者ポータルサイト「Ninjack」",
    images: [
      {
        url: process.env.NEXT_PUBLIC_BASE_URL + "/ogp.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default async function FictionDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const item = await getFiction(id);

  if (!item) {
    return <div>Not Found</div>;
  }
  return (
    <>
      <div className="flex md:max-w-[1240px] md:mx-auto">
        <div className="w-full md:w-[880px] flex flex-col md:p-[60px] p-8 md:pl-[100px] md:max-w-[calc(100%-320px)]">
          <section className="flex flex-col md:gap-[48px]">
            <div className="flex flex-col md:space-y-6 gap-4">
              <div className="flex flex-col py-1">
                <div className="mb-[27px] flex items-center md:gap-[20px] gap-4">
                  {item.category && item.category.length > 0 && (
                    <div className="mb-[27px] flex items-center md:gap-[20px] gap-4">
                      {item.category.map((ct) => (
                        <div
                          key={ct.slug}
                          className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none"
                        >
                          {ct.title}
                        </div>
                      ))}
                    </div>
                  )}
                  {/* FIXME contentfulにareaの定義が必要 */}
                  {/* {item.area && (
                    <div className="flex items-center text-ninjack-text-gray">
                      <span className="text-2xl leading-none">・</span>
                      <span className="text-sm leading-none">{item.area}</span>
                    </div>
                  )} */}
                </div>
                <div>
                  <p className="font-bold text-ninjack-white mb-3 text-[28px]">
                    {item.title}
                  </p>
                </div>
                {item.relationKeyword && (
                  <div className="py-2">
                    <div className="flex md:flex-row flex-wrap gap-2 ">
                      {item.relationKeyword.map((keyword) => (
                        <div
                          key={keyword.slug}
                          className="text-ninjack-white text-xs leading-none items-center p-2 border border-ninjack-line-gray w-fit rounded-[4px]"
                        >
                          #&nbsp;{keyword.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <DetailPageSwiper
                images={
                  item.image?.map((img) => ({
                    ...img,
                    width: 1200,
                    height: 800,
                  })) ?? []
                }
              />
              {/* {activity.image?.map((image) => (
                <div key={image.url}>
                  <img src={image.url} />
                </div>
              ))} */}
            </div>
          </section>

          <section className="richContent flex flex-col mt-[80px] text-[#ffffff] gap-11">
            {item.content && (
              <section className="richContent flex flex-col mt-[80px] text-[#ffffff] gap-11">
                <RichContent document={item.content} />
              </section>
            )}
          </section>

          <section className="flex flex-col mt-[44px]">
            <Image
              src={ImageMap}
              alt=""
              className="w-full md:px-[60px] object-contain"
            />
            <ShareButton />
            <div className="mt-12 text-[#7a7a7a] text-center text-[16px]">
              執筆忍
            </div>
            <div className="md:px-[128px] mt-4">
              <div className="flex flex-row rounded-[10px] bg-[#171717] p-5 gap-5">
                <Image
                  src={ImageCeo}
                  alt=""
                  className="w-[88px] h-[88px] self-center"
                />
                <div className="flex flex-col gap-2">
                  <div className="text-[#ffffff] text-[14px]">田中太郎</div>
                  <div className="text-[#7a7a7a] text-[12px]">
                    この人の説明もしくはコメント）これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ
                  </div>
                  <div className="flex flex-row gap-2">
                    <Image src={IconX} alt="" />
                    <Image src={IconInstagram} alt="" />
                    <Image src={IconYoutube} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-[120px] flex flex-col gap-7">
            <div className="flex space-x-4 items-center">
              <Image src={iconItem} alt="施設・史跡" width={40} height={40} />
              <h2 className="md:text-[36px] text-[28px] text-ninjack-white font-bold">
                関連する商品・忍具
              </h2>
            </div>
            <div className="grid md:grid-cols-4 grid-cols-2 md:gap-[40px] gap-8">
              {item.relationItemIds && (
                <RelationItem ids={shuffle(item.relationItemIds)} />
              )}
            </div>
          </section>
          <section className="mt-[52px]">
            <Image src={ImageSub} alt="" className="md:hidden" />
          </section>
        </div>

        <div className="md:max-w-[320px] md:w-[30%] border-l-[1px] border-[#2E2E2E] pl-5 pt-[60px] hidden md:block">
          <DetailSideContent />

          <section className="mt-[52px]">
            <Image src={ImageSub} alt="" className="h-[203px] object-contain" />
          </section>
        </div>
      </div>
    </>
  );
}
