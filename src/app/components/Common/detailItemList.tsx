import Image from "next/image";

import IconNext from "@/assets/icon-next.svg";
import { Plan } from "@/app/(pages)/activity/fetcher";
import Link from "next/link";

type DetailItemListProps = { plan: Plan };

const DetailItemList = ({ plan }: DetailItemListProps) => {
  return (
    <div className="bg-[#171717] border-[#2e2e2e] border-[1px] p-[20px] md:flex flex-row justify-between rounded-[10px] w-full mb-5">
      <div className="flex flex-row md:gap-4 gap-3">
        <div className="flex flex-col md:gap-[12px] gap-2 self-center">
          <div className="text-[#ffffff] text-[16px] text-left">
            {plan.name}
          </div>
          <div className="text-[#7a7a7a] text-[12px] text-left max-w-[420px]">
            {plan.description}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:gap-[12px] gap-2 self-center">
        <div className="text-[#ffffff] text-[28px]">{plan.price}</div>
        {plan.url && (
          <Link href={plan.url} className="group">
            <button className="border-[1px] border-[#2e2e2e] text-[#ffffff] p-3 flex flex-row rounded-[6px] gap-4 text-[14px] group-hover:text-ninjack-purple group-hover:border-ninjack-purple transition-all duration-300">
              予約サイトへ
              <Image src={IconNext} alt="" className="self-center" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DetailItemList;
