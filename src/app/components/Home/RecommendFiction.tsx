"use client";

import FictionItem from "../Common/FictionItem";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { fictionCategoryPerItems } from "@/app/(pages)/fiction/fetcher";

export default function RecommendFiction() {
  const [result, setResult] = useState([]);
  const [active, setActive] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fictionCategoryPerItems(5);
        setResult(data);

        // すべてのアイテムを1つの配列にまとめる
        const items = data.flatMap((category) =>
          category.items.slice(0, 5).map((item) => ({
            ...item,
            uniqueId: `${category.slug}-${item.slug}`, // uniqueKey → uniqueId に変更
            categoryTitle: category.title,
          }))
        );

        // 日付でソート
        const sortedItems = items.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const uniqueItems = Array.from(
          new Map(sortedItems.map((item) => [item.slug, item])).values()
        );
        setAllItems(uniqueItems);
      } catch (error) {
        console.error("Error fetching fiction data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 表示するアイテムを取得
  const displayItems =
    active === -1
      ? allItems.slice(0, 5)
      : (result[active]?.items || []).slice(0, 5).map((item) => ({
          ...item,
          uniqueId: `${result[active].slug}-${item.slug}`,
          categoryTitle: result[active].title,
        }));

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="border border-ninjack-line-gray rounded-[30px] flex min-w-[400px] md:overflow-hidden md:w-fit self-center mx-auto overflow-x-scroll">
        {/* すべてタブ */}
        <div
          key="all"
          onClick={() => setActive(-1)}
          role="button"
          tabIndex={0}
          className="cursor-pointer"
        >
          <div
            className={clsx(
              "md:py-4 py-3 md:px-5 px-4 textsm leading-none border border-transparent",
              active === -1
                ? "border border-ninjack-line-gray rounded-[30px] bg-ninjack-bg-gray text-ninjack-white"
                : "text-ninjack-text-gray md:text-[16px] text-[12px]",
              "hover:border hover:border-ninjack-line-gray hover:rounded-[30px] hover:bg-ninjack-bg-gray hover:text-ninjack-white"
            )}
          >
            すべて
          </div>
        </div>

        {/* カテゴリタブ */}
        {result.map((category, index) => (
          <div
            key={`category-${category.slug}`}
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

      <div className="grid md:grid-cols-5 grid-cols-2 gap-10 justify-between mt-10">
        {displayItems.map((item) => {
          if (!item?.slug) return null;

          return (
            <FictionItem
              key={item.uniqueId || item.slug}
              image={item.image?.[0]?.url || ""}
              title={item.title || ""}
              category={item.categoryTitle || ""}
              href={`/fiction/${item.slug}`}
            />
          );
        })}
      </div>
    </>
  );
}
