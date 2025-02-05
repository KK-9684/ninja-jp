import Image from "next/image";

interface ContentCountItemProps {
  icon: string;
  label: string;
  counts: number;
}

const ContentCountItem = ({ icon, label, counts }: ContentCountItemProps) => {
  return (
    <div>
      <div className="md:flex hidden space-x-1.5 items-center">
        <Image
          src={icon}
          alt={label}
          width={72}
          height={72}
          className="w-[72px] h-[72px]"
        />
        <div className="flex flex-col justify-center">
          <p className="text-ninjack-text-gray">{label}</p>
          <p className="text-ninjack-white text-[44px] leading-none font-semibold">
            {counts}+
          </p>
        </div>
      </div>
      <div className="flex md:hidden space-x-1 items-center">
        <Image src={icon} alt={label} width={48} height={48} />
        <div className="flex flex-col justify-center">
          <p className="text-ninjack-text-gray">{label}</p>
          <p className="text-ninjack-white text-[26px] leading-none font-semibold">
            {counts}+
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentCountItem;
