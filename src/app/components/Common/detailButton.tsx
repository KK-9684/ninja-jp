"use client";

import Image from "next/image";
import iconRightArrow from "@/assets/icon-right-arrow.svg";
import clsx from "clsx";

interface detailButtonProps {
  size: number;
}

const DetailButton = ({ size }: detailButtonProps) => {
  return (
    <div>
      <div
        onClick={() => {
          return;
        }}
        className="md:hidden w-full"
      >

        <div
          className={clsx(
            size === 400 ? "justify-center" : "justify-between",
            "p-4 flex md:hidden items-center border border-ninjack-line-gray rounded bg-ninjack-bg-gray w-full"
          )}

        >
          <span className="text-sm text-ninjack-white leading-none me-5">もっと見る</span>
          <Image src={iconRightArrow} alt="icon-right-arrow" />
        </div>
      </div>
      <div
        onClick={() => {
          return;
        }}
        className="hidden md:block"
      >
        <div
          className={clsx(
            size === 400 ? "justify-center" : "justify-between",
            "p-4 md:flex hidden items-center border border-ninjack-line-gray rounded bg-ninjack-bg-gray"
          )}
          style={{ width: `${size}px` }}
        >
          <span className="text-sm text-ninjack-white leading-none me-5">もっと見る</span>
          <Image src={iconRightArrow} alt="icon-right-arrow" />
        </div>
      </div>
    </div>
  );
};

export default DetailButton;
