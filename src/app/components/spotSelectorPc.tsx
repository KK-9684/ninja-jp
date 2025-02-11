import Link from "next/link";
import { spotCategoryHasItems } from "../(pages)/spot/fetcher";

const SpotSelectorPC = async () => {
  const categories = await spotCategoryHasItems();
  return (
    <div className="text-ninjack-text-gray md:flex hidden flex-col text-center text-sm">
      <Link
        href={"/spot"}
        className="text-ninjack-white border-b border-t border-ninjack-line-gray p-4"
      >
        すべて
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/spot?categories=${category.slug}`}
          className="border-b border-ninjack-line-gray p-4 hover:text-ninjack-purple"
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
};

export default SpotSelectorPC;
