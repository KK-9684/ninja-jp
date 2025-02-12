import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

interface MenuItemProps {
  icon: string;
  label: string;
  link: string;
  color: string;
  isSmall?: boolean;
  isFlex?: boolean;
}

const MenuItem = ({
  icon,
  isFlex,
  label,
  link,
  color,
  isSmall,
}: MenuItemProps) => {
  return (
    <Link
      href={link}
      className={clsx(
        "flex md:flex-row items-center gap-2 group",
        isFlex ? "flex-row" : "flex-col"
      )}
    >
      <Image
        src={icon}
        alt={label}
        width={isSmall ? 24 : 28}
        height={isSmall ? 24 : 28}
      />
      <span
        className={`text-${color} md:text-[16px] text-[12px] ms-1 group-hover:text-ninjack-purple ${clsx(
          isSmall && "font-bold",
          isFlex && "text-[16px]"
        )}`}
      >
        {label}
      </span>
    </Link>
  );
};

export default MenuItem;
