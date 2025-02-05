"use client";

import Image from "next/image";
import iconRightArrow from "@/assets/icon-right-arrow.svg";
import clsx from "clsx";

interface detailButtonProps {
  size: number;
  href: string;
}

const DetailButton = ({ href, size }: detailButtonProps) => {
  return (
    <a href={href}>
      <div
        onClick={() => {
          return;
        }}
        className="md:hidden w-full group"
      >
        <div
          className={clsx(
            size === 400 ? "justify-center" : "justify-between",
            "p-4 flex md:hidden items-center border border-ninjack-line-gray rounded bg-ninjack-bg-gray w-full",
            "group-hover:text-ninjack-purple"
          )}
        >
          <span className="text-sm text-ninjack-white leading-none me-5">
            もっと見る
          </span>
          <Image src={iconRightArrow} alt="icon-right-arrow" />
        </div>
      </div>
      <div
        onClick={() => {
          return;
        }}
        className="hidden md:block group"
      >
        <div
          className={clsx(
            size === 400 ? "justify-center" : "justify-between",
            "p-4 md:flex hidden items-center border border-ninjack-line-gray rounded bg-ninjack-bg-gray",
            "group-hover:border-ninjack-purple"
          )}
          style={{ width: `${size}px` }}
        >
          <span
            className={clsx("text-sm text-ninjack-white leading-none me-5")}
          >
            もっと見る
          </span>
          <Image src={iconRightArrow} alt="icon-right-arrow" />
        </div>
      </div>
    </a>
  );
};

export default DetailButton;
