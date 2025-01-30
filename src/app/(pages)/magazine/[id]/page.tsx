import Image from "next/image";
import RichContent from "@/app/components/Common/RichContent";
import { getMagazine } from "../fetcher";
import RecommendActivity from "@/app/components/Common/RecommendActivity";
import RecommendItem from "@/app/components/Common/RecommendItem";
import TagList from "@/app/components/Common/TagList";

import ActivityListItem, {
  ActivityListItemProps,
} from "@/app/components/Common/activityListItem";
import ImageBlank from "@/assets/image-blank.png";
import ImageNinja from "@/assets/image-ninja1.png";
import ImageLine from "@/assets/icon-line.svg";
import ImageX from "@/assets/icon-x.svg";
import ImageFacebook from "@/assets/icon-facebook.svg";
import ImageCeo from "@/assets/image-ceo.png";
import IconYoutube from "@/assets/icon-youtube.svg";
import IconX from "@/assets/icon-x1.svg";
import IconInstagram from "@/assets/icon-instagram.svg";
import imageMagazineNew from "@/assets/image-magazine-new.png";
import ActivitySubList from "@/app/components/Common/activitySubList";
import imageItemThumb from "@/assets/image-item-thumb.jpg";
import ItemItem from "@/app/components/Common/itemItem";
import KeywordsGroup from "@/app/components/keywordsGroup";
import ImageSub from "@/assets/image-sub-magazine.png";
import IconNext from "@/assets/icon-next.svg";
import KeywordsDetail from "@/app/components/keywordsDetail";
import MagazineTpop from "@/assets/image-magazine-top.png";
import MagazineList from "@/app/components/Common/magazineList";

