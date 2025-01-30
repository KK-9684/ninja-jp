import Image from "next/image";
<<<<<<< HEAD
import { getActivity } from "../fetcher";
import RichContent from "@/app/components/Common/RichContent";
import RelationActivity from "@/app/components/Common/RelationActivity";
import RelationSpot from "@/app/components/Common/RelationSpot";
import { shuffle } from "@/lib/util/shuffle";
import RecommendActivity from "@/app/components/Common/RecommendActivity";
import TagList from "@/app/components/Common/TagList";
import RecommendItem from "@/app/components/Common/RecommendItem";

import DetailItem from "@/app/components/Common/detailItem";
import DetailItemList from "@/app/components/Common/detailItemList";
import SpotListItem, { SpotListItemProps } from "@/app/components/Common/spotListItem";
import ActivityListItem, { ActivityListItemProps } from "@/app/components/Common/activityListItem";
import ImageViewer from "@/app/components/Imageviwer";

import IconTimer from '@/assets/icon-timer.svg';
import ImageBlank from '@/assets/image-blank.png';
import ImageVideo from '@/assets/image-video.png';
import ImageNinja from "@/assets/image-ninja1.png";
import ImageMap from '@/assets/image-map.png';
import ImageLine from '@/assets/icon-line.svg';
import ImageX from '@/assets/icon-x.svg';
import ImageFacebook from '@/assets/icon-facebook.svg';
import ImageCeo from '@/assets/image-ceo.png';
import IconYoutube from "@/assets/icon-youtube.svg";
import IconX from '@/assets/icon-x1.svg';
import IconInstagram from '@/assets/icon-instagram.svg';
import iconSpot from "@/assets/icon-spot.svg";
import imageSpotThumb from "@/assets/image-spot.jpg";
import iconActivity from "@/assets/icon-activity.svg";
import imageActivityThumb2 from "@/assets/image-activity-thumb-2.jpg";
import ActivitySubList from "@/app/components/Common/activitySubList";
import imageItemThumb from "@/assets/image-item-thumb.jpg";
import ItemItem from "@/app/components/Common/itemItem";
import KeywordsGroup from "@/app/components/keywordsGroup";
import ImageSub from "@/assets/image-sub-activity.png";


