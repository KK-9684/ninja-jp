import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export interface ActivityListItemProps {
  image: StaticImport;
  category: string;
  areaName: string;
  title: string;
  price: string;
  time: string;
  imgWidth: number;
  imgHeight: number;
}

const ActivityListItem = ({ image, category, areaName, title, price, time, imgWidth, imgHeight }: ActivityListItemProps) => {
  return (
    <div>
      <div className="md:flex hidden space-x-10 py-10 border-t-[1px] border-[#2e2e2e]" >
        <Image src={image} alt="ダミーテキスト" width={imgWidth} height={imgHeight} className="rounded-lg rounded-tl-[25%]" />
        <div className="flex flex-col justify-between py-8">
          <div className="mb-[27px] flex justify-between items-center">
            <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none">{category}</div>
            <div className="flex items-center text-ninjack-text-gray">
              <span className="text-2xl leading-none">・</span>
              <span className="text-sm leading-none">{areaName}</span>
            </div>
          </div>
          <div>
            <p className="text-[20px] font-bold text-ninjack-white mb-3">{title}</p>
            <div className="text-ninjack-text-gray text-sm">
              <span className="me-5">料金：￥{price}〜</span>
              <span>所要時間：{time}</span>
            </div>
          </div>  
        </div>
      </div>

      <div className="flex flex-col md:hidden py-4" >
        <Image src={image} alt="ダミーテキスト" className="rounded-md rounded-tl-[25%] w-full object-cover" />
        <div className="flex flex-col justify-between py-8">
          <div className="mb-[27px] flex justify-between items-center">
            <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none">{category}</div>
            <div className="flex items-center text-ninjack-text-gray">
              <span className="text-2xl leading-none">・</span>
              <span className="text-sm leading-none">{areaName}</span>
            </div>
          </div>
          <div className="text-left">
            <p className="text-[20px] font-bold text-ninjack-white mb-3">{title}</p>
            <div className="text-ninjack-text-gray text-sm flex flex-col gap-2 md:block">
              <span className="me-5">料金：￥{price}〜</span>
              <span>所要時間：{time}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ActivityListItem;
