"use client";
import Form from "next/form";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Checkbox from "./Checkbox";
import { useState, useEffect } from "react";

type Props = {
  categories?: {
    title: string;
    slug: string;
  }[];
  area?: {
    title: string;
    slug: string;
  }[];
  tag?: {
    title: string;
    slug: string;
  }[];
  modelType?: "activity" | "spot" | "item" | "research" | "fiction" | "ninja";
};

export default function SearchForm({
  categories,
  area,
  tag,
  modelType = "activity",
}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [search, setSearch] = useState<URLSearchParams>(
    new URLSearchParams(searchParams.toString())
  );

  // 検索パラメータが変更されたときにstateを更新
  useEffect(() => {
    setSearch(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  // カテゴリの見出しを設定
  const getCategoryTitle = () => {
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
        return "カテゴリから探す";
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = event.target;
    const params = new URLSearchParams(searchParams.toString());

    // ページパラメータをリセット
    params.delete("page");

    if (checked) {
      if (value === "all") {
        // 「すべて」が選択された場合は該当する名前のパラメータをすべて削除
        params.delete(name);
      } else {
        // 通常のチェックボックスが選択された場合はパラメータを追加
        params.append(name, value);
      }
    } else {
      if (value === "all") {
        // 特に何もしない（「すべて」のチェックが外れた場合）
      } else {
        // チェックが外れた場合、該当するパラメータを削除
        const values = params.getAll(name);
        params.delete(name);
        values.forEach((val) => {
          if (val !== value) {
            params.append(name, val);
          }
        });
      }
    }

    // URLパラメータを更新
    setSearch(params);
    replace(`${pathname}?${params.toString()}`);
  };

  // すべてのフィルターをクリア
  const clearAllFilters = () => {
    const params = new URLSearchParams();
    setSearch(params);
    replace(pathname);
  };

  return (
    <Form action={pathname}>
      <div className="mb-5">
        {categories && (
          <>
            <div>
              <div className="text-sm leading-none font-bold text-ninjack-white mb-5">
                {getCategoryTitle()}
              </div>
              <div className="md:flex md:flex-col  md:space-y-2 grid grid-cols-2 gap-1">
                <Checkbox
                  name="categories"
                  option={categories}
                  params={search}
                  handleSearch={handleSearch}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mb-5">
        {area && (
          <>
            <div>
              <div className="text-sm leading-none font-bold text-ninjack-white mb-5">
                エリアから探す
              </div>
              <div className="md:flex md:flex-col  grid grid-cols-2 gap-1">
                <Checkbox
                  name="area"
                  option={area}
                  params={search}
                  handleSearch={handleSearch}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mb-5">
        {tag && (
          <>
            <h2 className="text-sm leading-none font-bold text-ninjack-white mb-5">
              キーワードから探す
            </h2>
            <div className="flex flex-wrap gap-2">
              {tag.map((t) => (
                <Link
                  key={t.slug}
                  href={`${pathname}?tag=${t.slug}`}
                  className="inline-block bg-ninjack-purple-light px-3 py-1 rounded-full text-sm text-ninjack-white hover:bg-ninjack-purple transition-colors"
                >
                  #{t.title}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* フィルタークリアボタン */}
      {search.toString() !== "" && (
        <button
          onClick={clearAllFilters}
          className="w-full py-2 mt-4 border border-ninjack-line-gray text-ninjack-white rounded hover:bg-ninjack-background transition-colors"
        >
          条件をクリア
        </button>
      )}
    </Form>
  );
}
