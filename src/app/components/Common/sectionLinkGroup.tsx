"use client";

import { useState } from "react"; // useEffectは使用していないので削除
import clsx from "clsx";
import Link from "next/link";

export interface SectionLinkGroupProps {
  text: string;
  link: string;
}

interface SectionLinkGroupComponentProps {
  links: SectionLinkGroupProps[];
  defaultActiveIndex?: number; // デフォルトのアクティブインデックスを追加
}

const SectionLinkGroup = ({
  links,
  defaultActiveIndex = 0,
}: SectionLinkGroupComponentProps) => {
  const [active, setActive] = useState<number>(defaultActiveIndex);

  return (
    <div className="border border-ninjack-line-gray rounded-[30px] flex min-w-[400px] md:overflow-hidden md:w-fit self-center mx-auto overflow-x-scroll">
      {links.map((item, index) => (
        <Link
          href={item.link}
          key={item.link} // indexの代わりにlinkを使用
          onClick={() => setActive(index)}
        >
          <div
            className={clsx(
              "md:py-4 py-3 md:px-5 px-4",
              "leading-none transition-colors", // トランジション効果を追加
              {
                "border border-ninjack-line-gray rounded-[30px] bg-ninjack-bg-gray text-ninjack-white":
                  active === index,
                "text-ninjack-text-gray md:text-[16px] text-[12px]":
                  active !== index,
              }
            )}
          >
            {item.text}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SectionLinkGroup;
