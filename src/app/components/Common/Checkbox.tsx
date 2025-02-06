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
    <div className="md:flex md:flex-col  md:space-y-2 grid grid-cols-2">
      <div className="flex space-x-2 items-center p-2.5 bg-ninjack-bg-gray rounded-[4px]">
        <div className="custom-checkbox">
          <input
            id={`${name}-all`}
            type="checkbox"
            name={name}
            value="all"
            onChange={handleSearch}
            checked={searchParams.getAll(name).length === 0}
          />
          <span className="checkmark"></span> {/* This span will be styled */}
        </div>
        <label htmlFor={`${name}-all`} className="text-ninjack-white text-sm">
          すべて
        </label>
      </div>
      {option.map((opt) => (
        <div
          key={opt.slug}
          className="flex space-x-2 items-center p-2.5 bg-ninjack-bg-gray rounded-[4px]"
        >
          <label
            htmlFor={`${opt.slug}-check`}
            className="text-ninjack-white text-sm"
          >
            <div className="custom-checkbox">
              <input
                type="checkbox"
                name={name}
                value={opt.slug}
                onChange={handleSearch}
                checked={searchParams.getAll(name).includes(opt.slug)}
                className="hidden" // Hide the default checkbox
                id={`${opt.slug}-check`}
              />
              <span className="checkmark"></span>{" "}
              {/* This span will be styled */}
            </div>
          </label>
          <p className="text-ninjack-white text-sm">{opt.title}</p>
        </div>
      ))}
    </div>
  );
}
