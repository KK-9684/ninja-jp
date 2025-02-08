"use client";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import IconMin from "@/assets/icon-min.svg";
import IconPlus from "@/assets/icon-plus.svg";
import Link from "next/link";

// インターフェースの定義
interface FooterItem {
  title: string;
  link: string;
}

interface FooterSpItemProps {
  image: StaticImageData;
  title: string;
  items: FooterItem[];
}

export default function FooterSpItem({
  image,
  title,
  items,
}: FooterSpItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  return !isOpen ? (
    <button
      className="flex flex-row justify-between border-b-[1px] border-ninjack-line-gray p-3 w-full"
      onClick={() => setIsOpen(true)}
    >
      <div className="flex flex-row gap-2">
        <Image src={image} alt="" />
        <span className="text-ninjack-white font-bold text-[16px]">
          {title}
        </span>
      </div>
      <Image src={IconPlus} alt="" />
    </button>
  ) : (
    <div className="flex flex-col border-b-[1px] border-ninjack-line-gray gap-2 p-3 w-full">
      <button
        className="flex flex-row justify-between "
        onClick={() => setIsOpen(false)}
      >
        <div className="flex flex-row gap-2">
          <Image src={image} alt="" />
          <span className="text-ninjack-white font-bold text-[16px]">
            {title}
          </span>
        </div>
        <Image src={IconMin} alt="" />
      </button>
      <div className="flex flex-col gap-2 px-8 text-left text-ninjack-white">
        {items.map((item: FooterItem, index: number) => {
          return (
            <Link className="text-[12px]" href={item.link} key={index}>
              <span className="text-[20px]">-</span> &nbsp;{item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
