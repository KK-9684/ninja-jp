import Image from "next/image";

interface SectionTitlePartProps {
  icon: string;
  title: string;
  subTitle: string;
}

const SectionTitlePart = ({ icon, title, subTitle }: SectionTitlePartProps) => {
  return (
    <div className="flex space-x-1.5">
      <Image
        src={icon}
        alt={title}
        width={52}
        height={52}
        className="md:w-[52px] md:h-[52px] w-[40px] h-[40px]"
      />
      <div className="flex flex-col justify-center">
        <p className="text-ninjack-text-gray  text-[12px] md:text-[16px]">
          {title}
        </p>
        <p className="text-ninjack-white  text-[20px] md:text-[22px] font-bold">
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export default SectionTitlePart;
