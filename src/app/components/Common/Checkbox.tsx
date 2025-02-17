"use client";

type Props = {
  name: "area" | "categories";
  option: {
    title: string;
    slug: string;
  }[];
  params: URLSearchParams;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  name,
  option,
  params,
  handleSearch,
}: Props) {
  return (
    <div className="md:flex md:flex-col  md:space-y-2 grid grid-cols-2">
      <label
        htmlFor={`${name}-all`}
        className="flex space-x-2 items-center p-2.5 bg-ninjack-bg-gray rounded-[4px] cursor-pointer hover:brightness-200 checked:bg-ninjack-purple has-checked:border-ninjack-white"
      >
        <div className="custom-checkbox">
          <input
            id={`${name}-all`}
            type="checkbox"
            name={name}
            value="all"
            onChange={handleSearch}
            checked={params.getAll(name).length === 0}
            className="peer"
          />
          <span className="checkmark"></span> {/* This span will be styled */}
        </div>
        <div className="text-ninjack-white text-sm">すべて</div>
      </label>
      {option.map((opt) => (
        <label
          key={opt.slug}
          className="flex space-x-2 items-center p-2.5 bg-ninjack-bg-gray rounded-[4px] cursor-pointer hover:brightness-200 checked:bg-ninjack-purple has-checked:border-ninjack-white"
          htmlFor={`${opt.slug}-check`}
        >
          <div className="custom-checkbox">
            <input
              type="checkbox"
              name={name}
              value={opt.slug}
              onChange={handleSearch}
              checked={params.getAll(name).includes(opt.slug)}
              className="hidden peer" // Hide the default checkbox
              id={`${opt.slug}-check`}
            />
            <span className="checkmark"></span> {/* This span will be styled */}
          </div>
          <div className="text-ninjack-white text-sm">
            <p className="text-ninjack-white text-sm">{opt.title}</p>
          </div>
        </label>
      ))}
    </div>
  );
}
