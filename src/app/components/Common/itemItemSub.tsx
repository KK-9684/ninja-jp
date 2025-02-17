import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

export interface ItemItemProps {
  image: StaticImport | string;
  category: string;
  title: string;
  price: string;
  href: string;
}

const ItemItemSub = ({
  href,
  image,
  title,
  price,
  category,
}: ItemItemProps) => {
  if (!href) {
    return null; // hrefがない場合はレンダリングしない
  }

  return (
    <Link href={href} className="flex flex-col gap-2 group">
      <div className="overflow-hidden rounded-lg aspect-square object-cover">
        <Image
          src={image}
          alt={title}
          className="rounded-lg group-hover:scale-105 transition-all duration-300 object-cover w-[100%] h-[100%]"
          width={144}
          height={144}
        />
      </div>
      {category !== "" && (
        <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-[10px] leading-none w-fit">
          {category}
        </div>
      )}
      <p className="font-bold text-ninjack-white text-left text-[12px] group-hover:text-ninjack-purple">
        {title}
      </p>
      <p className="text-ninjack-text-gray text-sm text-left">{price}</p>
    </Link>
  );
};

export default ItemItemSub;
