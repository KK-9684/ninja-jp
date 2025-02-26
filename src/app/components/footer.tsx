"use client";
import { useState, useEffect } from "react";
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
import iconContact from "@/assets/icon-contact.svg";
import CustomLargeButton from "./Common/customLargeButton";
import { allActiveCategories } from "@/lib/contentful/sharedModel";
import { AllActiveCategories } from "@/lib/contentful/sharedModel";

import FooterExpandMenu from "./Common/FooterExpandMenu";

// デフォルトのカテゴリー構造を作成
const defaultCategories: AllActiveCategories = {
  activityCategory: [],
  spotCategory: [],
  itemCategory: [],
  researchCategory: [],
  fictionCategory: [],
  memberCategory: [],
};

const Footer = () => {
  const [categories, setCategories] =
    useState<AllActiveCategories>(defaultCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching categories data...");
        const categoriesData = await allActiveCategories();
        console.log("Categories data received:", categoriesData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Current loading state:", loading);
  console.log("Current categories:", categories);

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
              {!loading &&
                categories.activityCategory.map((category) => (
                  <Link
                    href={`/activity?categories=${category.slug}`}
                    key={category.slug}
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
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
              {!loading &&
                categories.spotCategory.map((category) => (
                  <Link
                    href={`/spot?categories=${category.slug}`}
                    key={category.slug}
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
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
              {!loading &&
                categories.itemCategory.map((category) => (
                  <Link
                    href={`/item?categories=${category.slug}`}
                    key={category.slug}
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
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
              {!loading &&
                categories.researchCategory.map((category) => (
                  <Link
                    href={`/research?categories=${category.slug}`}
                    key={category.slug}
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
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
              {!loading &&
                categories.fictionCategory.map((category) => (
                  <Link
                    href={`/fiction?categories=${category.slug}`}
                    key={category.slug}
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
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
              {!loading &&
                categories.memberCategory.map((category) => (
                  <Link
                    href={`/ninja?categories=${category.slug}`}
                    key={category.slug}
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="w-[1208px] flex justify-between items-center mx-auto px-6 mb-20">
          <div className="flex space-x-8 text-sm">
            <Link href={"/commercial"}>特定商取引法の表示</Link>
            <Link href={"/terms"}>利用規約</Link>
            <Link href={"/privacy-policy"}>プライバシーポリシー</Link>
          </div>
          <div className="flex space-x-4">
            <CustomLargeButton
              icon={iconMail}
              text="お問い合わせ"
              type={1}
              font="NotoSansJp"
              link="/contact"
            />
            <CustomLargeButton
              text="メールマガジン配信登録"
              font="NotoSansJp"
              type={2}
              isArrow
              link="/mail-magazine"
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
        {!loading && <FooterExpandMenu categories={categories} />}
        <div className="flex flex-col justify-between items-center mx-auto px-6 mb-10 gap-8">
          <div className="flex space-x-4 text-[12px]">
            <Link href={"/commercial"}>特定商取引法の表示</Link>
            <Link href={"/terms"}>利用規約</Link>
            <Link href={"/privacy-policy"}>プライバシーポリシー</Link>
          </div>
          <div className="flex flex-col gap-4">
            <CustomLargeButton
              text="メールマガジン配信登録"
              font="NotoSansJp"
              type={2}
              isArrow
              link="/mail-magazine"
            />
            <CustomLargeButton
              icon={iconContact}
              text="お問い合わせ"
              type={1}
              font="NotoSansJp"
              link="/contact"
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
