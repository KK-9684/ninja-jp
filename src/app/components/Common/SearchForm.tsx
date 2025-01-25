"use client";
import Form from "next/form";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Checkbox from "./Checkbox";

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

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Form action="/activity">
      {categories && (
        <>
          <h2>カテゴリから探す</h2>
          <Checkbox
            name="categories"
            option={categories}
            handleSearch={handleSearch}
          />
        </>
      )}
      {area && (
        <>
          <h2>エリアから探す</h2>
          <Checkbox name="area" option={area} handleSearch={handleSearch} />
        </>
      )}
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
    </Form>
  );
}
