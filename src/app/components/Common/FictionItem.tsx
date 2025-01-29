import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface FictionItemProps {
  image: StaticImport;
  category: string;
  title: string;
  price: string;
}

const FictionItem = ({ image, category, title, price }: FictionItemProps) => {
  return (
    <div className="flex flex-col space-y-5">
      <Image src={image} alt="ダミーテキスト" className="rounded-lg" />
      <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple w-fit text-xs leading-none text-left">{category}</div>
      <p className="font-bold text-ninjack-white text-left">{title}</p>
      {
        price !== "" && (
          <p className="text-ninjack-text-gray text-sm leading-none">料金：￥{price}〜</p>
        )
      }
    </div>
  );
};

export default FictionItem;
