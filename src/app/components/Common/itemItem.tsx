import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

export interface ItemItemProps {
  image: StaticImport | string;
  category: string;
  title: string;
  price?: string;
  href: string;
}

const ItemItem = ({ href, image, title, price, category }: ItemItemProps) => {
  if (!href) {
    return null; // hrefがない場合はレンダリングしない
  }

  return (
    <Link href={href} className="flex flex-col space-y-5 group">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          className="rounded-lg w-full group-hover:scale-105 aspect-square object-cover transition-all duration-300"
          width={500}
          height={500}
        />
      </div>
      {category !== "" && (
        <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none w-[80px]">
          {category}
        </div>
      )}
      <p className="font-bold text-ninjack-white text-left group-hover:text-ninjack-purple">
        {title}
      </p>
      <p className="text-ninjack-text-gray text-sm text-left">{price}</p>
    </Link>
  );
};

export default ItemItem;
