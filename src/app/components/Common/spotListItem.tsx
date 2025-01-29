import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface SpotListItemProps {
  image: StaticImport;
  categroy: string;
  areaName: string;
  title: string;
}

const SpotListItem = ({ image, categroy, areaName, title }: SpotListItemProps) => {
  return (
    <div className="flex flex-col space-y-6">
      <Image src={image} alt="ダミーテキスト" className="rounded-lg" />
      <div className="flex flex-col justify-between py-1">
        <div className="mb-[27px] flex justify-between items-center">
          <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none">{categroy}</div>
          <div className="flex items-center text-ninjack-text-gray">
            <span className="text-2xl leading-none">・</span>
            <span className="text-sm leading-none">{areaName}</span>
          </div>
        </div>
        <div>
          <p className="font-bold text-ninjack-white mb-3">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default SpotListItem;
