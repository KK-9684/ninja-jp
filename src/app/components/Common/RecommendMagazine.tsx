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
          key={`recommend-magazine-${item.slug}`}
          href={`/magazine/${item.slug}`}
          className="flex md:flex-col flex-row md:gap-6 gap-3 group w-full"
        >
          {item.image && item.image[0] && item.image[0].url && (
            <div className="overflow-hidden rounded-md md:w-[240px] md:h-[240px] w-[120px] h-[120px] md:min-w-[240px] md:min-h-[240px]">
              <Image
                src={item.image?.[0].url}
                alt={item.image?.[0].alt}
                width={380}
                height={240}
                className="rounded-md md:w-[240px] md:h-[240px] w-[120px] h-[120px]  object-cover group-hover:scale-105 transition-all duration-300"
              />
            </div>
          )}
          {item.image! && (
            <div className="overflow-hidden rounded-md md:w-[240px] md:h-[240px] w-[120px] h-[120px] md:min-w-[240px] md:min-h-[240px]">
              <Image
                src={"/noimage.png"}
                alt={item.title}
                width={380}
                height={240}
                className="rounded-md md:w-[240px] md:h-[240px] w-[120px] h-[120px]  object-cover group-hover:scale-105 transition-all duration-300"
              />
            </div>
          )}

          <div className="flex flex-col md:gap-5 gap-3">
            <div className="flex justify-between gap-5">
              <div className="flex space-x-1 items-center">
                <div className="flex items-center">
                  <span className="text-2xl" style={{ color: "#63B8A7" }}>
                    ・
                  </span>
                  <span className="text-ninjack-text-gray text-xs ">
                    {item.category?.[0].title || ""}
                  </span>
                </div>
              </div>
              <div className="text-sm text-ninjack-text-gray self-center">
                {item.createdAt}
              </div>
            </div>
            <p className="text-ninjack-white md:text-xl text-[14px] font-bold group-hover:text-ninjack-purple">
              {item.title}
            </p>
            <p className="text-ninjack-text-gray text-xs">{item.summary}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
