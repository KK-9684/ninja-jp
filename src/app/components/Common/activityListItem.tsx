"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

export interface ActivityListItemProps {
  image: string | StaticImport;
  category: string;
  areaName: string;
  title: string;
  price: string;
  time: string;
  imgWidth: number;
  imgHeight: number;
  href: string;
}

const ActivityListItem = ({
  image,
  category,
  areaName,
  title,
  price,
  time,
  imgWidth,
  imgHeight,
  href,
}: ActivityListItemProps) => {
  return (
    <Link href={href} className="group">
      <div className="flex gap-4 md:gap-0 md:space-x-10 md:py-10 py-4 border-t-[1px] border-[#2e2e2e]">
        <div className="overflow-hidden rounded-lg rounded-tl-[40px] md:rounded-tl-[80px] w-[80px] h-[80px] min-w-[80px] md:w-[320px] md:h-[220px] md:min-w-[320px]">
          <Image
            src={image}
            alt={title}
            width={imgWidth}
            height={imgHeight}
            className="rounded-lg rounded-tl-[40px] md:rounded-tl-[80px] w-[80px] h-[80px] min-w-[80px] md:w-[320px] md:h-[220px] md:min-w-[320px] object-cover group-hover:scale-105 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col md:py-8 w-[100%]">
          <div className="mb-[6px] md:mb-[27px] flex justify-between items-center">
            <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-[12px] md:text-[14px] leading-none">
              {category}
            </div>
            <div className="flex items-center text-ninjack-text-gray">
              <span className="text-2xl leading-none">・</span>
              <span className="text-sm leading-none">{areaName}</span>
            </div>
          </div>
          <div>
            <p className="text-[14px] md:text-[20px] font-bold text-ninjack-white md:mb-3 group-hover:text-ninjack-purple">
              {title}
            </p>
            <div className="text-ninjack-text-gray text-[12px] md:text-[14px]">
              <span className="me-5">料金：{price}</span>
              <span>所要時間：{time}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityListItem;