export default async function MagazineDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const magazine = await getMagazine(id);

  if (magazine === null) {
    return <h1>Not Found</h1>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>カテゴリ</th>
            <th>タグ</th>
            <th>画像</th>
            <th>コンテンツ</th>
            <th>編集者</th>
          </tr>
        </thead>
        <tbody>
          <tr key={magazine.slug}>
            <td>{magazine.title}</td>
            <td>
              {magazine.category?.map((ct) => (
                <p key={ct.slug}>{ct.title}</p>
              ))}
            </td>
            <td>{magazine.tag}</td>
            <td>
              {magazine.image?.map((img) => (
                <Image
                  key={img.alt}
                  src={img.url}
                  alt={img.alt}
                  width={324}
                  height={160}
                />
              ))}
            </td>
            <td>{RichContent(magazine.content)}</td>
            <td>
              {magazine.writer && (
                <>
                  <p>{magazine.writer.name}</p>
                  {RichContent(magazine.writer.content)}
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <RecommendActivity limit={4} />
      <RecommendItem limit={4} />
      <TagList limit={10} />
      <div className="flex flex-row">
        <div className="w-full flex flex-col md:p-[60px] md:pl-[100px] p-8">
          <section className="flex flex-col ">
            <div className="flex justify-between">
              <div className="flex gap-6 items-center text-[14px] mb-6">
                <div className="leading-none bg-ninjack-white px-[7px] py-[5px]">
                  NEW
                </div>
                <div className="flex space-x-0 items-center">
                  <span className="text-xl" style={{ color: "#63B8A7" }}>
                    ・
                  </span>
                  <span className="text-ninjack-text-gray ">ニュース</span>
                </div>
              </div>
              <div className="text-sm text-ninjack-text-gray">2024.01.01</div>
            </div>
            <p className="text-ninjack-white text-[28px] font-bold mb-2">
              タイトルタイトルタイトルタイトルタイトルタイトルタイトル
            </p>
            <KeywordsDetail
              keywords={[
                { label: "キーワード", value: "キーワード" },
                { label: "忍者体験", value: "忍者体験" },
                { label: "修行", value: "修行" },
                { label: "修行", value: "修行" },
                { label: "忍者体験", value: "忍者体験" },
                { label: "忍者体験", value: "忍者体験" },
              ]}
            />
            <Image src={MagazineTpop} alt="" />
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
            <Image
              src={ImageBlank}
              alt=""
              className="self-center object-contain md:px-[60px] rounded-3xl"
            />
            <div className="flex md:flex-row flex-col gap-4">
              <button className="flex flex-row justify-between px-[20px] py-[24px] w-full bg-ninjack-bg-gray border-ninjack-line-gray border-[1px] rounded-[6px]">
                <span>関連リンク（自由テキスト）</span>{" "}
                <Image src={IconNext} alt="" className="self-center" />
              </button>
              <button className="flex flex-row justify-between px-[20px] py-[24px] w-full bg-ninjack-bg-gray border-ninjack-line-gray border-[1px] rounded-[6px]">
                <span>関連リンク（自由テキスト）</span>{" "}
                <Image src={IconNext} alt="" className="self-center" />
              </button>
              <button className="flex flex-row justify-between px-[20px] py-[24px] w-full bg-ninjack-bg-gray border-ninjack-line-gray border-[1px] rounded-[6px]">
                <span>関連リンク（自由テキスト）</span>{" "}
                <Image src={IconNext} alt="" className="self-center" />
              </button>
            </div>
          </section>

          <section className="flex flex-col mt-[44px]">
            <div className="flex flex-row md:gap-3 gap-2 mt-[80px] md:px-[128px] ">
              <button className="flex flex-row gap-2 text-[#ffffff] bg-[#06C755] rounded-[4px] py-[13px] w-full justify-center text-[12px]">
                <Image src={ImageLine} alt="" className="self-center" />{" "}
                LINEで送る{" "}
              </button>
              <button className="flex flex-row gap-2 text-[#ffffff] border-[1px] border-[#ffffff] rounded-[4px] py-[13px] w-full justify-center text-[12px]">
                <Image src={ImageX} alt="" className="self-center" /> ポスト{" "}
              </button>
              <button className="flex flex-row gap-2 text-[#ffffff] bg-[#1977F2] rounded-[4px] py-[13px] w-full justify-center text-[12px]">
                <Image src={ImageFacebook} alt="" className="self-center" />{" "}
                シェア{" "}
              </button>
            </div>
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
              <h2 className="md:text-[36px] text-[28px] text-ninjack-white">
                おすすめのマガジン
              </h2>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-[40px] gap-8">
              {magazineList.map((item: any) => {
                return (
                  <MagazineList
                    image={item.image}
                    newone={item.newone}
                    category={item.category}
                    date={item.date}
                    title={item.title}
                    content={item.content}
                  />
                );
              })}
            </div>
          </section>
          <section className="mt-[52px]">
            <Image src={ImageSub} alt="" className="h-[203px] object-contain" />
          </section>
        </div>

        <div className="md:block hidden max-w-[500px] border-l-[1px] border-[#2E2E2E] pl-5 pt-[60px] pr-[100px]">
          <section className="flex flex-col gap-4">
            <span className="text-[16px] text-[#ffffff]">
              \ 人気の体験 &nbsp;/
            </span>
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
            <span className="text-[16px] text-[#ffffff]">
              \ おすすめ商品 &nbsp;/
            </span>
            <div className="grid grid-cols-2 gap-5">
              {items.map((item: any) => {
                return (
                  <ItemItem
                    image={item.image}
                    category=""
                    title={item.title}
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
        </div>
      </div>
    </>
  );
}

const subActivities: ActivityListItemProps[] = [
  {
    image: ImageNinja,
    category: "ものづくり",
    areaName: "",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタ…",
    price: "XXXX",
    time: "1時間30分",
    imgWidth: 80,
    imgHeight: 80,
  },
  {
    image: ImageNinja,
    category: "ものづくり",
    areaName: "",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタ…",
    price: "XXXX",
    time: "1時間30分",
    imgWidth: 80,
    imgHeight: 80,
  },
  {
    image: ImageNinja,
    category: "ものづくり",
    areaName: "",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタ…",
    price: "XXXX",
    time: "1時間30分",
    imgWidth: 80,
    imgHeight: 80,
  },
  {
    image: ImageNinja,
    category: "ものづくり",
    areaName: "",
    title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタ…",
    price: "XXXX",
    time: "1時間30分",
    imgWidth: 80,
    imgHeight: 80,
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
  },
];

const magazineList = [
  {
    image: imageMagazineNew,
    newone: true,
    category: "ニュース",
    date: "2024.01.01",
    title: "記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…",
  },
  {
    image: imageMagazineNew,
    newone: true,
    category: "ニュース",
    date: "2024.01.01",
    title: "記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…",
  },
  {
    image: imageMagazineNew,
    newone: true,
    category: "ニュース",
    date: "2024.01.01",
    title: "記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル",
    content:
      "これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…",
  },
];
