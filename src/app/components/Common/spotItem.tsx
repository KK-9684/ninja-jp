import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

interface SpotItemProps {
  image: StaticImport | string;
  categroy?: string;
  areaName?: string;
  title?: string;
  price?: string;
  href?: string;
}

const SpotItem = ({
  href,
  image,
  categroy,
  areaName,
  title,
  price,
}: SpotItemProps) => {
  if (!href) {
    return null; // hrefがない場合はレンダリングしない
  }
  return (
    <Link className="flex flex-col space-y-6 group" href={href}>
      <div className="overflow-hidden rounded-lg ">
        <Image
          src={image}
          alt="ダミーテキスト"
          className="object-cover w-[100%] h-[100%] aspect-square group-hover:scale-105 transition-all duration-300"
          width={264}
          height={264}
        />
      </div>
      <div className="flex flex-col justify-between py-1">
        <div className="mb-[27px] flex justify-between items-center">
          <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none">
            {categroy}
          </div>
          <div className="flex items-center text-ninjack-text-gray">
            <span className="text-2xl leading-none">・</span>
            <span className="text-sm leading-none">{areaName}</span>
          </div>
        </div>
        <div>
          <p className="font-bold text-ninjack-white mb-3 group-hover:text-ninjack-purple">
            {title}
          </p>
          {price && (
            <div className="text-ninjack-text-gray text-sm">料金：{price}</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SpotItem;
