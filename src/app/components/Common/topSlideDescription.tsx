interface TopSlideDescriptionProps {
  title: string;
  content: string;
}

const TopSlideDescription = ({ title, content }: TopSlideDescriptionProps) => {
  return (
    <div className="flex flex-col space-y-5 absolute bottom-0 left-0 p-8">
      <div className="bg-ninjack-white rounded-md px-2.5 py-0.5 w-[80px]">
        <span className="text-ninjack-purple text-xs font-bold leading-none">{title}</span>
      </div>
      <p className="text-ninjack-white text-2xl font-bold">{content}</p>
    </div>
  );
};

export default TopSlideDescription;
