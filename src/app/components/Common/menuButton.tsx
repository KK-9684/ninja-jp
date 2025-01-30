"use client";

import Link from "next/link";
import Image from "next/image";

interface MenuButtonProps {
  icon: string;
  label: string;
  link?: string;
  handleClick?: () => void;
}

const MainButton = ({ icon, label, link, handleClick }: MenuButtonProps) => {
  const content = (
    <>
      <Image src={icon} alt={label} width={28} height={28} />
      <div className="ninjack-text-gray ms-1 text-xs mt-2">{label}</div>
    </>
  );

  if (link) {
    return (
      <Link href={link} className="flex flex-col items-center">
        {content}
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center" onClick={handleClick}>
      {content}
    </div>
  );
};

export default MainButton;
