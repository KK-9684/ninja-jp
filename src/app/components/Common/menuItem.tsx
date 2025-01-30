import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

interface MenuItemProps {
  icon: string;
  label: string;
  link: string;
  color: string;
  isSmall?: boolean;
}

const MenuItem = ({ icon, label, link, color, isSmall }: MenuItemProps) => {
  return (
    <Link href={link} className="flex md:flex-row flex-col items-center gap-2">
      <Image src={icon} alt={label} width={isSmall ? 24 : 28} height={isSmall ? 24 : 28} />
      <span className={`text-${color} md:text-[16px] text-[12px] ms-1 ${clsx(isSmall && "font-bold")}`}>{label}</span>
    </Link>
  );
};

export default MenuItem;
