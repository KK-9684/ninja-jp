"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import AboutButtonGroup from "../aboutButtonGroup";
import MenuItem from "./menuItem";
import iconActivity from "@/assets/icon-activity.svg";
import iconSpot from "@/assets/icon-spot.svg";
import iconItem from "@/assets/icon-item.svg";
import iconResearch from "@/assets/icon-research.svg";
import iconFiction from "@/assets/icon-fiction.svg";
import iconNinja from "@/assets/icon-ninja.svg";
import iconMail from "@/assets/icon-mail.svg";
import iconClose from "@/assets/icon-close.svg";
import CustomLargeButton from "./customLargeButton";
import { AllActiveCategories } from "@/lib/contentful/sharedModel";

type HamburgerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: AllActiveCategories;
};

const HamburgerMenu = ({ isOpen, onClose, categories }: HamburgerMenuProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 bg-ninjack-black z-50 overflow-y-auto transition-[0.2s] ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex flex-col h-full justify-center">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Image src={logo} alt="忍者ポータルサイト" className="w-[240px]" />
            <p className="text-xs text-ninjack-white mt-3">
              忍者ポータルサイト
            </p>
          </div>
          <AboutButtonGroup />
        </div>
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="p-2">
            <Image src={iconClose} alt="閉じる" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 my-12">
          <div className="flex flex-col space-y-6">
            <MenuItem
              icon={iconActivity}
              label="体験・修行"
              link="/activity"
              color="ninjack-white"
              isSmall
            />
            <div className="flex flex-col items-start space-y-4 text-xs text-ninjack-text-gray">
              <Link href="/activity" onClick={onClose}>
                ー 一覧
              </Link>
              {categories.activityCategory.map((category) => (
                <Link
                  href={`/activity?categories=${category.slug}`}
                  key={category.slug}
                  onClick={onClose}
                >
                  {`ー ${category.title}`}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <MenuItem
              icon={iconSpot}
              label="施設・史跡"
              link="/spot"
              color="ninjack-white"
              isSmall
            />
            <div className="flex flex-col items-start space-y-4 text-xs text-ninjack-text-gray">
              <Link href="/spot" onClick={onClose}>
                ー 一覧
              </Link>
              {categories.spotCategory.map((category) => (
                <Link
                  href={`/spot?categories=${category.slug}`}
                  key={category.slug}
                  onClick={onClose}
                >
                  {`ー ${category.title}`}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <MenuItem
              icon={iconItem}
              label="商品・忍具"
              link="/item"
              color="ninjack-white"
              isSmall
            />
            <div className="flex flex-col items-start space-y-4 text-xs text-ninjack-text-gray">
              <Link href="/item" onClick={onClose}>
                ー 一覧
              </Link>
              {categories.itemCategory.map((category) => (
                <Link
                  href={`/item?categories=${category.slug}`}
                  key={category.slug}
                  onClick={onClose}
                >
                  {`ー ${category.title}`}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <MenuItem
              icon={iconResearch}
              label="研究情報"
              link="/research"
              color="ninjack-white"
              isSmall
            />
            <div className="flex flex-col items-start space-y-4 text-xs text-ninjack-text-gray">
              <Link href="/research" onClick={onClose}>
                ー 一覧
              </Link>
              {categories.researchCategory.map((category) => (
                <Link
                  href={`/research?categories=${category.slug}`}
                  key={category.slug}
                  onClick={onClose}
                >
                  {`ー ${category.title}`}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <MenuItem
              icon={iconFiction}
              label="創作作品"
              link="/fiction"
              color="ninjack-white"
              isSmall
            />
            <div className="flex flex-col items-start space-y-4 text-xs text-ninjack-text-gray">
              <Link href="/fiction" onClick={onClose}>
                ー 一覧
              </Link>
              {categories.fictionCategory.map((category) => (
                <Link
                  href={`/fiction?categories=${category.slug}`}
                  key={category.slug}
                  onClick={onClose}
                >
                  {`ー ${category.title}`}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <MenuItem
              icon={iconNinja}
              label="現代忍者"
              link="/ninja"
              color="ninjack-white"
              isSmall
            />
            <div className="flex flex-col items-start space-y-4 text-xs text-ninjack-text-gray">
              <Link href="/ninja" onClick={onClose}>
                ー 一覧
              </Link>
              {categories.memberCategory.map((category) => (
                <Link
                  href={`/ninja?categories=${category.slug}`}
                  key={category.slug}
                  onClick={onClose}
                >
                  {`ー ${category.title}`}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-12">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-ninjack-text-gray">
            <Link href="/commercial" onClick={onClose}>
              特定商取引法の表示
            </Link>
            <Link href="" onClick={onClose}>
              利用規約
            </Link>
            <Link href="" onClick={onClose}>
              プライバシーポリシー
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
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
      </div>
    </div>
  );
};

export default HamburgerMenu;
