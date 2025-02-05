import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

interface ActivityItemProps {
  image: StaticImport | string;
  category: string;
  areaName: string;
  title: string;
  price: string;
  time: string;
  href: string;
}

const ActivityItem = ({
  image,
  category,
  areaName,
  title,
  price,
  time,
  href,
}: ActivityItemProps) => {
  if (!href) {
    return null; // hrefがない場合はレンダリングしない
  }

  return (
    <Link
      href={href}
      className="flex space-x-10 md:py-6 pt-6 border-t-[1px] border-ninjack-line-gray"
    >
      <Image
        src={image}
        alt={title}
        className="md:rounded-lg rounded-md md:w-[144px] md:h-[144px] w-[100px] h-[100px] self-center object-cover"
        width={324}
        height={160}
      />
      <div className="flex flex-col py-1">
        <div className="md:mb-[27px] mb-3 flex justify-between items-center">
          <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none">
            {category}
          </div>
          <div className="flex items-center text-ninjack-text-gray">
            <span className="text-2xl leading-none">・</span>
            <span className="text-sm leading-none">{areaName}</span>
          </div>
        </div>
        <div>
          <p className="font-bold text-ninjack-white mb-3">{title}</p>
          <div className="text-ninjack-text-gray text-sm">
            <span className="me-5">料金：{price}</span>
            <span>所要時間：{time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityItem;
