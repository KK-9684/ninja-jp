import ImageLine from "@/assets/icon-line.svg";
import ImageX from "@/assets/icon-x.svg";
import ImageFacebook from "@/assets/icon-facebook.svg";
import Image from "next/image";

export default function ShareButton() {
  return (
    <div className="flex flex-row md:gap-3 gap-2 mt-[80px] md:px-[128px] ">
      <button className="flex flex-row gap-2 text-[#ffffff] bg-[#06C755] rounded-[4px] py-[13px] w-full justify-center text-[12px]">
        <Image
          src={ImageLine}
          alt=""
          width={21}
          height={20}
          className="self-center"
        />{" "}
        LINEで送る{" "}
      </button>
      <button className="flex flex-row gap-2 text-[#ffffff] border-[1px] border-[#ffffff] rounded-[4px] py-[13px] w-full justify-center text-[12px]">
        <Image
          src={ImageX}
          alt=""
          width={16}
          height={16}
          className="self-center"
        />{" "}
        ポスト{" "}
      </button>
      <button className="flex flex-row gap-2 text-[#ffffff] bg-[#1977F2] rounded-[4px] py-[13px] w-full justify-center text-[12px]">
        <Image
          src={ImageFacebook}
          alt=""
          width={20}
          height={20}
          className="self-center"
        />{" "}
        シェア{" "}
      </button>
    </div>
  );
}
