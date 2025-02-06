import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

export interface ActivitySubListProps {
  href: string;
  image: StaticImport;
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
    <Link href={href} className="flex space-x-5 items-center mb-3">
      <Image
        src={image}
        alt="ダミーテキスト"
        width={100}
        height={80}
        className="rounded-[6px] w-[100px] h-[100px] object-cover"
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none">
            {category}
          </div>
        </div>
        <div>
          <p className="text-[12px] font-bold text-ninjack-white ">{title}</p>
          <div className="text-ninjack-text-gray text-sm">
            <span className="me-5">￥{price}〜</span>
            <span>/ {time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivitySubList;
