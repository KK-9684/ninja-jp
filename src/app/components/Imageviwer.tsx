"use client";
import Image from "next/image";
import ImageSpot from "@/assets/image-spot.jpg";
import IconLeft from "@/assets/icon-arrow-left.svg";
import IconRight from "@/assets/icon-arrow-right.svg";
const ImageViewer = () => {
    return (
        <div className="flex flex-col gap-7">
            <div className="w-full relative">
                <Image src={ImageSpot} alt="" className="w-full md:h-[640px] h-[320px] rounded-[35px]"/>
                <div className="absolute bottom-0 right-0 bg-ninjack-black w-[144px] h-[68px] rounded-tl-[20px] flex flex-row gap-5 justify-center">
                    <button className=""><Image src={IconLeft} alt="" /></button>
                    <button className=""><Image src={IconRight} alt="" /></button>
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <Image src={ImageSpot} alt="" className="w-[60px] h-[60px] rounded-[8px]" />
                <Image src={ImageSpot} alt="" className="w-[60px] h-[60px] rounded-[8px]" />
                <Image src={ImageSpot} alt="" className="w-[60px] h-[60px] rounded-[8px]" />
                <Image src={ImageSpot} alt="" className="w-[60px] h-[60px] rounded-[8px]" />
                <span className="text-[28px] text-ninjack-white self-center">+ 3</span>
            </div>
        </div>
    );
}

export default ImageViewer;