import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface ResearchItemProps {
  image: StaticImport;
  categroy: string;
  title: string;
  content: string;
}

const ResearchItem = ({ image, categroy, title, content }: ResearchItemProps) => {
  return (
    <div className="flex gap-6 py-6 border-t-[1px] border-ninjack-line-gray">
      <Image src={image} alt="ダミーテキスト"  className="rounded-lg md:w-[144px] md:h-[144px] w-[100px] h-[100px] self-center" />
      <div className="flex flex-col justify-between py-1 gap-4">
        <div className="text-xs leading-none rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple w-fit">{categroy}</div>
        <div>
          <p className="font-bold text-ninjack-white leading-none mb-3 text-left">{title}</p>
          <p className="text-ninjack-text-gray text-xs line-clamp-2 text-left">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ResearchItem;
