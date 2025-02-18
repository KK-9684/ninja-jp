import Image from "next/image";
import RichContent from "@/app/components/Common/RichContent";
import { getItem } from "../fetcher";

import ImageSub from "@/assets/image-sub-item.png";
import IconX1 from "@/assets/icon-x1.svg";
import IconInstagram from "@/assets/icon-instagram.svg";
import IconYoutube from "@/assets/icon-youtube.svg";
import IconFacebookFull from "@/assets/icon-facebook-full.svg";
import ShareButton from "@/app/components/Common/sharebutton";
import DetailSideContent from "@/app/components/Common/detailSideContent";
import { Metadata } from "next/types";
import DetailPageSwiper from "@/app/components/detailPageSwiper";
import Link from "next/link";
import ItemLinkGroup from "@/app/components/Common/ItemLinkGroup";
import { ItemLinkGroupSkeleton } from "@/lib/contentful/sharedModel";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const item = await getItem(id);

  if (!item) {
    return {};
  }

  console.log(item);
  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/item/${item.slug}` ||
        "http://localhost:3000"
    ),
    title: item.title,
    description: item.metaDescription,
    openGraph: {
      title: item.title,
      description: item.metaDescription,
      url:
        `${process.env.NEXT_PUBLIC_BASE_URL}/item/${item.slug}` ||
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

export default async function ItemDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) {
    return <div>Not Found</div>;
  }
  console.log(item);

  return (
    <>
      <div className="flex md:max-w-[1240px] md:mx-auto">
        <div className="w-full md:w-[880px] flex flex-col md:p-[60px] p-8 md:pl-[100px] md:max-w-[calc(100%-320px)]">
          <section className="flex flex-col gap-[24px]">
            <div className="flex flex-col md:space-y-6 gap-4">
              <div className="flex flex-col justify-between py-1">
                <div className="mb-[27px] flex items-center md:gap-[20px] gap-4">
                  {item.category?.map((ct) => (
                    <div
                      key={ct.slug}
                      className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none"
                    >
                      {ct.title}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-ninjack-white mb-3 text-[28px]">
                    {item.title}
                  </p>
                </div>
                {item.relationKeyword &&
                  Array.isArray(item.relationKeyword) && (
                    <div className="py-2">
                      <div className="flex md:flex-row flex-wrap gap-2">
                        {item.relationKeyword.map((keyword, index) => (
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
              {" "}
              <DetailPageSwiper
                images={
                  item.image?.map((img) => ({
                    ...img,
                    width: 1200,
                    height: 800,
                  })) ?? []
                }
              />{" "}
            </div>
          </section>

          <section className="richContent flex flex-col mt-[80px] text-[#ffffff] gap-11">
            <RichContent document={item.content} />
          </section>
          <section className="my-5 flex justify-start gap-3">
            {item.linkGroup &&
              Array.isArray(item.linkGroup) &&
              item.linkGroup.map(
                (linkGroupItem: ItemLinkGroupSkeleton["fields"], index) => (
                  <ItemLinkGroup
                    key={`${linkGroupItem.url?.toString()}-${index}`}
                    linkGroup={{
                      title: linkGroupItem.title?.toString(),
                      url: linkGroupItem.url?.toString(),
                    }}
                  />
                )
              )}
          </section>
          <section className="flex flex-col mt-[44px]">
            <ShareButton
              shareUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/item/${item.slug}`}
              title={item.title}
            />
            <div className="mt-12 text-[#7a7a7a] text-center text-[16px]">
              執筆忍
            </div>
            <div className=" mt-4 w-[100%]">
              {item.writer && (
                <>
                  <div className="flex flex-row rounded-[10px] bg-[#171717] p-5 gap-5">
                    <div className="rounded-full overflow-hidden flex items-center">
                      <Image
                        src={item.writer.image[0]?.url}
                        alt=""
                        className="w-[88px] h-[88px] self-center"
                        width={88}
                        height={88}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-[#ffffff] text-[14px]">
                        <Link href={`/ninja/${item.writer.slug}`}>
                          {item.writer.name?.toString()}
                        </Link>
                      </div>
                      <div className="text-[#7a7a7a] text-[12px]">
                        {item.writer.summary?.toString()}
                      </div>
                      <div className="flex gap-2">
                        {item.writer.xUrl && (
                          <Link
                            href={item.writer.xUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconX1} alt="X" />
                          </Link>
                        )}
                        {item.writer.instagramUrl && (
                          <Link
                            href={item.writer.instagramUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconInstagram} alt="X" />
                          </Link>
                        )}
                        {item.writer.youtubeUrl && (
                          <Link
                            href={item.writer.youtubeUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconYoutube} alt="X" />
                          </Link>
                        )}
                        {item.writer.facebookUrl && (
                          <Link
                            href={item.writer.facebookUrl.toString()}
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

          {/* <section className="mt-[120px] flex flex-col gap-7">
            <div className="flex space-x-4 items-center">
              <Image src={iconItem} alt="施設・史跡" width={40} height={40} />
              <h2 className="md:text-[36px] text-[28px] text-ninjack-white">
                関連する商品・忍具
              </h2>
            </div>
            <div className="grid md:grid-cols-4 grid-cols-2 md:gap-[40px] gap-4">
              <RecommendItem limit={4} />
            </div>
          </section> */}
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
