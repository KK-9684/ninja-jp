import Link from "next/link";
import Image from "next/image";
import { shuffle } from "@/lib/util/shuffle";
import { getMagazineList } from "@/app/(pages)/magazine/fetcher";

// おすすめのマガジン
export default async function RecommendMagazine({ limit }: { limit: number }) {
  const list = await getMagazineList({
    page: 1,
    perPage: 10,
    categories: [],
    tag: "",
  });

  const items = shuffle(list.items).slice(0, limit);
  console.log(items);
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/magazine/${item.slug}`}
          className="flex md:flex-col flex-row gap-6"
        >
          <Image
            src={item.image?.[0].url}
            alt={item.image?.[0].alt}
            width={380}
            height={240}
            className="rounded-md w-[380px] h-[240px]  object-cover"
          />
          <div className="flex flex-col md:gap-5 gap-3">
            <div className="flex justify-between gap-5">
              <div className="flex space-x-1 items-center">
                <div className="flex items-center">
                  <span className="text-2xl" style={{ color: "#63B8A7" }}>
                    ・
                  </span>
                  <span className="text-ninjack-text-gray text-xs">
                    {item.category?.[0].title || ""}
                  </span>
                </div>
              </div>
              <div className="text-sm text-ninjack-text-gray self-center">
                {item.createdAt}
              </div>
            </div>
            <p className="text-ninjack-white md:text-xl text-[14px] font-bold">
              {item.title}
            </p>
            <p className="text-ninjack-text-gray text-xs">{item.content}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
