import Image from "next/image";

import IconNext from "@/assets/icon-next.svg";
import Link from "next/link";
import { LinkGroup } from "@/app/(pages)/item/fetcher";

type ItemLinkGroupProps = { linkGroup: LinkGroup };

const ItemLinkGroup = ({ linkGroup }: ItemLinkGroupProps) => {
  return (
    <div className="flex flex-col gap-[20px] self-center">
      {linkGroup.url && (
        <Link href={linkGroup.url} className="group">
          <button className="bg-ninjack-bg-gray border-[1px] border-[#2e2e2e] text-[#ffffff] p-3 flex flex-row rounded-[6px] gap-4 text-[14px] group-hover:text-ninjack-purple group-hover:bg-ninjack-black">
            {linkGroup.title}
            <Image src={IconNext} alt="" className="self-center" />
          </button>
        </Link>
      )}
    </div>
  );
};

export default ItemLinkGroup;
