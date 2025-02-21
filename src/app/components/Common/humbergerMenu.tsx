"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import MenuItem from "./menuItem";
import iconSpot from "@/assets/icon-spot.svg";
import iconItem from "@/assets/icon-item.svg";
import iconResearch from "@/assets/icon-research.svg";
import iconFiction from "@/assets/icon-fiction.svg";
import iconNinja from "@/assets/icon-ninja.svg";
import iconContact from "@/assets/icon-contact.svg";
import iconClose from "@/assets/icon-close.svg";
import iconPlus from "@/assets/icon-plus.svg";
import CustomLargeButton from "./customLargeButton";
import { AllActiveCategories } from "@/lib/contentful/sharedModel";
import CustomButton from "./customButton";

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
      <div className="container mx-auto px-6 md:py-4 py-10 flex flex-col h-full md:justify-center justify-start max-h-[100vh] overflow-y-scroll md:overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 justify-between md:justify-between w-[100%] items-center mb-8">
          <Link href="/" onClick={onClose}>
            <Image src={logo} alt="忍者ポータルサイト" className="w-[240px]" />
            <p className="text-xs text-center md:text-left text-ninjack-white mt-3">
              忍者ポータルサイト
            </p>
          </Link>
          <div className="flex space-x-2.5">
            <button onClick={onClose}>
              <CustomButton
                text="ABOUT"
                link="/#aboutNinjack"
                font="Geist"
                color="ninjack-text-gray"
              />
            </button>
            <button onClick={onClose}>
              <CustomButton
                text="Ninjack MAGAZINE"
                link="/magazine"
                font="Geist"
                color="ninjack-white"
                isArrow={true}
              />
            </button>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="p-2">
            <Image src={iconClose} alt="閉じる" />
          </button>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-6 md:gap-8 md:my-12 my-2">
          {/* 施設・史跡のセクション */}
          <div className="flex flex-col">
            <details className="md:hidden flex flex-col pt-4 group">
              <summary className="flex items-center justify-between border-b border-ninjack-line-gray pb-4">
                <MenuItem
                  icon={iconSpot}
                  label="施設・史跡"
                  link="/spot"
                  color="ninjack-white"
                  isSmall
                  isFlex
                />
                <Image
                  src={iconPlus}
                  alt="開く"
                  className="group-open:rotate-45 transition-transform duration-300 w-[24px] h-[24px]"
                />
              </summary>
              <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
                <Link
                  href="/spot"
                  onClick={onClose}
                  className="hover:text-ninjack-purple"
                >
                  ー すべて見る
                </Link>
                {categories.spotCategory.map((category) => (
                  <Link
                    href={`/spot?categories=${category.slug}`}
                    key={category.slug}
                    onClick={onClose}
                    className="hover:text-ninjack-purple"
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
              </div>
            </details>
            <div className="hidden md:flex md:flex-col gap-6">
              <MenuItem
                icon={iconSpot}
                label="施設・史跡"
                link="/spot"
                color="ninjack-white"
                isSmall
                isFlex
              />
              <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
                <Link
                  href="/spot"
                  onClick={onClose}
                  className="hover:text-ninjack-purple"
                >
                  ー すべて見る
                </Link>
                {categories.spotCategory.map((category) => (
                  <Link
                    href={`/spot?categories=${category.slug}`}
                    key={category.slug}
                    onClick={onClose}
                    className="hover:text-ninjack-purple"
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 商品・忍具のセクション */}
          <div className="flex flex-col">
            <details className="md:hidden flex flex-col pt-4 group">
              <summary className="flex items-center justify-between border-b border-ninjack-line-gray pb-4">
                <MenuItem
                  icon={iconItem}
                  label="商品・忍具"
                  link="/item"
                  color="ninjack-white"
                  isSmall
                  isFlex
                />
                <Image
                  src={iconPlus}
                  alt="開く"
                  className="group-open:rotate-45 transition-transform duration-300 w-[24px] h-[24px]"
                />
              </summary>
              <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
                <Link
                  href="/item"
                  onClick={onClose}
                  className="hover:text-ninjack-purple"
                >
                  ー すべて見る
                </Link>
                {categories.itemCategory.map((category) => (
                  <Link
                    href={`/item?categories=${category.slug}`}
                    key={category.slug}
                    onClick={onClose}
                    className="hover:text-ninjack-purple"
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
              </div>
            </details>
            <div className="hidden md:flex md:flex-col gap-6">
              <MenuItem
                icon={iconItem}
                label="商品・忍具"
                link="/item"
                color="ninjack-white"
                isSmall
                isFlex
              />
              <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
                <Link
                  href="/item"
                  onClick={onClose}
                  className="hover:text-ninjack-purple"
                >
                  ー すべて見る
                </Link>
                {categories.itemCategory.map((category) => (
                  <Link
                    href={`/item?categories=${category.slug}`}
                    key={category.slug}
                    onClick={onClose}
                    className="hover:text-ninjack-purple"
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 研究情報のセクション */}
          <div className="flex flex-col">
            <details className="md:hidden flex flex-col pt-4 group">
              <summary className="flex items-center justify-between border-b border-ninjack-line-gray pb-4">
                <MenuItem
                  icon={iconResearch}
                  label="研究情報"
                  link="/research"
                  color="ninjack-white"
                  isSmall
                  isFlex
                />
                <Image
                  src={iconPlus}
                  alt="開く"
                  className="group-open:rotate-45 transition-transform duration-300 w-[24px] h-[24px]"
                />
              </summary>
              <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
                <Link
                  href="/research"
                  onClick={onClose}
                  className="hover:text-ninjack-purple"
                >
                  ー すべて見る
                </Link>
                {categories.researchCategory.map((category) => (
                  <Link
                    href={`/research?categories=${category.slug}`}
                    key={category.slug}
                    onClick={onClose}
                    className="hover:text-ninjack-purple"
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
              </div>
            </details>
            <div className="hidden md:flex md:flex-col gap-6">
              <MenuItem
                icon={iconResearch}
                label="研究情報"
                link="/research"
                color="ninjack-white"
                isSmall
                isFlex
              />
              <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
                <Link
                  href="/research"
                  onClick={onClose}
                  className="hover:text-ninjack-purple"
                >
                  ー すべて見る
                </Link>
                {categories.researchCategory.map((category) => (
                  <Link
                    href={`/research?categories=${category.slug}`}
                    key={category.slug}
                    onClick={onClose}
                    className="hover:text-ninjack-purple"
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 創作作品のセクション */}
          <div className="flex flex-col">
            <details className="md:hidden flex flex-col pt-4 group">
              <summary className="flex items-center justify-between border-b border-ninjack-line-gray pb-4">
                <MenuItem
                  icon={iconFiction}
                  label="創作作品"
                  link="/fiction"
                  color="ninjack-white"
                  isSmall
                  isFlex
                />
                <Image
                  src={iconPlus}
                  alt="開く"
                  className="group-open:rotate-45 transition-transform duration-300 w-[24px] h-[24px]"
                />
              </summary>
              <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
                <Link
                  href="/fiction"
                  onClick={onClose}
                  className="hover:text-ninjack-purple"
                >
                  ー すべて見る
                </Link>
                {categories.fictionCategory.map((category) => (
                  <Link
                    href={`/fiction?categories=${category.slug}`}
                    key={category.slug}
                    onClick={onClose}
                    className="hover:text-ninjack-purple"
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
              </div>
            </details>
            <div className="hidden md:flex md:flex-col gap-6">
              <MenuItem
                icon={iconFiction}
                label="創作作品"
                link="/fiction"
                color="ninjack-white"
                isSmall
                isFlex
              />
              <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
                <Link
                  href="/fiction"
                  onClick={onClose}
                  className="hover:text-ninjack-purple"
                >
                  ー すべて見る
                </Link>
                {categories.fictionCategory.map((category) => (
                  <Link
                    href={`/fiction?categories=${category.slug}`}
                    key={category.slug}
                    onClick={onClose}
                    className="hover:text-ninjack-purple"
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 現代忍者のセクション */}
          <div className="flex flex-col">
            <details className="md:hidden flex flex-col pt-4 group">
              <summary className="flex items-center justify-between border-b border-ninjack-line-gray pb-4">
                <MenuItem
                  icon={iconNinja}
                  label="現代忍者"
                  link="/ninja"
                  color="ninjack-white"
                  isSmall
                  isFlex
                />
                <Image
                  src={iconPlus}
                  alt="開く"
                  className="group-open:rotate-45 transition-transform duration-300 w-[24px] h-[24px]"
                />
              </summary>
              <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
                <Link
                  href="/ninja"
                  onClick={onClose}
                  className="hover:text-ninjack-purple"
                >
                  ー すべて見る
                </Link>
                {categories.memberCategory.map((category) => (
                  <Link
                    href={`/ninja?categories=${category.slug}`}
                    key={category.slug}
                    onClick={onClose}
                    className="hover:text-ninjack-purple"
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
              </div>
            </details>
            <div className="hidden md:flex md:flex-col gap-6">
              <MenuItem
                icon={iconNinja}
                label="現代忍者"
                link="/ninja"
                color="ninjack-white"
                isSmall
                isFlex
              />
              <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
                <Link
                  href="/ninja"
                  onClick={onClose}
                  className="hover:text-ninjack-purple"
                >
                  ー すべて見る
                </Link>
                {categories.memberCategory.map((category) => (
                  <Link
                    href={`/ninja?categories=${category.slug}`}
                    key={category.slug}
                    onClick={onClose}
                    className="hover:text-ninjack-purple"
                  >
                    {`ー ${category.title}`}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-12">
          <div className="flex flex-row gap-4 md:gap-8 text-sm text-ninjack-text-gray flex-wrap justify-center">
            <Link href="/commercial" onClick={onClose}>
              特定商取引法の表示
            </Link>
            <Link href="/terms" onClick={onClose}>
              利用規約
            </Link>
            <Link href="/privacy-policy" onClick={onClose}>
              プライバシーポリシー
            </Link>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <button onClick={onClose}>
              <CustomLargeButton
                icon={iconContact}
                text="お問い合わせ"
                type={1}
                font="NotoSansJp"
                link="/contact"
              />
            </button>
            <button onClick={onClose}>
              <CustomLargeButton
                text="メールマガジン配信登録"
                font="NotoSansJp"
                type={2}
                isArrow
                link="/mail-magazine"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
