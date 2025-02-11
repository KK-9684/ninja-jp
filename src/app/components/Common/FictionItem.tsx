import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

interface FictionItemProps {
  image: StaticImport | string;
  category?: string;
  title: string;
  price?: string;
  href: string;
}

const FictionItem = ({ href, image, category, title }: FictionItemProps) => {
  if (!href) {
    return null; // hrefがない場合はレンダリングしない
  }

  return (
    <Link href={href} className="flex flex-col space-y-5 group">
      <div className="overflow-hidden rounded-lg w-[216px] h-[216px]">
        <Image
          src={image}
          alt="ダミーテキスト"
          className="rounded-lg w-[216px] h-[216px] group-hover:scale-105 transition-all duration-300"
          width={220}
          height={220}
        />
      </div>
      {category && (
        <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple w-fit text-xs leading-none text-left">
          {category}
        </div>
      )}

      <p className="font-bold text-ninjack-white text-left group-hover:text-ninjack-purple">
        {title}
      </p>
    </Link>
  );
};

export default FictionItem;
