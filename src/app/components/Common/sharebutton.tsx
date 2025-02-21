import ImageLine from "@/assets/icon-line.svg";
import ImageX from "@/assets/icon-x.svg";
import ImageFacebook from "@/assets/icon-facebook.svg";
import Image from "next/image";
import Link from "next/link";

type Props = {
  shareUrl: string;
  title: string;
};

export default function ShareButton({ shareUrl, title }: Props) {
  const facebookUrl = `https://www.facebook.com/share.php?u=${shareUrl}`;
  const xUrl = `https://twitter.com/share?url=${shareUrl}&text=${title}`;
  const lineUrl = `https://line.me/R/msg/text/?${shareUrl}`;

  return (
    <div className="flex flex-row md:gap-3 gap-2 mt-[80px] lg:px-[100px] ">
      <Link
        href={lineUrl}
        target="_blank"
        className="flex flex-row gap-2 text-[#ffffff] bg-[#06C755] rounded-[4px] py-[13px] w-full justify-center text-[12px]"
      >
        <Image
          src={ImageLine}
          alt=""
          width={21}
          height={20}
          className="self-center"
        />
        LINEで送る
      </Link>
      <Link
        href={xUrl}
        target="_blank"
        className="flex flex-row gap-2 text-[#ffffff] border-[1px] border-[#ffffff] rounded-[4px] py-[13px] w-full justify-center text-[12px]"
      >
        <Image
          src={ImageX}
          alt=""
          width={16}
          height={16}
          className="self-center"
        />
        ポスト
      </Link>
      <Link
        href={facebookUrl}
        target="_blank"
        className="flex flex-row gap-2 text-[#ffffff] bg-[#1977F2] rounded-[4px] py-[13px] w-full justify-center text-[12px]"
      >
        <Image
          src={ImageFacebook}
          alt=""
          width={20}
          height={20}
          className="self-center"
        />
        シェア
      </Link>
    </div>
  );
}
