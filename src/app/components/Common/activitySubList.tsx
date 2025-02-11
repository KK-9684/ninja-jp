import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

export interface ActivitySubListProps {
  href: string;
  image: string | StaticImport;
  category: string;
  title: string;
  price: string;
  time: string;
}

const ActivitySubList = ({
  href,
  image,
  category,
  title,
  price,
  time,
}: ActivitySubListProps) => {
  return (
    <Link href={href} className="flex gap-3 items-center mb-4 group">
      <div className="overflow-hidden rounded-[6px] w-[80px] h-[80px] min-w-[80px] min-h-[80px]">
        <Image
          src={image}
          alt="ダミーテキスト"
          width={80}
          height={80}
          className="rounded-[6px] w-[80px] h-[80px] object-cover group-hover:scale-105 transition-all duration-300"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="rounded-tl-[6px] py-1.5 px-2 text-ninjack-white bg-ninjack-purple text-[10px] leading-none">
            {category}
          </div>
        </div>
        <div>
          <p className="text-[12px] font-bold text-ninjack-white group-hover:text-ninjack-purple">
            {title}
          </p>
          <div className="text-ninjack-text-gray text-[10px] flex gap-2">
            <span>{price}</span>
            <span>/</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivitySubList;
