"use client";
import Form from "next/form";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Checkbox from "./Checkbox";
import { useState } from "react";

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
};

export default function SearchForm({ categories, area, tag }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [search, setSearch] = useState<URLSearchParams>(searchParams);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = event.target;
    const params = new URLSearchParams(searchParams);

    params.delete("page");

    if (checked) {
      if (value === "all") {
        params.delete(name);
      } else {
        params.append(name, value);
      }
    } else {
      params.delete(name, value);
    }
    setSearch(params);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Form action="/activity">
      <div className="mb-5">
        {categories && (
          <>
            <div>
              <div className="text-sm leading-none font-bold text-ninjack-white mb-5">
                カテゴリから探す
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
            <h2>キーワードから探す</h2>
            {tag.map((t) => (
              <Link key={t.slug} href={`${pathname}?tag=${t.slug}`}>
                #{t.title}
              </Link>
            ))}
          </>
        )}
      </div>
    </Form>
  );
}
