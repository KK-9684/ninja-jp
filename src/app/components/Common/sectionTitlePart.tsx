import Image from "next/image";

interface SectionTitlePartProps {
  icon: string;
  title: string;
  subTitle: string;
}

const SectionTitlePart = ({ icon, title, subTitle }: SectionTitlePartProps) => {
  return (
    <div className="flex space-x-1.5">
      <Image src={icon} alt={title} width={52} height={52} />
      <div className="flex flex-col justify-center">
        <p className="text-ninjack-text-gray">{title}</p>
        <p className="text-ninjack-white text-[22px] font-bold">{subTitle}</p>
      </div>
    </div>
  );
};

export default SectionTitlePart;
