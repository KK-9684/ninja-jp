import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export interface ItemItemProps {
  image: StaticImport;
  category : string;
  title: string;
  price: string;
}

const ItemItem = ({ image, title, price, category }: ItemItemProps) => {
  return (
    <div className="flex flex-col space-y-5">
      <Image src={image} alt="ダミーテキスト" className="rounded-lg w-full" />
      {
        category !== "" && (
          <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none w-[80px]">{category}</div>
        )
      }
      <p className="font-bold text-ninjack-white text-left">{title}</p>
      <p className="text-ninjack-text-gray text-sm text-left">￥{price}</p>
    </div>
  );
};

export default ItemItem;
