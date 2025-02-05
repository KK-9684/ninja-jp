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
    <Link href={href} className="flex flex-col space-y-5">
      <Image
        src={image}
        alt="ダミーテキスト"
        className="rounded-lg w-[280px] h-[380px] object-cover"
        width={280}
        height={380}
      />
      <div>
        <p className="font-bold text-ninjack-white text-left ">{title}</p>
        <p className="text-ninjack-white text-sm text-left">{position}</p>
      </div>
      <p className="text-ninjack-text-gray text-xs line-clamp-2 leading-[1.5]">
        {summary}
      </p>
    </Link>
  );
};

export default NinjaItem;
