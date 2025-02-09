"use client";

import Link from "next/link";
import Image from "next/image";
import iconRightArrow from "@/assets/icon-right-arrow.svg";

interface CustomButtonProps {
  isArrow?: boolean;
  text: string;
  font?: string;
  color?: string;
  link?: string;
  handleClick?: () => void;
  isLarge?: boolean;
}

const CustomButton = ({
  isArrow = false,
  text,
  font = "NotoSansJp",
  color = "ninjack-white",
  link,
  handleClick,
}: CustomButtonProps) => {
  const content = (
    <div className="py-3 px-4 flex items-center border border-ninjack-line-gray rounded bg-ninjack-bg-gray group">
      <span
        className={`font-${font} text-${color} text-base leading-4 group-hover:text-ninjack-purple`}
      >
        {text}
      </span>
      {isArrow && (
        <Image src={iconRightArrow} alt="icon-right-arrow" className="ms-1.5" />
      )}
    </div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return <div onClick={handleClick}>{content}</div>;
};

export default CustomButton;
