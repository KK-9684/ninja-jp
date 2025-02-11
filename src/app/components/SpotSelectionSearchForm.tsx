"use client";
import Form from "next/form";
import { useSearchParams, useRouter } from "next/navigation";

type Props = {
  categories?: {
    title: string;
    slug: string;
  }[];
};

export default function SpotSelectionSearchForm({ categories }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const params = new URLSearchParams(searchParams);

    if (value === "すべて") {
      params.delete("categories");
      router.push("/spot");
    } else {
      params.set("categories", value);
      router.push(`spot?${params.toString()}`);
    }
  };

  return (
    <Form action="/spot">
      <select
        onChange={onChange}
        className="md:hidden p-4 bg-ninjack-bg-gray rounded-md border-ninjack-line-gray border-[1px] text-[14px] text-ninjack-white custom-select"
      >
        <option value="すべて">すべて</option>
        {categories?.map((category) => (
          <option
            key={category.slug}
            value={category.slug}
            className="hover:text-ninjack-purple"
          >
            {category.title}
          </option>
        ))}
      </select>
    </Form>
  );
}
