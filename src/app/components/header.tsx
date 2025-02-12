"use client";

import Image from "next/image";
import iconActivity from "@/assets/icon-activity.svg";
import iconSpot from "@/assets/icon-spot.svg";
import iconItem from "@/assets/icon-item.svg";
import iconResearch from "@/assets/icon-research.svg";
import iconFiction from "@/assets/icon-fiction.svg";
import iconNinja from "@/assets/icon-ninja.svg";
import iconContact from "@/assets/icon-contact.svg";
import iconHamburger from "@/assets/icon-hamburger.svg";
import logo from "@/assets/logo.svg";
import imageEye from "@/assets/eye.svg";
import MenuItem from "./Common/menuItem";
import MenuButton from "./Common/menuButton";
import AboutButtonGroup from "./aboutButtonGroup";
import IconMessage from "@/assets/icon-message.svg";
import Link from "next/link";
import DigitalClock from "./DigitalClock";
import { AllActiveCategories } from "@/lib/contentful/sharedModel";
import { useEffect, useState } from "react";
import { allActiveCategories } from "@/lib/contentful/sharedModel";
import HamburgerMenu from "./Common/humbergerMenu";
import TodayNinjutsu from "./Common/todayNinjutsu";

const Header = () => {
  const openMenu = () => setIsMenuOpen(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<AllActiveCategories | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await allActiveCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchNinjutsu = async () => {
  //     try {
  //       const ninjutsus = await getNinjutsu();
  //       const shuffledNinjutsus = ninjutsus.sort(() => Math.random() - 0.5);
  //       setNinjutsu(shuffledNinjutsus[0] || "データ読み込み中...");
  //     } catch (error) {
  //       console.error("Error fetching ninjutsu:", error);
  //       setNinjutsu("データ読み込みエラー");
  //     }
  //   };

  //   fetchNinjutsu();
  // }, []);

  return (
    <header className="text-ninjack-white">
      <div className="hidden md:block">
        <div className="h-[76px] flex justify-between items-center px-8">
          <h1 className="flex items-center">
            <Link href="/">
              <Image src={logo} alt="忍者ポータルサイト" />
            </Link>
            <p className="ms-3 text-xs">忍者ポータルサイト</p>
            <DigitalClock />
            <Image src={imageEye} alt="猫の目" />
            <TodayNinjutsu />
          </h1>
          <div className="flex space-x-2.5">
            <MenuButton icon={iconContact} label="お問合せ" link="/contact" />
            <MenuButton
              icon={iconHamburger}
              label="メニュー"
              handleClick={openMenu}
            />
          </div>
        </div>
        <nav className="h-[67px] flex justify-between items-center border-t border-b border-ninjack-line-gray px-8">
          <ul className="flex space-x-8 items-center">
            <li>
              <MenuItem
                icon={iconActivity}
                label="体験・修行"
                link="/activity"
                color="ninjack-text-gray"
              />
            </li>
            <li>
              <MenuItem
                icon={iconSpot}
                label="施設・史跡"
                link="/spot"
                color="ninjack-text-gray"
              />
            </li>
            <li>
              <MenuItem
                icon={iconItem}
                label="商品・忍具"
                link="/item"
                color="ninjack-text-gray"
              />
            </li>
            <li>
              <MenuItem
                icon={iconResearch}
                label="研究情報"
                link="/research"
                color="ninjack-text-gray"
              />
            </li>
            <li>
              <MenuItem
                icon={iconFiction}
                label="創作作品"
                link="/fiction"
                color="ninjack-text-gray"
              />
            </li>
            <li>
              <MenuItem
                icon={iconNinja}
                label="現代忍者"
                link="/ninja"
                color="ninjack-text-gray"
              />
            </li>
          </ul>
          <AboutButtonGroup />
        </nav>
      </div>
      <div className="flex flex-col md:hidden gap-2">
        <TodayNinjutsu />
        <div className="flex justify-between items-center p-[12px]">
          <h1 className="flex items-center">
            <div className="flex flex-col gap-1 items-center">
              <Image src={logo} alt="忍者ポータルサイト" />
              <p className="text-[8px]">忍者ポータルサイト</p>
            </div>
            <p className="ms-4 text-xs">11/26</p>
            <p className="mx-1.5 text-xs">12:00</p>
            <Image src={imageEye} alt="猫の目" className="w-[35px]" />
          </h1>
          <div className="md:flex hidden space-x-2.5 ">
            <MenuButton icon={iconContact} label="" link="/contact" />
            <MenuButton icon={iconHamburger} label="" handleClick={openMenu} />
          </div>
          <div className="flex md:hidden space-x-2.5 ">
            <MenuButton icon={IconMessage} label="" link="/contact" />
            <MenuButton icon={iconHamburger} label="" handleClick={openMenu} />
          </div>
        </div>
        <nav className="items-center border-t border-b border-ninjack-line-gray p-2 w-full overflow-x-auto">
          <ul className="flex flex-row md:justify-between items-center min-w-max gap-6 px-2">
            <li className="flex-shrink-0">
              <MenuItem
                icon={iconActivity}
                label="体験・修行"
                link="/activity"
                color="ninjack-text-gray"
              />
            </li>
            <li className="flex-shrink-0">
              <MenuItem
                icon={iconSpot}
                label="施設・史跡"
                link="/spot"
                color="ninjack-text-gray"
              />
            </li>
            <li className="flex-shrink-0">
              <MenuItem
                icon={iconItem}
                label="商品・忍具"
                link="/item"
                color="ninjack-text-gray"
              />
            </li>
            <li className="flex-shrink-0">
              <MenuItem
                icon={iconResearch}
                label="研究情報"
                link="/research"
                color="ninjack-text-gray"
                isSmall
              />
            </li>
            <li className="flex-shrink-0">
              <MenuItem
                icon={iconFiction}
                label="創作作品"
                link="/fiction"
                color="ninjack-text-gray"
              />
            </li>
            <li className="flex-shrink-0">
              <MenuItem
                icon={iconNinja}
                label="現代忍者"
                link="/ninja"
                color="ninjack-text-gray"
              />
            </li>
          </ul>
        </nav>
      </div>
      {categories && (
        <HamburgerMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          categories={categories}
        />
      )}
    </header>
  );
};

export default Header;
