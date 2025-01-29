import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface NinjaItemProps {
  image: StaticImport;
  category: string;
  title: string;
  subTitle: string;
  content: string;
}

const NinjaItem = ({ image, category, title, subTitle, content }: NinjaItemProps) => {
  return (
    <div className="flex flex-col space-y-5">
      <Image src={image} alt="ダミーテキスト" className="rounded-lg w-full" />
      <div>
        {
          category !== "" && (
            <div className="rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple text-xs leading-none w-[80px] mt-2">{category}</div>
          )
        }
        <p className="font-bold text-ninjack-white text-left mt-6">{title}</p>
        <p className="text-ninjack-white text-sm text-left">{subTitle}</p>
      </div>
      <p className="text-ninjack-text-gray text-xs line-clamp-2">{content}</p>
    </div>
  );
};

export default NinjaItem;
