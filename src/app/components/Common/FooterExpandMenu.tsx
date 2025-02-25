import Link from "next/link";
import Image from "next/image";
import MenuItem from "./menuItem";
import iconSpot from "@/assets/icon-spot.svg";
import iconItem from "@/assets/icon-item.svg";
import iconResearch from "@/assets/icon-research.svg";
import iconFiction from "@/assets/icon-fiction.svg";
import iconNinja from "@/assets/icon-ninja.svg";
import iconPlus from "@/assets/icon-plus.svg";
import { AllActiveCategories } from "@/lib/contentful/sharedModel";

type FooterExpandMenuProps = {
  categories: AllActiveCategories;
};

const FooterExpandMenu = ({ categories }: FooterExpandMenuProps) => {
  // console.log(categories);
  return (
    <div className="flex flex-col md:grid md:grid-cols-6 md:gap-8 md:my-12 my-2 mx-4 mb-6">
      {/* 施設・史跡のセクション */}
      <div className="flex flex-col">
        <details className="md:hidden flex flex-col pt-4 group">
          <summary className="flex items-center justify-between border-b border-ninjack-line-gray pb-4">
            <MenuItem
              icon={iconSpot}
              label="施設・史跡"
              link="/spot"
              color="ninjack-white"
              isSmall
              isFlex
            />
            <Image
              src={iconPlus}
              alt="開く"
              className="group-open:rotate-45 transition-transform duration-300 w-[24px] h-[24px]"
            />
          </summary>
          <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
            <Link href="/spot" className="hover:text-ninjack-purple">
              ー すべて見る
            </Link>
            {categories.spotCategory.map((category) => (
              <Link
                href={`/spot?categories=${category.slug}`}
                key={category.slug}
                className="hover:text-ninjack-purple"
              >
                {`ー ${category.title}`}
              </Link>
            ))}
          </div>
        </details>
        <div className="hidden md:flex md:flex-col gap-6">
          <MenuItem
            icon={iconSpot}
            label="施設・史跡"
            link="/spot"
            color="ninjack-white"
            isSmall
            isFlex
          />
          <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
            <Link href="/spot" className="hover:text-ninjack-purple">
              ー すべて見る
            </Link>
            {categories.spotCategory.map((category) => (
              <Link
                href={`/spot?categories=${category.slug}`}
                key={category.slug}
                className="hover:text-ninjack-purple"
              >
                {`ー ${category.title}`}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 商品・忍具のセクション */}
      <div className="flex flex-col">
        <details className="md:hidden flex flex-col pt-4 group">
          <summary className="flex items-center justify-between border-b border-ninjack-line-gray pb-4">
            <MenuItem
              icon={iconItem}
              label="商品・忍具"
              link="/item"
              color="ninjack-white"
              isSmall
              isFlex
            />
            <Image
              src={iconPlus}
              alt="開く"
              className="group-open:rotate-45 transition-transform duration-300 w-[24px] h-[24px]"
            />
          </summary>
          <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
            <Link href="/item" className="hover:text-ninjack-purple">
              ー すべて見る
            </Link>
            {categories.itemCategory.map((category) => (
              <Link
                href={`/item?categories=${category.slug}`}
                key={category.slug}
                className="hover:text-ninjack-purple"
              >
                {`ー ${category.title}`}
              </Link>
            ))}
          </div>
        </details>
        <div className="hidden md:flex md:flex-col gap-6">
          <MenuItem
            icon={iconItem}
            label="商品・忍具"
            link="/item"
            color="ninjack-white"
            isSmall
            isFlex
          />
          <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
            <Link href="/item" className="hover:text-ninjack-purple">
              ー すべて見る
            </Link>
            {categories.itemCategory.map((category) => (
              <Link
                href={`/item?categories=${category.slug}`}
                key={category.slug}
                className="hover:text-ninjack-purple"
              >
                {`ー ${category.title}`}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 研究情報のセクション */}
      <div className="flex flex-col">
        <details className="md:hidden flex flex-col pt-4 group">
          <summary className="flex items-center justify-between border-b border-ninjack-line-gray pb-4">
            <MenuItem
              icon={iconResearch}
              label="研究情報"
              link="/research"
              color="ninjack-white"
              isSmall
              isFlex
            />
            <Image
              src={iconPlus}
              alt="開く"
              className="group-open:rotate-45 transition-transform duration-300 w-[24px] h-[24px]"
            />
          </summary>
          <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
            <Link href="/research" className="hover:text-ninjack-purple">
              ー すべて見る
            </Link>
            {categories.researchCategory.map((category) => (
              <Link
                href={`/research?categories=${category.slug}`}
                key={category.slug}
                className="hover:text-ninjack-purple"
              >
                {`ー ${category.title}`}
              </Link>
            ))}
          </div>
        </details>
        <div className="hidden md:flex md:flex-col gap-6">
          <MenuItem
            icon={iconResearch}
            label="研究情報"
            link="/research"
            color="ninjack-white"
            isSmall
            isFlex
          />
          <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
            <Link href="/research" className="hover:text-ninjack-purple">
              ー すべて見る
            </Link>
            {categories.researchCategory.map((category) => (
              <Link
                href={`/research?categories=${category.slug}`}
                key={category.slug}
                className="hover:text-ninjack-purple"
              >
                {`ー ${category.title}`}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 創作作品のセクション */}
      <div className="flex flex-col">
        <details className="md:hidden flex flex-col pt-4 group">
          <summary className="flex items-center justify-between border-b border-ninjack-line-gray pb-4">
            <MenuItem
              icon={iconFiction}
              label="創作作品"
              link="/fiction"
              color="ninjack-white"
              isSmall
              isFlex
            />
            <Image
              src={iconPlus}
              alt="開く"
              className="group-open:rotate-45 transition-transform duration-300 w-[24px] h-[24px]"
            />
          </summary>
          <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
            <Link href="/fiction" className="hover:text-ninjack-purple">
              ー すべて見る
            </Link>
            {categories.fictionCategory.map((category) => (
              <Link
                href={`/fiction?categories=${category.slug}`}
                key={category.slug}
                className="hover:text-ninjack-purple"
              >
                {`ー ${category.title}`}
              </Link>
            ))}
          </div>
        </details>
        <div className="hidden md:flex md:flex-col gap-6">
          <MenuItem
            icon={iconFiction}
            label="創作作品"
            link="/fiction"
            color="ninjack-white"
            isSmall
            isFlex
          />
          <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
            <Link href="/fiction" className="hover:text-ninjack-purple">
              ー すべて見る
            </Link>
            {categories.fictionCategory.map((category) => (
              <Link
                href={`/fiction?categories=${category.slug}`}
                key={category.slug}
                className="hover:text-ninjack-purple"
              >
                {`ー ${category.title}`}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 現代忍者のセクション */}
      <div className="flex flex-col">
        <details className="md:hidden flex flex-col pt-4 group">
          <summary className="flex items-center justify-between border-b border-ninjack-line-gray pb-4">
            <MenuItem
              icon={iconNinja}
              label="現代忍者"
              link="/ninja"
              color="ninjack-white"
              isSmall
              isFlex
            />
            <Image
              src={iconPlus}
              alt="開く"
              className="group-open:rotate-45 transition-transform duration-300 w-[24px] h-[24px]"
            />
          </summary>
          <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
            <Link href="/ninja" className="hover:text-ninjack-purple">
              ー すべて見る
            </Link>
            {categories.memberCategory.map((category) => (
              <Link
                href={`/ninja?categories=${category.slug}`}
                key={category.slug}
                className="hover:text-ninjack-purple"
              >
                {`ー ${category.title}`}
              </Link>
            ))}
          </div>
        </details>
        <div className="hidden md:flex md:flex-col gap-6">
          <MenuItem
            icon={iconNinja}
            label="現代忍者"
            link="/ninja"
            color="ninjack-white"
            isSmall
            isFlex
          />
          <div className="flex flex-col items-start gap-4 px-6 text-[14px] md:text-[14px] text-ninjack-text-gray md:py-0 py-6">
            <Link href="/ninja" className="hover:text-ninjack-purple">
              ー すべて見る
            </Link>
            {categories.memberCategory.map((category) => (
              <Link
                href={`/ninja?categories=${category.slug}`}
                key={category.slug}
                className="hover:text-ninjack-purple"
              >
                {`ー ${category.title}`}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterExpandMenu;
