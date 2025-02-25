"use client";

import IconFilter from "@/assets/icon-filter.svg";
import IconClose from "@/assets/icon-close.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import CheckboxGroup from "./checkboxGroup";
import KeywordsGroup from "./keywordsGroup";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// 型定義を追加
type FilterItemProps = {
  categoryOptions?: { label: string; value: string }[];
  areaOptions?: { label: string; value: string }[]; // 省略可能
  keywordOptions?: { label: string; value: string }[]; // 省略可能
  modelType?: "activity" | "spot" | "item" | "research" | "fiction" | "ninja";
};

const FilterItem = ({
  categoryOptions = [],
  areaOptions, // 省略可能に変更
  keywordOptions, // 省略可能に変更
  modelType = "activity",
}: FilterItemProps) => {
  const [show, setShow] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 選択状態を管理するステート
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["all"]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // 初期値の設定
  useEffect(() => {
    if (searchParams.has("categories")) {
      const categories = searchParams.getAll("categories");
      setSelectedCategories(categories.length > 0 ? categories : ["all"]);
    }

    if (areaOptions && searchParams.has("area")) {
      const areas = searchParams.getAll("area");
      setSelectedAreas(areas.length > 0 ? areas : ["all"]);
    }

    if (keywordOptions && searchParams.has("keywords")) {
      const keywords = searchParams.getAll("keywords");
      setSelectedKeywords(keywords.length > 0 ? keywords : []);
    }
  }, [searchParams, areaOptions, keywordOptions]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // カテゴリラベルをモデルタイプに応じて変更
  const getCategoryLabel = () => {
    switch (modelType) {
      case "activity":
        return "体験・修行のカテゴリ";
      case "spot":
        return "施設・史跡のカテゴリ";
      case "item":
        return "商品・忍具のカテゴリ";
      case "research":
        return "研究情報のカテゴリ";
      case "fiction":
        return "創作作品のカテゴリ";
      case "ninja":
        return "現代忍者のカテゴリ";
      default:
        return "カテゴリで絞り込む";
    }
  };

  // フィルター適用ボタンのハンドラー
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (!selectedCategories.includes("all")) {
      selectedCategories.forEach((category) =>
        params.append("categories", category)
      );
    }

    if (areaOptions && !selectedAreas.includes("all")) {
      selectedAreas.forEach((area) => params.append("area", area));
    }

    if (keywordOptions && selectedKeywords.length > 0) {
      selectedKeywords.forEach((keyword) => params.append("keywords", keyword));
    }

    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
    handleClose();
  };

  // リセットボタンのハンドラー
  const resetFilters = () => {
    setSelectedCategories(["all"]);
    if (areaOptions) setSelectedAreas(["all"]);
    if (keywordOptions) setSelectedKeywords([]);
  };

  return (
    <>
      <button
        className="border-[1px] border-ninjack-line-gray bg-ninjack-bg-gray rounded py-2 px-3 items-center flex flex-row gap-2 text-ninjack-white"
        onClick={handleShow}
      >
        <Image src={IconFilter} alt="" /> 絞り込み
      </button>

      {show && (
        <div className="fixed top-0 left-0 text-ninjack-white w-full bg-ninjack-black h-screen p-6 z-50 overflow-y-auto">
          <div className="relative">
            <div className="flex flex-row gap-2 text-[20px] font-bold justify-center pt-[26px]">
              <Image src={IconFilter} alt="" />
              絞り込み
            </div>
            <button className="absolute top-0 right-0" onClick={handleClose}>
              <Image src={IconClose} alt="" />
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-8 pb-32">
            <CheckboxGroup
              label={getCategoryLabel()}
              options={categoryOptions}
              onChange={(values) => setSelectedCategories(values)}
              customClass="border-t-[2px] border-ninjack-line-gray pt-6"
              defaultCheckedValues={selectedCategories}
            />

            {areaOptions && (
              <CheckboxGroup
                label="エリア名で絞り込む"
                options={areaOptions}
                onChange={(values) => setSelectedAreas(values)}
                customClass="border-t-[2px] border-b-[2px] border-ninjack-line-gray py-6"
                defaultCheckedValues={selectedAreas}
              />
            )}

            {keywordOptions && (
              <KeywordsGroup
                label="キーワードから探す"
                keywords={keywordOptions}
                pathname={pathname}
              />
            )}
          </div>

          {/* アクションボタン */}
          <div className="fixed bottom-0 left-0 w-full p-6 bg-ninjack-black">
            <div className="flex gap-4">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-ninjack-line-gray text-ninjack-white rounded-lg"
              >
                リセット
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 py-3 bg-ninjack-purple text-white rounded-lg"
              >
                絞り込みを適用
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterItem;
