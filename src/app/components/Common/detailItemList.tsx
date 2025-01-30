import Image from "next/image";

import IconNext from '@/assets/icon-next.svg';
const DetailItemList = ({ image, title, content, price }: any) => {
    return (
        <div>
            <div className="bg-[#171717] border-[#2e2e2e] border-[1px] p-[20px] md:flex hidden flex-row justify-between rounded-[10px] w-full">
                <div className="flex flex-row gap-6">
                    <Image src={image} alt="" className="w-[120px] h-[120px] rounded-[6px]" />
                    <div className="flex flex-col gap-[20px] self-center">
                        <div className="text-[#ffffff] text-[16px] text-left">{title}</div>
                        <div className="text-[#7a7a7a] text-[12px] text-left max-w-[420px]">{content}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-[20px] self-center">
                    <div className="text-[#ffffff] text-[28px]">￥{price.toLocaleString()}</div>
                    <button className="border-[1px] border-[#2e2e2e] text-[#ffffff] p-3 flex flex-row rounded-[6px] gap-4 text-[14px]">
                        予約サイトへ
                        <Image src={IconNext} alt="" className="self-center" />
                    </button>
                </div>
            </div>

            <div className="md:hidden bg-[#171717] border-[#2e2e2e] border-[1px] p-[20px] flex flex-row justify-between rounded-[10px] w-full">
            <div className="flex flex-row gap-6">
                <div className="flex flex-col gap-4">
                    <Image src={image} alt="" className="w-[120px] h-[120px] rounded-[6px] object-contain" />
                    <div className="text-[#ffffff] text-[28px]">￥{price.toLocaleString()}</div>
                </div>
                    <div className="flex flex-col gap-[20px] self-center">
                        <div className="text-[#ffffff] text-[16px] text-left">{title}</div>
                        <div className="text-[#7a7a7a] text-[12px] text-left max-w-[420px]">{content}</div>
                        <button className="border-[1px] border-[#2e2e2e] text-[#ffffff] p-3 flex flex-row rounded-[6px] gap-4 text-[14px] mx-auto">
                        予約サイトへ
                        <Image src={IconNext} alt="" className="self-center" />
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailItemList;