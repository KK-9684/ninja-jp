import Image from "next/image";
import RichContent from "@/app/components/Common/RichContent";
import { getMember } from "../fetcher";
import RelationActivity from "@/app/components/Common/RelationActivity";
import { shuffle } from "@/lib/util/shuffle";
import RelationMember from "@/app/components/Common/RelationMember";

import ImageMap from "@/assets/image-map.png";
import iconActivity from "@/assets/icon-activity.svg";
import ImageSub from "@/assets/image-sub-ninja.png";
import iconNinja from "@/assets/icon-ninja.svg";
import DetailSideContent from "@/app/components/Common/detailSideContent";
import ShareButton from "@/app/components/Common/sharebutton";
import { Metadata } from "next/types";
import DetailPageSwiper from "@/app/components/detailPageSwiper";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const item = await getMember(id);

  if (!item) {
    return {};
  }
  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ninja/${item.slug}` ||
        "http://localhost:3000"
    ),
    title: item.name,
    description: item.metaDescription,
    openGraph: {
      title: item.name,
      description: item.metaDescription,
      url:
        `${process.env.NEXT_PUBLIC_BASE_URL}/ninja/${item.slug}` ||
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

export default async function NinjaDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getMember(id);

  if (!item) {
    return <div>Not Found</div>;
  }
  console.log(item);

  return (
    <>
      <div className="flex md:max-w-[1240px] md:mx-auto">
        <div className="w-full md:w-[880px] flex flex-col md:p-[60px] p-8 md:pl-[100px] md:max-w-[calc(100%-320px)]">
          <section className="flex flex-col md:gap-[48px]">
            <div className="flex flex-col md:space-y-6 gap-4">
              <div className="flex flex-col justify-between py-1">
                <div className="mb-[27px] flex items-center md:gap-[20px] gap-4">
                  {item.category?.map((ct) => (
                    <div
                      key={ct.slug}
                      className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none"
                    >
                      {ct.name}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-ninjack-white mb-3 text-[28px]">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:max-w-[320px] md:w-[30%] border-l-[1px] border-[#2E2E2E] pl-5 pt-[60px] hidden md:block">
              <DetailPageSwiper
                images={
                  item.image?.map((img) => ({
                    ...img,
                    width: 1200,
                    height: 800,
                  })) ?? []
                }
              />
            </div>
          </section>

          <section className="richContent flex flex-col mt-[80px] text-[#ffffff] gap-11">
            <RichContent document={item.content} />
          </section>

          <section className="flex flex-col mt-[44px]">
            <Image
              src={ImageMap}
              alt=""
              className="w-full md:px-[60px] object-contain"
            />
            <ShareButton />
          </section>

          <section className="mt-[120px] flex flex-col gap-7">
            <div className="flex space-x-4 items-center">
              <Image src={iconNinja} alt="施設・史跡" width={40} height={40} />
              <h2 className="md:text-[36px] text-[28px] text-ninjack-white font-bold">
                今を生きる忍者たち
              </h2>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-[40px]">
              {item.relationMemberIds && (
                <RelationMember ids={shuffle(item.relationMemberIds)} />
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
              <h2 className="md:text-[36px] text-[28px] text-ninjack-white  font-bold">
                関連する体験・修行
              </h2>
            </div>
            <div className="border-b pb-10 -[1px] border-[#2e2e2e] md:block hidden">
              {item.relationActivityIds && (
                <RelationActivity ids={shuffle(item.relationActivityIds)} />
              )}
            </div>
          </section>

          <section className="mt-[52px]">
            <Image src={ImageSub} alt="" className="md:hidden" />
          </section>
        </div>

        <div className="md:block hidden max-w-[500px] border-l-[1px] border-[#2E2E2E] pl-5 pt-[60px] pr-[100px]">
          <DetailSideContent />

          <section className="mt-[52px]">
            <Image src={ImageSub} alt="" className="h-[203px] object-contain" />
          </section>
        </div>
      </div>
    </>
  );
}
