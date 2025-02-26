"use client";

import Link from "next/link";
import Image from "next/image";
import iconRightArrow from "@/assets/icon-right-arrow.svg";

interface CustomLargeButtonProps {
  icon?: string;
  isArrow?: boolean;
  text: string;
  font?: string;
  type: number;
  link?: string;
  handleClick?: () => void;
  isLarge?: boolean;
}

const CustomLargeButton = ({
  icon,
  isArrow = false,
  text,
  font = "NotoSansJp",
  type,
  link,
  handleClick,
}: CustomLargeButtonProps) => {
  const content = (
    <div
      className={`py-3 flex items-center justify-center border border-ninjack-line-gray rounded-md hover:brightness-75 ${
        type === 1 ? "bg-ninjack-bg-gray" : "bg-ninjack-white"
      } w-[320px]`}
    >
      {icon && <Image src={icon} alt="icon-right-arrow" className="me-4" />}
      <span
        className={`font-${font} ${
          type === 1 ? "text-ninjack-white" : "text-ninjack-black"
        } text-base`}
      >
        {text}
      </span>
      {isArrow && (
        <Image src={iconRightArrow} alt="icon-right-arrow" className="ms-4" />
      )}
    </div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return <div onClick={handleClick}>{content}</div>;
};

export default CustomLargeButton;
