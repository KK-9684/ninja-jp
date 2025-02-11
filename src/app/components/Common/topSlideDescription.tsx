interface TopSlideDescriptionProps {
  title: string;
  content: string;
}

const TopSlideDescription = ({ title, content }: TopSlideDescriptionProps) => {
  return (
    <div className="flex flex-col justify-end space-y-5 absolute bottom-0 left-0 p-5 w-[400px] box-inherit bg-gradient-to-t from-[rgba(97,33,146,0.9)] to-[rgba(97,33,146,0.0)] rounded-[0_0_10px_10px] h-[200px]">
      <div className="bg-ninjack-white rounded-md px-2.5 py-0.5 w-[80px]">
        <span className="text-ninjack-purple text-[12px] font-bold leading-none">
          {title}
        </span>
      </div>
      <p className="text-ninjack-white text-2xl font-bold">{content}</p>
    </div>
  );
};

export default TopSlideDescription;
