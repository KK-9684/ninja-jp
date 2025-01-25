"use client";
import { useSearchParams } from "next/navigation";

type Props = {
  name: "area" | "categories";
  option: {
    title: string;
    slug: string;
  }[];
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({ name, option, handleSearch }: Props) {
  const searchParams = useSearchParams();

  return (
    <>
      <label htmlFor={`${name}-all`}>すべて</label>
      <input
        id={`${name}-all`}
        type="checkbox"
        name={name}
        value="all"
        onChange={handleSearch}
        checked={searchParams.getAll(name).length === 0}
      />
      {option.map((opt) => (
        <div key={opt.slug}>
          <label htmlFor={opt.slug}>{opt.title}</label>
          <input
            id={opt.slug}
            type="checkbox"
            name={name}
            value={opt.slug}
            onChange={handleSearch}
            checked={searchParams.getAll(name).includes(opt.slug)}
          />
        </div>
      ))}
    </>
  );
}
