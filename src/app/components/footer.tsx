import Link from "next/link";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import AboutButtonGroup from "./aboutButtonGroup";
import MenuItem from "./Common/menuItem";
import iconActivity from "@/assets/icon-activity.svg";
import iconSpot from "@/assets/icon-spot.svg";
import iconItem from "@/assets/icon-item.svg";
import iconResearch from "@/assets/icon-research.svg";
import iconFiction from "@/assets/icon-fiction.svg";
import iconNinja from "@/assets/icon-ninja.svg";
import iconMail from "@/assets/icon-mail.svg";
import CustomLargeButton from "./Common/customLargeButton";
import FooterSpItem from "./footerSpItem";

const Footer = () => {
  return (
    <footer className="text-ninjack-text-gray text-center p-4">
      <div className="hidden md:block">
        <div className="w-[1208px] flex justify-between items-center mx-auto px-6 pt-[120px] mb-20">
          <div>
            <Image src={logo} alt="忍者ポータルサイト" className="w-[240px]" />
            <p className="text-xs text-ninjack-white mt-3">
              忍者ポータルサイト
            </p>
          </div>
          <AboutButtonGroup />
        </div>
        <div className="w-[1208px] grid grid-cols-6 justify-between mx-auto px-6 mb-20">
          <div className="flex flex-col space-y-6 items-start">
            <MenuItem
              icon={iconActivity}
              label="体験・修行"
              link="/activity"
              color="ninjack-white"
              isSmall
            />
            <div className="flex flex-col items-start space-y-4 text-xs">
              <p>ー 体験</p>
              <p>ー ものづくり</p>
            </div>
          </div>
          <div className="flex flex-col space-y-6 items-start">
            <MenuItem
              icon={iconSpot}
              label="施設・史跡"
              link="/spot"
              color="ninjack-white"
              isSmall
            />
            <div className="flex flex-col items-start space-y-4 text-xs">
              <p>ー 史跡</p>
              <p>ー テーマパーク</p>
              <p>ー 道場</p>
              <p>ー 販売店</p>
              <p>ー 飲食店</p>
              <p>ー その他</p>
            </div>
          </div>
          <div className="flex flex-col space-y-6 items-start">
            <MenuItem
              icon={iconItem}
              label="商品・忍具"
              link="/item"
              color="ninjack-white"
              isSmall
            />
            <div className="flex flex-col items-start space-y-4 text-xs">
              <p>ー 忍具</p>
              <p>ー 衣装</p>
              <p>ー 書籍</p>
              <p>ー アクセサリー</p>
            </div>
          </div>
          <div className="flex flex-col space-y-6 items-start">
            <MenuItem
              icon={iconResearch}
              label="研究情報"
              link="/research"
              color="ninjack-white"
              isSmall
            />
            <div className="flex flex-col items-start space-y-4 text-xs">
              <p>ー 書籍・論文</p>
              <p>ー 歴史・人物</p>
              <p>ー 忍術</p>
            </div>
          </div>
          <div className="flex flex-col space-y-6 items-start">
            <MenuItem
              icon={iconFiction}
              label="創作作品"
              link="/fiction"
              color="ninjack-white"
              isSmall
            />
            <div className="flex flex-col items-start space-y-4 text-xs">
              <p>ー 漫画</p>
              <p>ー アニメ</p>
              <p>ー 映画</p>
              <p>ー ドラマ</p>
              <p>ー 舞台</p>
              <p>ー ゲーム</p>
              <p>ー 音楽</p>
              <p>ー その他</p>
            </div>
          </div>
          <div className="flex flex-col space-y-6 items-start">
            <MenuItem
              icon={iconNinja}
              label="現代忍者"
              link="/ninja"
              color="ninjack-white"
              isSmall
            />
            <div className="flex flex-col items-start space-y-4 text-xs">
              <p>ー チーム・団体</p>
              <p>ー 個人</p>
            </div>
          </div>
        </div>
        <div className="w-[1208px] flex justify-between items-center mx-auto px-6 mb-20">
          <div className="flex space-x-8 text-sm">
            <Link href={"/commercial"}>特定商取引法の表示</Link>
            <Link href={""}>利用規約</Link>
            <Link href={""}>プライバシーポリシー</Link>
          </div>
          <div className="flex space-x-4">
            <CustomLargeButton
              icon={iconMail}
              text="お問い合わせ"
              type={1}
              font="NotoSansJp"
            />
            <CustomLargeButton
              text="メールマガジン配信登録"
              font="NotoSansJp"
              type={2}
              isArrow
            />
          </div>
        </div>
        <div className="mb-10">
          <span className="text-xs">©︎Ninjack, Inc.</span>
        </div>
      </div>

      <div className="flex flex-col md:hidden">
        <div className="flex flex-col items-center mx-auto px-6 mt-[80px] mb-20 gap-6">
          <div>
            <Image src={logo} alt="忍者ポータルサイト" className="w-[240px]" />
            <p className="text-xs text-ninjack-white mt-3">
              忍者ポータルサイト
            </p>
          </div>
          <AboutButtonGroup />
        </div>
        <div className="flex flex-col justify-between px-6 mb-10">
          <div className="flex flex-col space-y-6 items-start">
            <FooterSpItem
              image={iconActivity}
              title="体験・修行"
              items={[
                {
                  link: "/activity",
                  title: "一覧",
                },
                {
                  link: "/",
                  title: "体験",
                },
                {
                  link: "/",
                  title: "ものづくり",
                },
              ]}
            />
          </div>
          <div className="flex flex-col space-y-6 items-start">
            <FooterSpItem
              image={iconSpot}
              title="施設・史跡"
              items={[
                {
                  link: "/spot",
                  title: "一覧",
                },
                {
                  link: "/",
                  title: "史跡",
                },
                {
                  link: "/",
                  title: "テーマパーク",
                },
                {
                  link: "/",
                  title: "道場",
                },
                {
                  link: "/",
                  title: "販売店",
                },
                {
                  link: "/",
                  title: "飲食店",
                },
                {
                  link: "/",
                  title: "その他",
                },
              ]}
            />
          </div>
          <div className="flex flex-col space-y-6 items-start">
            <FooterSpItem
              image={iconItem}
              title="商品・忍具"
              items={[
                {
                  link: "/item",
                  title: "一覧",
                },
                {
                  link: "/",
                  title: "忍具",
                },
                {
                  link: "/",
                  title: "衣装",
                },
                {
                  link: "/",
                  title: "書籍",
                },
                {
                  link: "/",
                  title: "アクセサリー",
                },
              ]}
            />
          </div>
          <div className="flex flex-col space-y-6 items-start">
            <FooterSpItem
              image={iconResearch}
              title="研究情報"
              items={[
                {
                  link: "/research",
                  title: "一覧",
                },
                {
                  link: "/",
                  title: "書籍・論文",
                },
                {
                  link: "/",
                  title: "歴史・人物",
                },
                {
                  link: "/",
                  title: "忍術",
                },
              ]}
            />
          </div>
          <div className="flex flex-col space-y-6 items-start">
            <FooterSpItem
              image={iconFiction}
              title="創作作品"
              items={[
                {
                  link: "/fiction",
                  title: "一覧",
                },
                {
                  link: "/",
                  title: "漫画",
                },
                {
                  link: "/",
                  title: "アニメ",
                },
                {
                  link: "/",
                  title: "映画",
                },
                {
                  link: "/",
                  title: "ドラマ",
                },
                {
                  link: "/",
                  title: "舞台",
                },
                {
                  link: "/",
                  title: "ゲーム",
                },
                {
                  link: "/",
                  title: "音楽",
                },
                {
                  link: "/",
                  title: "その他",
                },
              ]}
            />
          </div>
          <div className="flex flex-col space-y-6 items-start">
            <FooterSpItem
              image={iconNinja}
              title="創作作品"
              items={[
                {
                  link: "/ninja",
                  title: "一覧",
                },
                {
                  link: "/",
                  title: "チーム・団体",
                },
                {
                  link: "/",
                  title: "個人",
                },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between items-center mx-auto px-6 mb-10 gap-8">
          <div className="flex space-x-4 text-[12px]">
            <Link href={"/commercial"}>特定商取引法の表示</Link>
            <Link href={""}>利用規約</Link>
            <Link href={""}>プライバシーポリシー</Link>
          </div>
          <div className="flex flex-col  gap-4">
            <CustomLargeButton
              text="メールマガジン配信登録"
              font="NotoSansJp"
              type={2}
              isArrow
            />
            <CustomLargeButton
              icon={iconMail}
              text="お問い合わせ"
              type={1}
              font="NotoSansJp"
            />
          </div>
        </div>
        <div className="mb-10">
          <span className="text-xs">©︎Ninjack, Inc.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
