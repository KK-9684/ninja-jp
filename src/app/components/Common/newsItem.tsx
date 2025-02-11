import Link from "next/link";

interface NewsItemProps {
  date: string;
  type?: string;
  title: string;
  href: string;
}

const NewsItem = ({ href, date, type, title }: NewsItemProps) => {
  const getColor = (type: string) => {
    switch (type) {
      case "ニュース":
        return "#63B8A7";
      case "レビュー":
        return "#3172B3";
      case "インタビュー":
        return "#A92A2C";
      default:
        break;
    }
  };

  if (!href) {
    return null; // hrefがない場合はレンダリングしない
  }

  return (
    <Link href={href} className="w-[100%] block group">
      <div className="md:flex hidden items-center py-4 space-x-8 text-md leading-none text-ninjack-white border-b border-ninjack-line-gray">
        <p className="font-light">{date}</p>
        <p className="flex items-center">
          {type && (
            <>
              <span
                className="text-2xl leading-none group-hover:text-ninjack-purple"
                style={{ color: getColor(type) }}
              >
                ・
              </span>
              <span className="text-ninjack-text-gray group-hover:text-ninjack-purple">
                {type}
              </span>
            </>
          )}
        </p>
        <p>{title}</p>
      </div>

      <div className="flex flex-col gap-2 md:hidden items-start py-4  text-md leading-none text-ninjack-white border-b border-ninjack-line-gray">
        <div className="flex flex-row gap-2 items-center self-start">
          <p className="text-[12px]">{date}</p>
          <p className="flex items-center">
            {type && (
              <>
                <span
                  className="text-2xl leading-none group-hover:text-ninjack-purple"
                  style={{ color: getColor(type) }}
                >
                  ・
                </span>
                <span className="text-ninjack-text-gray text-[12px]">
                  {type}
                </span>
              </>
            )}
          </p>
        </div>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default NewsItem;
