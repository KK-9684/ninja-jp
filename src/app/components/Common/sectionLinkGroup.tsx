import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export interface SectionLinkGroupProps {
  text: string;
  link: string;
}

interface SectionLinkGroupComponentProps {
  links: SectionLinkGroupProps[];
}

const SectionLinkGroup = ({ links }: SectionLinkGroupComponentProps) => {
  const [active, setActive] = useState<number>(0);

  const handleClick = (index: number) => {
    setActive(index);
  };

  return (
    <div className="border border-ninjack-line-gray rounded-[30px] flex min-w-[400px] md:overflow-hidden md:w-fit self-center mx-auto overflow-x-scroll">
      {links.map((item, index) => (
        <Link href={item.link} key={index} onClick={() => handleClick(index)}>
          <div
            className={clsx(
              "md:py-4 py-3 md:px-5 px-4 textsm leading-none",
              active === index
                ? "border border-ninjack-line-gray rounded-[30px] bg-ninjack-bg-gray text-ninjack-white"
                : "text-ninjack-text-gray md:text-[16px] text-[12px]"
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
