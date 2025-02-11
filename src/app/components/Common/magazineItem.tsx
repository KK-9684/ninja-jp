import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

interface MagazineItemProps {
  image: StaticImport | string;
  isNew: boolean;
  category: string;
  date: string;
  title: string;
  content: string;
  href: string;
  imageWidth: number;
  imageHeight: number;
}

const MagazineItem = ({
  href,
  image,
  isNew,
  category,
  date,
  title,
  content,
}: MagazineItemProps) => {
  return (
    <Link href={href} className="flex gap-4">
      <Image
        src={image}
        alt="ダミーテキスト"
        width={144}
        height={144}
        className="rounded-lg"
      />
      <div className="py-3 w-[100%]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center text-[10px]">
            {isNew && (
              <div className="leading-none bg-ninjack-white px-[7px] py-[5px]">
                NEW
              </div>
            )}
            <div className="flex items-center">
              <span className="text-xl" style={{ color: "#63B8A7" }}>
                ・
              </span>
              <span className="text-ninjack-text-gray w-[50px] whitespace-nowrap">
                {category}
              </span>
            </div>
          </div>
          <div className="text-[10px] text-ninjack-text-gray">{date}</div>
        </div>
        <p className="text-ninjack-white text-sm font-bold mb-2">{title}</p>
        <p className="text-ninjack-text-gray text-xs line-clamp-2">{content}</p>
      </div>
    </Link>
  );
};

export default MagazineItem;
