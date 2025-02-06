import Image from "next/image";
import { getActivity } from "../fetcher";
import RichContent from "@/app/components/Common/RichContent";
import RelationActivity from "@/app/components/Common/RelationActivity";
import RelationSpot from "@/app/components/Common/RelationSpot";
import { shuffle } from "@/lib/util/shuffle";
import ImageViewer from "@/app/components/Imageviwer";

import IconTimer from "@/assets/icon-timer.svg";
import ImageCeo from "@/assets/image-ceo.png";
import iconSpot from "@/assets/icon-spot.svg";
import iconActivity from "@/assets/icon-activity.svg";
import ImageSub from "@/assets/image-sub-activity.png";
import ShareButton from "@/app/components/Common/sharebutton";
import DetailSideContent from "@/app/components/Common/detailSideContent";
import DetailItemList from "@/app/components/Common/detailItemList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ninja",
  description: "",
};

type Params = Promise<{ id: string }>;

export default async function ActivityDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const activity = await getActivity(id);

  if (!activity) {
    return <div>Not Found</div>;
  }
  return (
    <>
      <div className="flex flex-row">
        <div className="w-full flex flex-col md:p-[60px] p-8 md:pl-[100px]">
          <section className="flex flex-col gap-[48px]">
            <div className="flex flex-col md:space-y-6 gap-4">
              <div className="flex flex-col justify-between py-1">
                <div className="mb-[27px] flex items-center md:gap-[20px] gap-4">
                  {activity.category?.map((ct) => (
                    <div
                      key={`category-${ct.slug}`}
                      className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none"
                    >
                      {ct.title}
                    </div>
                  ))}
                  <div className="flex items-center text-ninjack-text-gray">
                    <span className="text-2xl leading-none">・</span>
                    <span className="text-sm leading-none">
                      {activity.area}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-ninjack-white mb-3 text-[28px]">
                    {activity.title}
                  </p>
                </div>
                {activity.tag && (
                  <div className="py-2">
                    <div className="flex md:flex-row flex-wrap gap-2">
                      {activity.tag.map((item, index: number) => (
                        <div
                          key={`${item.slug}-${index}`}
                          className="text-ninjack-white text-xs leading-none items-center p-2 border border-ninjack-line-gray w-fit rounded-[4px]"
                        >
                          #&nbsp;{item.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <ImageViewer />
            </div>
            <div className="mt-[32px] flex flex-row gap-[20px] items-center">
              <div className="text-[36px] text-[#ffffff]">{activity.price}</div>
              <div className="bg-[#171717] rounded-[4px] border-[1px] border-[#2e2e2e] p-1 text-[#7a7a7a] flex flex-row gap-1 items-center h-fit">
                <Image
                  src={IconTimer}
                  alt=""
                  className="w-[17px] h-[17px] text-[#7a7a7a]"
                />
                <div>{activity.time}</div>
              </div>
            </div>
          </section>

          <section className="richContent flex flex-col mt-[80px] text-[#ffffff] gap-11">
            <RichContent document={activity.content} />
          </section>

          {activity.plans &&
            Array.isArray(activity.plans) &&
            activity.plans.map((plan, index) => (
              <DetailItemList key={`${plan.title}-${index}`} plan={plan} />
            ))}
          {/* <div className="md:hidden mt-8">
            <Image
              src={ImageVideo}
              alt=""
              className="self-center object-contain rounded-md"
            />
          </div> */}
          <section className="flex flex-col mt-[44px]">
            {/* <Image
              src={ImageMap}
              alt=""
              className="w-full md:px-[60px] object-contain"
            /> */}
            <ShareButton />
            <div className="mt-12 text-[#7a7a7a] text-center text-[16px]">
              執筆忍
            </div>
            <div className="md:px-[128px] mt-4">
              {activity.writer && (
                <>
                  <div className="flex flex-row rounded-[10px] bg-[#171717] p-5 gap-5">
                    <Image
                      src={ImageCeo}
                      alt=""
                      className="w-[88px] h-[88px] self-center"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="text-[#ffffff] text-[14px]">
                        {activity.writer.name}
                      </div>
                      {/* <div className="text-[#7a7a7a] text-[12px]">
                        <RichContent document={activity.writer.content} />
                      </div> */}
                      {/* <div className="flex flex-row gap-2">
                        <Image src={IconX} alt="" />
                        <Image src={IconInstagram} alt="" />
                        <Image src={IconYoutube} alt="" />
                      </div> */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          <section className="mt-[120px] flex flex-col gap-7">
            <div className="flex space-x-4 items-center">
              <Image src={iconSpot} alt="施設・史跡" width={40} height={40} />
              <h2 className="md:text-[36px] text-[28px] text-ninjack-white font-bold">
                関連する施設・史跡
              </h2>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2  gap-[40px]">
              {activity.relationSpotIds && (
                <RelationSpot ids={shuffle(activity.relationSpotIds)} />
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

            <section className="flex flex-col gap-4 ">
              {activity.relationActivityIds && (
                <RelationActivity ids={shuffle(activity.relationActivityIds)} />
              )}
            </section>
          </section>

          <section className="mt-[52px]">
            <Image src={ImageSub} alt="" className="md:hidden" />
          </section>
        </div>

        <div className="max-w-[500px] border-l-[1px] border-[#2E2E2E] pl-5 pt-[60px] pr-[100px] hidden md:block">
          <DetailSideContent />

          <section className="mt-[52px]">
            <Image src={ImageSub} alt="" />
          </section>
        </div>
      </div>
    </>
  );
}
