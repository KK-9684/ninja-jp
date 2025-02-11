"use client";

import Image from "next/image";
import {
  magazineCategoryPerItems,
  MagazineCore,
} from "@/app/(pages)/magazine/fetcher";
import MagazineItem from "../Common/magazineItem";
import clsx from "clsx";
import { useState, useEffect } from "react";
import Link from "next/link";

type Magazine = MagazineCore & {
  categoryTitle: string;
  uniqueId: string;
};

export default function RecommendMagazine() {
  const [result, setResult] = useState<
    {
      items: MagazineCore[];
      slug: string;
      title: string;
      total: number;
    }[]
  >([]);
  const [active, setActive] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [latestItem, setLatestItem] = useState<Magazine>();
  const [displayItems, setDisplayItems] = useState<Magazine[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await magazineCategoryPerItems(5);
        const sortedItems = data
          .flatMap((category) =>
            category.items.map((item) => ({
              ...item,
              categoryTitle: category.title,
              uniqueId: `${category.slug}-${item.slug}`,
            }))
          )
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        setLatestItem(sortedItems[0] || null);
        setDisplayItems(sortedItems.slice(1, 7));
        setResult(data);
      } catch (error) {
        console.error("Error fetching magazine data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (active === -1) {
      const items = result
        .flatMap((category) =>
          category.items.map((item) => ({
            ...item,
            categoryTitle: category.title,
            uniqueId: `${category.slug}-${item.slug}`,
          }))
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      setDisplayItems(items.slice(1, 7));
    } else if (result[active]) {
      setDisplayItems(
        result[active].items
          .map((item) => ({
            ...item,
            categoryTitle: result[active].title,
            uniqueId: `${result[active].slug}-${item.slug}`,
          }))
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 6)
      );
    }
  }, [active, result]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="border border-ninjack-line-gray rounded-[30px] flex max-w-[calc(100vw_-_40px)] md:overflow-hidden md:w-fit self-center mx-auto overflow-x-scroll mb-6">
        <div
          key="all"
          onClick={() => setActive(-1)}
          role="button"
          tabIndex={0}
          className="cursor-pointer"
        >
          <div
            className={clsx(
              "md:py-4 py-3 md:px-5 px-4 textsm leading-none",
              active === -1
                ? "border border-ninjack-line-gray rounded-[30px] bg-ninjack-bg-gray text-ninjack-white"
                : "text-ninjack-text-gray md:text-[16px] text-[12px]",
              "hover:border hover:border-ninjack-line-gray hover:rounded-[30px] hover:bg-ninjack-bg-gray hover:text-ninjack-white"
            )}
          >
            すべて
          </div>
        </div>

        {result.map((category, index) => (
          <div
            key={category.slug}
            onClick={() => setActive(index)}
            role="button"
            tabIndex={0}
            className="cursor-pointer"
          >
            <div
              className={clsx(
                "md:py-4 py-3 md:px-5 px-4 textsm leading-none border border-transparent",
                active === index
                  ? "border border-ninjack-line-gray rounded-[30px] bg-ninjack-bg-gray text-ninjack-white"
                  : "text-ninjack-text-gray md:text-[16px] text-[12px]",
                "hover:border hover:border-ninjack-line-gray hover:rounded-[30px] hover:bg-ninjack-bg-gray hover:text-ninjack-white"
              )}
            >
              {category.title}
            </div>
          </div>
        ))}
      </div>

      <div className="">
        <div className="flex items-baseline space-x-3 mb-10">
          <span className="text-ninjack-white text-[28px] leading-none">
            What&apos;s new.
          </span>
          <span className="text-ninjack-text-gray text-sm leading-none">
            / 新着記事
          </span>
        </div>

        <div className="flex md:flex-row flex-col justify-between">
          {latestItem && (
            <Link
              href={`/magazine/${latestItem.slug}`}
              className="flex flex-col group"
            >
              <div className="overflow-hidden rounded-[10px]">
                <Image
                  src={latestItem.image?.[0]?.url || "/noimage.png"}
                  alt={latestItem.title || ""}
                  width={500}
                  height={300}
                  className="rounded-[10px] group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="mt-3">
                <div className="flex justify-between ">
                  <div className="flex space-x-4 items-center">
                    {latestItem.isNew && (
                      <div className="text-xs leading-none bg-ninjack-white px-[7px] py-[5px]">
                        NEW
                      </div>
                    )}
                    <div className="flex space-x-1 items-center">
                      <span className="text-2xl" style={{ color: "#63B8A7" }}>
                        ・
                      </span>
                      <span className="text-ninjack-text-gray text-xs">
                        {latestItem.categoryTitle}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-ninjack-text-gray">
                    {new Date(latestItem.createdAt).toLocaleDateString("ja-JP")}
                  </div>
                </div>
                <p className="text-ninjack-white text-xl font-bold mb-4 group-hover:text-ninjack-purple">
                  {latestItem.title}
                </p>
                <p className="text-ninjack-text-gray text-xs mb-5">
                  {latestItem.summary}
                </p>
              </div>
            </Link>
          )}

          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-4 mb-8">
            {displayItems.map((item) => {
              if (!item?.slug) return null;

              return (
                <div
                  key={`magazine-${item.slug}-${item.categoryTitle}`}
                  className="flex flex-col"
                >
                  <MagazineItem
                    image={item?.image?.[0]?.url || "/noimage.png"}
                    imageWidth={240} // 追加
                    imageHeight={160} // 追加
                    isNew={!!item?.isNew}
                    category={item?.categoryTitle || ""}
                    date={item?.createdAt}
                    title={item?.title || ""}
                    content={item?.summary || ""}
                    href={`/magazine/${item.slug}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
