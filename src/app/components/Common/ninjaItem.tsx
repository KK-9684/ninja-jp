import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

interface NinjaItemProps {
  image: StaticImport | string;
  category: string;
  title: string;
  summary: string;
  position: string;
  href: string;
}

const NinjaItem = ({
  href,
  position,
  image,
  title,
  summary,
}: NinjaItemProps) => {
  if (!href) {
    return null; // hrefがない場合はレンダリングしない
  }

  return (
    <Link href={href} className="flex flex-col space-y-5 group">
      <div className="overflow-hidden rounded-lg w-[100%] h-[auto] aspect-[280/380] md:w-[280px] md:h-[380px]">
        <Image
          src={image}
          alt="ダミーテキスト"
          className="rounded-lg w-[280px] h-[380px] object-cover group-hover:scale-105 transition-all duration-300"
          width={280}
          height={380}
        />
      </div>
      <div>
        <p className="font-bold text-ninjack-white text-left group-hover:text-ninjack-purple">
          {title}
        </p>
        <p className="mt-2 text-ninjack-white text-sm text-left">{position}</p>
      </div>
      <p className="text-ninjack-text-gray text-xs line-clamp-2 leading-[1.5]">
        {summary}
      </p>
    </Link>
  );
};

export default NinjaItem;
