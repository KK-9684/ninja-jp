import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

interface ResearchItemProps {
  image: StaticImport | string;
  category?: string;
  title: string;
  content: Document;
  summary: string;
  href: string;
}

const ResearchItem = ({
  image,
  category = "",
  title,
  summary,
  href,
}: ResearchItemProps) => {
  if (!href) {
    return null; // hrefがない場合はレンダリングしない
  }

  return (
    <Link
      href={href}
      className="flex gap-6 py-6 border-t-[1px] border-ninjack-line-gray group"
    >
      <div className="overflow-hidden rounded-lg md:w-[144px] md:h-[144px] md:min-w-[144px] md:min-h-[144px] w-[100px] h-[100px] min-w-[100px] min-h-[100px] self-center">
        <Image
          src={image}
          alt="ダミーテキスト"
          className="rounded-lg md:w-[144px] md:h-[144px] w-[100px] h-[100px] self-center object-cover group-hover:scale-105 transition-all duration-300"
          width={160}
          height={160}
        />
      </div>
      <div className="flex flex-col py-1 gap-4">
        {category && (
          <div className="text-xs leading-none rounded-tl-[10px] py-2 px-2.5 text-ninjack-white bg-ninjack-purple w-fit">
            {category}
          </div>
        )}
        <div>
          <p className="font-bold text-ninjack-white leading-none mb-3 text-left group-hover:text-ninjack-purple">
            {title}
          </p>
          <p className="text-ninjack-text-gray text-xs line-clamp-2 text-left">
            {summary}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ResearchItem;