export default async function ActivityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const activity = await getActivity(id);

  if (activity === null) {
    return <h1>Not Found</h1>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>カテゴリ</th>
            <th>料金</th>
            <th>所要時間</th>
            <th>エリア</th>
            <th>画像</th>
            <th>コンテンツ</th>
            <th>タグ</th>
            <th>編集者</th>
            <th>関連する施設・史跡</th>
            <th>おすすめの体験・旅行</th>
          </tr>
        </thead>
        <tbody>
          <tr key={activity.slug}>
            <td>{activity.title}</td>
            <td>
              {activity.category?.map((ct) => (
                <p key={ct.slug}>{ct.title}</p>
              ))}
            </td>
            <td>{activity.price}</td>
            <td>{activity.time}</td>
            <td>{activity.area}</td>
            <td>
              {activity.image?.map((img) => (
                <Image
                  key={img.alt}
                  src={img.url}
                  alt={img.alt}
                  width={324}
                  height={160}
                />
              ))}
            </td>
            <td>{RichContent(activity.content)}</td>
            <td>{activity.tag}</td>
            <td>
              {activity.writer && (
                <>
                  <p>{activity.writer.name}</p>
                  {RichContent(activity.writer.content)}
                </>
              )}
            </td>
            <td>
              {activity.relationSpotIds && (
                <RelationSpot ids={shuffle(activity.relationSpotIds)} />
              )}
            </td>
            <td>
              {activity.relationActivityIds && (
                <RelationActivity ids={shuffle(activity.relationActivityIds)} />
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <RecommendActivity limit={4} />
      <RecommendItem limit={4} />
      <TagList limit={10} />
    <div className="flex flex-row">
      <div className="w-full flex flex-col md:p-[60px] p-8 md:pl-[100px]">

        <section className="flex flex-col gap-[48px]">
          <DetailItem
            categroy="ものづくり"
            areaName="エリア名"
            title="タイトルタイトルタイトルタイトルタイトルタイトルタイトル"
          />
          <div>
            <ImageViewer />
          </div>
          <div className="mt-[32px] flex flex-row gap-[20px] items-center">
            <div className="text-[36px] text-[#ffffff]">
              ￥1,000〜
            </div>
            <div className="bg-[#171717] rounded-[4px] border-[1px] border-[#2e2e2e] p-1 text-[#7a7a7a] flex flex-row gap-1 items-center h-fit">
              <Image src={IconTimer} alt="" className="w-[17px] h-[17px] text-[#7a7a7a]" />
              <div>1時間30分</div>
            </div>
          </div>
        </section>


        <section className="flex flex-col mt-[80px] text-[#ffffff] gap-11">
          <h2 className="pb-6 border-b-[1px] border-[#2e2e2e]">
            h2＞見出し見出し見出し見出し見出し見出し見出し見出し見出し見出し見出し見出し見出し
          </h2>
          <h3 className="">
            h3＞見出し見出し見出し見出し見出し見出し見出し見出し見出し見出し見出し見出し見出し
          </h3>
          <h4 className="text-[#7a7a7a]">
            h4＞見出し見出し見出し見出し見出し見出し見出し見出し見出し見出し見出し見出し見出し
          </h4>
          <p>
            テキスト＞これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはリンクですこれはリンクですこれはリンクです
          </p>
          <Image src={ImageBlank} alt="" className="self-center object-contain md:px-[60px] md:rounded-3xl rounded-md" />
          <div className="md:block hidden">
            <Image src={ImageVideo} alt="" className="self-center object-contain px-[60px] rounded-3xl" />
          </div>
        </section>


        <section className="flex flex-col gap-[20px] mt-[44px]">
          {
            itemList.map((item: any) => {
              return (
                <DetailItemList
                  image={item.image}
                  title={item.title}
                  content={item.content}
                  price={item.price}
                />
              )
            })
          }
        </section>


        <section className="flex flex-col w-full">
          <div className="py-4 px-6 border-[1px] border-[#2e2e2e] rounded-[10px] text-[16px] text-[#7a7a7a] font-bold mt-[44px]">
            アクセス（見出し）
          </div>
          <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col gap-2">
            <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">集合場所</div>
            <div className="w-full text-[#ffffff]">これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじです</div>
          </div>
          <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col">
            <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">中止の確認方法・連絡日時</div>
            <div className="w-full text-[#ffffff]">状況により中止と判断される場合は、当日までに主催会社よりご連絡いたします。</div>
          </div>
          <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col">
            <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">見出し</div>
            <div className="w-full text-[#ffffff]">これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじ</div>
          </div>
          <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col">
            <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">見出し</div>
            <div className="w-full text-[#ffffff]">これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじ</div>
          </div>
        </section>

        <div className="md:hidden mt-8">
          <Image src={ImageVideo} alt="" className="self-center object-contain rounded-md" />
        </div>
        <section className="flex flex-col mt-[44px]">
          <Image src={ImageMap} alt="" className="w-full md:px-[60px] object-contain" />
          <div className="flex flex-row md:gap-3 gap-2 mt-[80px] md:px-[128px] ">
            <button className="flex flex-row gap-2 text-[#ffffff] bg-[#06C755] rounded-[4px] text-[12px] py-[13px] w-full justify-center"><Image src={ImageLine} alt="" className="self-center" /> LINEで送る </button>
            <button className="flex flex-row gap-2 text-[#ffffff] border-[1px] border-[#ffffff] text-[12px] rounded-[4px] py-[13px] w-full justify-center"><Image src={ImageX} alt="" className="self-center" /> ポスト </button>
            <button className="flex flex-row gap-2 text-[#ffffff] bg-[#1977F2] rounded-[4px] text-[12px] py-[13px] w-full justify-center"><Image src={ImageFacebook} alt="" className="self-center" /> シェア </button>
          </div>
          <div className="mt-12 text-[#7a7a7a] text-center text-[16px]">執筆忍</div>
          <div className="md:px-[128px] mt-4">
            <div className="flex flex-row rounded-[10px] bg-[#171717] p-5 gap-5">
              <Image src={ImageCeo} alt="" className="w-[88px] h-[88px] self-center" />
              <div className="flex flex-col gap-2">
                <div className="text-[#ffffff] text-[14px]">田中太郎</div>
                <div className="text-[#7a7a7a] text-[12px]">この人の説明もしくはコメント）これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅ</div>
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
            <Image src={iconSpot} alt="施設・史跡" width={40} height={40} />
            <h2 className="md:text-[36px] text-[28px] text-ninjack-white">関連する施設・史跡</h2>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-2  gap-[40px]">
            {spots.map((spots: SpotListItemProps, index) => {
              return (
                <SpotListItem
                  key={index}
                  image={spots.image}
                  categroy={spots.categroy}
                  areaName={spots.areaName}
                  title={spots.title}

                />
              );
            })}
          </div>
        </section>


        <section className="mt-[90px] flex flex-col gap-7">
          <div className="flex space-x-4 items-center">
            <Image src={iconActivity} alt="体験・修行" width={40} height={40} />
            <h2 className="md:text-[36px] text-[28px] text-ninjack-white">おすすめの体験・修行</h2>
          </div>
          <div className="border-b -[1px] border-[#2e2e2e] md:block hidden">
            {activities.map((activity: ActivityListItemProps, index) => {
              return (
                <ActivityListItem
                  key={index}
                  image={activity.image}
                  category={activity.category}
                  areaName={activity.areaName}
                  title={activity.title}
                  time={activity.time}
                  price={activity.price}
                  imgHeight={activity.imgHeight}
                  imgWidth={activity.imgWidth}
                />
              );
            })}
          </div>

          <section className="flex flex-col gap-4 md:hidden">
            {subActivities.map((activity: any) => {
              return (
                <ActivitySubList
                  image={activity.image}
                  category={activity.category}
                  title={activity.title}
                  time={activity.time}
                  price={activity.price}
                />
              );
            })}
          </section>
        </section>

        <section className="mt-[52px]">
            <Image src={ImageSub} alt=""  className="md:hidden"/>
        </section>

      </div>

      
      <div className="max-w-[500px] border-l-[1px] border-[#2E2E2E] pl-5 pt-[60px] pr-[100px] hidden md:block">
        <section className="flex flex-col gap-4">
          <span className="text-[16px] text-[#ffffff]">\ 人気の体験 &nbsp;/</span>
          {subActivities.map((activity: any) => {
            return (
              <ActivitySubList
                image={activity.image}
                category={activity.category}
                title={activity.title}
                time={activity.time}
                price={activity.price}
              />
            );
          })}
        </section>

        <section className="flex flex-col gap-4 mt-[50px]">
          <span className="text-[16px] text-[#ffffff]">\ おすすめ商品 &nbsp;/</span>
          <div className="grid grid-cols-2 gap-5">
            {items.map((item: any) => {
              return (
                <ItemItem
                  image={item.image}
                  title={item.title}
                  category=""
                  price={item.price}
                />
              );
            })}
          </div>
        </section>

        <section className="mt-[50px] bg-[#171717] rounded-[10px] px-5     ">
          <KeywordsGroup
            label="関連キーワード"
            keywords={[
              { label: "キーワード", value: "キーワード" },
              { label: "忍者体験", value: "忍者体験" },
              { label: "修行", value: "修行" },
              { label: "キーワード", value: "キーワード" },
              { label: "忍者体験", value: "忍者体験" },
              { label: "キーワード", value: "キーワード" },
              { label: "キーワード", value: "キーワード" },
              { label: "忍者体験", value: "忍者体験" },
              { label: "修行", value: "修行" },
            ]}
          />
        </section>

        <section className="mt-[52px]">
            <Image src={ImageSub} alt="" />
        </section>
      </div> 
    </div>
    </>
  );
}


const itemList = [
  {
    image: ImageNinja,
    title: "プラン名プラン名プラン名プラン名プラン名プラン名",
    content: "れはじゅうもじですこれはじゅうもじですれはじゅうもじですこれはじゅ...",
    price: 1000,
  },
  {
    image: ImageNinja,
    title: "プラン名プラン名プラン名プラン名プラン名プラン名",
    content: "れはじゅうもじですこれはじゅうもじですれはじゅうもじですこれはじゅ...",
    price: 1600,
  }
]

const spots: SpotListItemProps[] = [
  {
    image: imageSpotThumb,
    categroy: "ものづくり",
    areaName: "エリア名",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
  },
  {
    image: imageSpotThumb,
    categroy: "ものづくり",
    areaName: "エリア名",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
  },
  {
    image: imageSpotThumb,
    categroy: "ものづくり",
    areaName: "エリア名",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトル",
  },
];

const activities: ActivityListItemProps[] = [
  {
    image: imageActivityThumb2,
    category: "ものづくり",
    areaName: "エリア名",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    price: "XXXX",
    time: "1時間30分",
    imgWidth: 320,
    imgHeight: 220
  },
  {
    image: imageActivityThumb2,
    category: "ものづくり",
    areaName: "エリア名",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    price: "XXXX",
    time: "1時間30分",
    imgWidth: 320,
    imgHeight: 220
  },
  {
    image: imageActivityThumb2,
    category: "ものづくり",
    areaName: "エリア名",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
    price: "XXXX",
    time: "1時間30分",
    imgWidth: 320,
    imgHeight: 220
  },
];

const subActivities: ActivityListItemProps[] = [
  {
    image: ImageNinja,
    category: "ものづくり",
    areaName: "",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタ…",
    price: "XXXX",
    time: "1時間30分",
    imgWidth: 80,
    imgHeight: 80
  },
  {
    image: ImageNinja,
    category: "ものづくり",
    areaName: "",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタ…",
    price: "XXXX",
    time: "1時間30分",
    imgWidth: 80,
    imgHeight: 80
  },
  {
    image: ImageNinja,
    category: "ものづくり",
    areaName: "",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタ…",
    price: "XXXX",
    time: "1時間30分",
    imgWidth: 80,
    imgHeight: 80
  },
  {
    image: ImageNinja,
    category: "ものづくり",
    areaName: "",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタ…",
    price: "XXXX",
    time: "1時間30分",
    imgWidth: 80,
    imgHeight: 80
  },
];

const items = [
  {
    image: imageItemThumb,
    title: "商品名商品名商品名商品名商品名商品名商…",
    price: "XXXXX",
  },
  {
    image: imageItemThumb,
    title: "商品名商品名商品名商品名商品名商品名商…",
    price: "XXXXX",
  },
  {
    image: imageItemThumb,
    title: "商品名商品名商品名商品名商品名商品名商…",
    price: "XXXXX",
  },
  {
    image: imageItemThumb,
    title: "商品名商品名商品名商品名商品名商品名商…",
    price: "XXXXX",
  }
];
