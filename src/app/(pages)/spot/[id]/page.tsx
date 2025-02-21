import Image from "next/image";
import RichContent from "../../../components/Common/RichContent";
import { getSpot } from "../fetcher";
import RecommendActivity from "@/app/components/Common/RecommendActivity";

import iconActivity from "@/assets/icon-activity.svg";
import ImageSub from "@/assets/image-sub-spot.png";
import DetailSideContent from "@/app/components/Common/detailSideContent";
import ShareButton from "@/app/components/Common/sharebutton";
import { Metadata } from "next/types";
import DetailPageSwiper from "@/app/components/detailPageSwiper";
import Link from "next/link";
import IconX1 from "@/assets/icon-x1.svg";
import IconInstagram from "@/assets/icon-instagram.svg";
import IconYoutube from "@/assets/icon-youtube.svg";
import IconFacebookFull from "@/assets/icon-facebook-full.svg";
import SpotMap from "@/app/components/Common/SpotMap";
import MapWrapper from "@/app/components/Map/MapWrapper";
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

          <section className="richContent flex flex-col mt-[20px] text-[#ffffff] gap-11">
            {spot.price && (
              <div className="bg-[#171717] rounded-[4px] border-[1px] border-[#2e2e2e] p-1 text-[#7a7a7a] flex flex-row gap-1 items-center h-fit w-fit">
                料金：{spot.price}
              </div>
            )}
            <RichContent document={spot.content} />
            {spot.location && (
              <MapWrapper>
                <SpotMap location={spot.location} title={spot.title} />
              </MapWrapper>
            )}
          </section>

          <section className="flex flex-col mt-[44px]">
            {spot.metaDescription}
            <ShareButton
              shareUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/spot/${spot.slug}`}
              title={spot.title}
            />
            <div className="mt-12 text-[#7a7a7a] text-center text-[16px]">
              執筆忍
            </div>
            <div className=" mt-4 w-[100%]">
              {spot.writer && (
                <>
                  <div className="flex flex-row rounded-[10px] bg-[#171717] p-5 gap-5">
                    <div className="rounded-full overflow-hidden flex items-center w-[60px] h-[60px] min-w-[60px] md:w-[88px] md:h-[88px]  md:min-w-[88px] ">
                      <Image
                        src={spot.writer.image[0]?.url || "/noimage.png"}
                        alt=""
                        className="w-[100%] h-[100%] self-center  object-cover"
                        width={88}
                        height={88}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-[#ffffff] text-[14px]">
                        <Link href={`/ninja/${spot.writer.slug}`}>
                          {spot.writer.name?.toString()}
                        </Link>
                      </div>
                      <div className="text-[#7a7a7a] text-[12px]">
                        {spot.writer.summary?.toString()}
                      </div>
                      <div className="flex gap-2">
                        {spot.writer.xUrl && (
                          <Link
                            href={spot.writer.xUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconX1} alt="X" />
                          </Link>
                        )}
                        {spot.writer.instagramUrl && (
                          <Link
                            href={spot.writer.instagramUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconInstagram} alt="X" />
                          </Link>
                        )}
                        {spot.writer.youtubeUrl && (
                          <Link
                            href={spot.writer.youtubeUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconYoutube} alt="X" />
                          </Link>
                        )}
                        {spot.writer.facebookUrl && (
                          <Link
                            href={spot.writer.facebookUrl.toString()}
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

          <section className="mt-[90px] flex flex-col gap-7">
            <div className="flex space-x-4 items-center">
              <Image
                src={iconActivity}
                alt="体験・修行"
                width={40}
                height={40}
              />
              <h2 className="md:text-[36px] text-[28px] text-ninjack-white font-bold">
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
