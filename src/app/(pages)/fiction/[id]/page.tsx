import Image from "next/image";
import RichContent from "@/app/components/Common/RichContent";
import { getFiction } from "../fetcher";
import { shuffle } from "@/lib/util/shuffle";
import RelationItem from "@/app/components/Common/RelationItem";

import IconX1 from "@/assets/icon-x1.svg";
import IconInstagram from "@/assets/icon-instagram.svg";
import IconYoutube from "@/assets/icon-youtube.svg";
import IconFacebookFull from "@/assets/icon-facebook-full.svg";
import iconItem from "@/assets/icon-fiction.svg";
import ImageSub from "@/assets/image-sub-fiction.png";
import ShareButton from "@/app/components/Common/sharebutton";
import DetailSideContent from "@/app/components/Common/detailSideContent";
import { Metadata } from "next/types";
import DetailPageSwiper from "@/app/components/detailPageSwiper";
import Link from "next/link";
type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const fiction = await getFiction(id);

  if (!fiction) {
    return {};
  }

  console.log(fiction);
  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/fiction/${fiction.slug}` ||
        "http://localhost:3000"
    ),
    title: fiction.title,
    description: fiction.metaDescription,
    openGraph: {
      title: fiction.title,
      description: fiction.metaDescription,
      url:
        `${process.env.NEXT_PUBLIC_BASE_URL}/fiction/${fiction.slug}` ||
        "http://localhost:3000",
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
}

export default async function FictionDetailPage({ params }: Props) {
  const { id } = await params;
  const fiction = await getFiction(id);

  if (!fiction) {
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
                  {fiction.category && fiction.category.length > 0 && (
                    <div className="mb-[27px] flex items-center md:gap-[20px] gap-4">
                      {fiction.category.map((ct) => (
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
                  {/* {fiction.area && (
                    <div className="flex items-center text-ninjack-text-gray">
                      <span className="text-2xl leading-none">・</span>
                      <span className="text-sm leading-none">{fiction.area}</span>
                    </div>
                  )} */}
                </div>
                <div>
                  <p className="font-bold text-ninjack-white mb-3 text-[28px]">
                    {fiction.title}
                  </p>
                </div>
                {fiction.relationKeyword && (
                  <div className="py-2">
                    <div className="flex md:flex-row flex-wrap gap-2 ">
                      {fiction.relationKeyword.map((keyword) => (
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
                  fiction.image?.map((img) => ({
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
            {fiction.content && (
              <section className="richContent flex flex-col mt-[80px] text-[#ffffff] gap-11">
                <RichContent document={fiction.content} />
              </section>
            )}
          </section>

          <section className="flex flex-col mt-[44px]">
            <ShareButton
              shareUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/fiction/${fiction.slug}`}
              title={fiction.title}
            />

            <div className="mt-12 text-[#7a7a7a] text-center text-[16px]">
              執筆忍
            </div>
            <div className=" mt-4 w-[100%]">
              {fiction.writer && (
                <>
                  <div className="flex flex-row rounded-[10px] bg-[#171717] p-5 gap-5">
                    <div className="rounded-full overflow-hidden flex items-center w-[60px] h-[60px] min-w-[60px] md:w-[88px] md:h-[88px]  md:min-w-[88px] ">
                      <Image
                        src={fiction.writer.image[0].url || "/noimage.png"}
                        alt=""
                        className="self-center object-cover w-[100%] h-[100%]"
                        width={88}
                        height={88}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-[#ffffff] text-[14px]">
                        <Link href={`/ninja/${fiction.writer.slug}`}>
                          {fiction.writer.name?.toString()}
                        </Link>
                      </div>
                      <div className="text-[#7a7a7a] text-[12px]">
                        {fiction.writer.summary?.toString()}
                      </div>
                      <div className="flex gap-2">
                        {fiction.writer.xUrl && (
                          <Link
                            href={fiction.writer.xUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconX1} alt="X" />
                          </Link>
                        )}
                        {fiction.writer.instagramUrl && (
                          <Link
                            href={fiction.writer.instagramUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconInstagram} alt="X" />
                          </Link>
                        )}
                        {fiction.writer.youtubeUrl && (
                          <Link
                            href={fiction.writer.youtubeUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconYoutube} alt="X" />
                          </Link>
                        )}
                        {fiction.writer.facebookUrl && (
                          <Link
                            href={fiction.writer.facebookUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconFacebookFull} alt="X" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          {fiction.relationItemIds && (
            <section className="mt-[120px] flex flex-col gap-7">
              <div className="flex space-x-4 items-center">
                <Image src={iconItem} alt="施設・史跡" width={40} height={40} />
                <h2 className="md:text-[36px] text-[28px] text-ninjack-white font-bold">
                  関連する商品・忍具
                </h2>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-2 md:gap-[40px] gap-8">
                <RelationItem ids={shuffle(fiction.relationItemIds)} />
              </div>
            </section>
          )}
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
