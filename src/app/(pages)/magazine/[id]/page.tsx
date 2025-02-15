import Image from "next/image";
import RichContent from "@/app/components/Common/RichContent";
import { getMagazine } from "../fetcher";
import IconX1 from "@/assets/icon-x1.svg";
import IconInstagram from "@/assets/icon-instagram.svg";
import IconYoutube from "@/assets/icon-youtube.svg";
import IconFacebookFull from "@/assets/icon-facebook-full.svg";
import ImageSub from "@/assets/image-sub-magazine.png";
import ShareButton from "@/app/components/Common/sharebutton";
import DetailSideContent from "@/app/components/Common/detailSideContent";
import RecommendMagazine from "@/app/components/Common/RecommendMagazine";
import { Metadata } from "next/types";
import DetailPageSwiper from "@/app/components/detailPageSwiper";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

type RelationKeyword = {
  slug: string | undefined;
  title: string | undefined;
};

type MagazineImage = {
  url: string;
  alt: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const item = await getMagazine(id);

  if (!item) {
    return {};
  }
  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/magazine/${item.slug}` ||
        "http://localhost:3000"
    ),
    title: item.title,
    description: item.metaDescription,
    openGraph: {
      title: item.title,
      description: item.metaDescription,
      url:
        `${process.env.NEXT_PUBLIC_BASE_URL}/magazine/${item.slug}` ||
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

export default async function MagazineDetailPage({ params }: Props) {
  const { id } = await params;
  const magazine = await getMagazine(id);

  if (!magazine) {
    return <div>Not Found</div>;
  }
  return (
    <>
      <div className="flex md:max-w-[1240px] md:mx-auto">
        <div className="w-full md:w-[880px] flex flex-col md:p-[60px] p-8 md:pl-[100px] md:max-w-[calc(100%-320px)]">
          <section className="flex flex-col ">
            <div className="flex justify-between">
              <div className="flex gap-6 items-center text-[14px] mb-6">
                {magazine.isNew &&
                  `<div className="leading-none bg-ninjack-white px-[7px] py-[5px]">NEW</div>`}
                <div className="flex space-x-0 items-center">
                  <span className="text-xl" style={{ color: "#63B8A7" }}>
                    ・
                  </span>
                  {magazine.category?.map(
                    (ct: { slug: string | undefined; title: string }) => (
                      <span key={ct.slug} className="text-ninjack-text-gray ">
                        {ct.title}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="text-sm text-ninjack-text-gray">
                {magazine.createdAt}
              </div>
            </div>
            <p className="text-ninjack-white text-[28px] font-bold mb-2">
              {magazine.title}
            </p>
            {magazine.relationKeyword &&
              Array.isArray(magazine.relationKeyword) && (
                <div className="py-2">
                  <div className="flex md:flex-row flex-wrap gap-2">
                    {magazine.relationKeyword.map(
                      (keyword: RelationKeyword, index: number) => (
                        <div
                          key={index}
                          className="text-ninjack-white text-xs leading-none items-center p-2 border border-ninjack-line-gray w-fit rounded-[4px]"
                        >
                          #&nbsp;{keyword.title}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            <DetailPageSwiper
              images={
                magazine.image?.map((img: MagazineImage) => ({
                  ...img,
                  width: 1200,
                  height: 800,
                })) ?? []
              }
            />
          </section>

          <section className="richContent flex flex-col mt-[80px] text-[#ffffff] gap-11">
            <RichContent document={magazine.content} />
          </section>

          <section className="flex flex-col mt-[44px]">
            <ShareButton
              shareUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/magazine/${magazine.slug}`}
              title={magazine.title}
            />
            <div className="mt-12 text-[#7a7a7a] text-center text-[16px]">
              執筆忍
            </div>
            <div className=" mt-4 w-[100%]">
              {magazine.writer && (
                <>
                  <div className="flex flex-row rounded-[10px] bg-[#171717] p-5 gap-5">
                    <div className="rounded-full overflow-hidden flex items-center">
                      <Image
                        src={magazine.writer.image[0]?.url}
                        alt=""
                        className="w-[88px] h-[88px] self-center"
                        width={88}
                        height={88}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-[#ffffff] text-[14px]">
                        <Link href={`/ninja/${magazine.writer.slug}`}>
                          {magazine.writer.name?.toString()}
                        </Link>
                      </div>
                      <div className="text-[#7a7a7a] text-[12px]">
                        {magazine.writer.summary?.toString()}
                      </div>
                      <div className="flex gap-2">
                        {magazine.writer.xUrl && (
                          <Link
                            href={magazine.writer.xUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconX1} alt="X" />
                          </Link>
                        )}
                        {magazine.writer.instagramUrl && (
                          <Link
                            href={magazine.writer.instagramUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconInstagram} alt="X" />
                          </Link>
                        )}
                        {magazine.writer.youtubeUrl && (
                          <Link
                            href={magazine.writer.youtubeUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7a7a7a] hover:text-white"
                          >
                            <Image src={IconYoutube} alt="X" />
                          </Link>
                        )}
                        {magazine.writer.facebookUrl && (
                          <Link
                            href={magazine.writer.facebookUrl.toString()}
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

          <section className="mt-[120px] flex flex-col gap-7">
            <div className="flex space-x-4 items-center">
              <h2 className="md:text-[36px] text-[28px] text-ninjack-white font-bold">
                おすすめのマガジン
              </h2>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-[40px] gap-8">
              <RecommendMagazine limit={4} />
            </div>
          </section>
          <section className="mt-[52px]">
            <Image src={ImageSub} alt="" className="h-[203px] object-contain" />
          </section>
        </div>

        <div className="md:max-w-[320px] md:w-[30%] border-l-[1px] border-[#2E2E2E] pl-5 pt-[60px] hidden md:block">
          <DetailSideContent />
        </div>
      </div>
    </>
  );
}
