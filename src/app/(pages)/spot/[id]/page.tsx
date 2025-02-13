import Image from "next/image";
import RichContent from "../../../components/Common/RichContent";
import { getSpot } from "../fetcher";
import RecommendActivity from "@/app/components/Common/RecommendActivity";

import ImageMap from "@/assets/image-map.png";
import ImageCeo from "@/assets/image-ceo.png";
import iconActivity from "@/assets/icon-activity.svg";
import ImageSub from "@/assets/image-sub-spot.png";
import DetailSideContent from "@/app/components/Common/detailSideContent";
import ShareButton from "@/app/components/Common/sharebutton";
import { Metadata } from "next/types";
import DetailPageSwiper from "@/app/components/detailPageSwiper";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const spot = await getSpot(id);

  if (!spot) {
    return {};
  }

  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/spot/${spot.slug}` ||
        "http://localhost:3000"
    ),
    title: spot.title,
    description: spot.metaDescription,
    openGraph: {
      title: spot.title,
      description: spot.metaDescription,
      url:
        `${process.env.NEXT_PUBLIC_BASE_URL}/spot/${spot.slug}` ||
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

export default async function SpotDetailPage({ params }: Props) {
  const { id } = await params;
  const spot = await getSpot(id);

  if (!spot) {
    return <div>Not Found</div>;
  }
  console.log(spot.relationKeyword);

  return (
    <>
      <div className="flex md:max-w-[1240px] md:mx-auto">
        <div className="w-full md:w-[880px] flex flex-col md:p-[60px] p-8 md:pl-[100px] md:max-w-[calc(100%-320px)]">
          <section className="flex flex-col gap-[48px]">
            <div className="flex flex-col md:space-y-6 gap-4">
              <div className="flex flex-col justify-between py-1">
                <div className="mb-[27px] flex items-center md:gap-[20px] gap-4">
                  <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none">
                    {spot.category.title}
                  </div>
                  <div className="flex items-center text-ninjack-text-gray">
                    <span className="text-2xl leading-none">・</span>
                    <span className="text-sm leading-none">{spot.area}</span>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-ninjack-white mb-3 text-[28px]">
                    {spot.title}
                  </p>
                </div>
                {spot.relationKeyword &&
                  Array.isArray(spot.relationKeyword) && (
                    <div className="py-2">
                      <div className="flex md:flex-row flex-wrap gap-2">
                        {spot.relationKeyword.map((keyword, index) => (
                          <div
                            key={index}
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
                  spot.image?.map((img) => ({
                    ...img,
                    width: 1200,
                    height: 800,
                  })) ?? []
                }
              />
            </div>
          </section>

          <section className="richContent flex flex-col mt-[80px] text-[#ffffff] gap-11">
            <RichContent document={spot.content} />
          </section>

          <section className="flex flex-col mt-[44px]">
            <Image
              src={ImageMap}
              alt=""
              className="w-full md:px-[60px] object-contain"
            />
            <ShareButton
              shareUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/spot/${spot.slug}`}
              title={spot.title}
            />
            <div className="mt-12 text-[#7a7a7a] text-center text-[16px]">
              執筆忍
            </div>
            <div className="md:px-[128px] mt-4">
              {spot.writer && (
                <>
                  <div className="flex flex-row rounded-[10px] bg-[#171717] p-5 gap-5">
                    <Image
                      src={ImageCeo}
                      alt=""
                      className="w-[88px] h-[88px] self-center"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="text-[#ffffff] text-[14px]">
                        {spot.writer.name}
                      </div>
                      <div className="text-[#7a7a7a] text-[12px]">
                        <RichContent document={spot.writer.content} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          <section className="mt-[90px] flex flex-col gap-7">
            <div className="flex space-x-4 items-center">
              <Image
                src={iconActivity}
                alt="体験・修行"
                width={40}
                height={40}
              />
              <h2 className="md:text-[36px] text-[28px] text-ninjack-white">
                おすすめの体験・修行
              </h2>
            </div>
            <div className="border-b -[1px] border-[#2e2e2e] md:block hidden">
              <RecommendActivity limit={4} />
            </div>
          </section>
          <section className="mt-[52px] mx-20">
            <Image src={ImageSub} alt="" className="md:hidden object-contain" />
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
