import Image from "next/image";
import RichContent from "@/app/components/Common/RichContent";
import { getMagazine } from "../fetcher";
import ImageCeo from "@/assets/image-ceo.png";
import ImageSub from "@/assets/image-sub-magazine.png";
import ShareButton from "@/app/components/Common/sharebutton";
import DetailSideContent from "@/app/components/Common/detailSideContent";
import RecommendMagazine from "@/app/components/Common/RecommendMagazine";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ninja",
  description: "",
};

interface GenerateMetadataProps {
  params: Promise<{ id: string }>;
}

export default async function MagazineDetailPage(props: GenerateMetadataProps) {
  const { id } = await props.params;
  const magazine = await getMagazine(id);

  if (!magazine) {
    return <div>Not Found</div>;
  }
  return (
    <>
      <div className="flex flex-row">
        <div className="w-full flex flex-col md:p-[60px] md:pl-[100px] p-8">
          <section className="flex flex-col ">
            <div className="flex justify-between">
              <div className="flex gap-6 items-center text-[14px] mb-6">
                {magazine.isNew &&
                  `<div className="leading-none bg-ninjack-white px-[7px] py-[5px]">NEW</div>`}
                <div className="flex space-x-0 items-center">
                  <span className="text-xl" style={{ color: "#63B8A7" }}>
                    ・
                  </span>
                  {magazine.category?.map((ct) => (
                    <span key={ct.slug} className="text-ninjack-text-gray ">
                      {ct.title}
                    </span>
                  ))}
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
                    {magazine.relationKeyword.map((keyword, index) => (
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
            {/* <ImageViewer /> */}
            {magazine.image?.map((img) => (
              <Image
                key={img.alt}
                src={img.url}
                alt={img.alt}
                width={640}
                height={480}
                className="w-[100%] h-[600px]"
              />
            ))}
          </section>

          <section className="richContent flex flex-col mt-[80px] text-[#ffffff] gap-11">
            <RichContent document={magazine.content} />
          </section>

          <section className="flex flex-col mt-[44px]">
            <ShareButton />
            <div className="mt-12 text-[#7a7a7a] text-center text-[16px]">
              執筆忍
            </div>
            <div className="md:px-[128px] mt-4">
              {magazine.writer && (
                <div className="flex flex-row rounded-[10px] bg-[#171717] p-5 gap-5">
                  <Image
                    src={ImageCeo}
                    alt=""
                    className="w-[88px] h-[88px] self-center"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="text-[#ffffff] text-[14px]">
                      {magazine.writer.name}
                    </div>
                    <div className="text-[#7a7a7a] text-[12px]">
                      <RichContent document={magazine.writer.content} />
                    </div>
                    {/* <div className="flex flex-row gap-2">
                      <Image src={IconX} alt="" />
                      <Image src={IconInstagram} alt="" />
                      <Image src={IconYoutube} alt="" />
                    </div> */}
                  </div>
                </div>
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

        <div className="md:block hidden max-w-[500px] border-l-[1px] border-[#2E2E2E] pl-5 pt-[60px] pr-[100px]">
          <DetailSideContent />
        </div>
      </div>
    </>
  );
}
