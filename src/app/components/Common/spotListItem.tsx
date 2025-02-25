"use client";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

export interface SpotListItemProps {
  image: StaticImport | string;
  category: string;
  areaName: string;
  title: string;
  href: string;
  price?: string;
}

const SpotListItem = ({
  href,
  image,
  category,
  areaName,
  title,
  price,
}: SpotListItemProps) => {
  return (
    <Link href={href} className="flex flex-col space-y-6 group">
      <div className="overflow-hidden aspect-square rounded-lg">
        <Image
          src={image}
          alt={title}
          className="rounded-lg object-cover aspect-square group-hover:scale-105 transition-all duration-300"
          width={286}
          height={286}
        />
      </div>
      <div className="flex flex-col justify-between py-1">
        <div className="mb-[27px] flex justify-between items-center">
          <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none">
            {category}
          </div>
          <div className="flex items-center text-ninjack-text-gray">
            <span className="text-2xl leading-none">・</span>
            <span className="text-sm leading-none">{areaName}</span>
          </div>
        </div>
        <div>
          <p className="font-bold text-ninjack-white mb-3 group-hover:text-ninjack-purple">
            {title}
          </p>
          {price && (
            <div className="text-ninjack-text-gray text-sm">料金：{price}</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SpotListItem;
