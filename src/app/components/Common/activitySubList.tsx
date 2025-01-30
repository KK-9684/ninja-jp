import Image from "next/image";

const ActivitySubList = ({ image, category, title, price, time  }: any) => {
  return (
    <div className="flex space-x-5" >
      <Image src={image} alt="ダミーテキスト" width={100} height={80} className="rounded-[6px] object-contain max-w-[100px]" />
      <div className="flex flex-col justify-between gap-2">
        <div className="flex justify-between items-center">
          <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none">{category}</div>
        </div>
        <div>
          <p className="text-[20px] font-bold text-ninjack-white ">{title}</p>
          <div className="text-ninjack-text-gray text-sm">
            <span className="me-5">￥{price}〜</span>
            <span>/ {time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySubList;
