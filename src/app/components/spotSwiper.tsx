"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import SpotItem from "./Common/spotItem";
import { spotCategoryPerItems } from "@/app/(pages)/spot/fetcher";
interface SpotItem {
  slug: string;
  title: string;
  image:
    | {
        url: string;
        alt: string;
      }[]
    | undefined;
  area: string | null | undefined;
  category: {
    slug: string | undefined;
    title: string;
  };
  price: string;
}

interface SpotCategory {
  title: string;
  slug: string;
  items: SpotItem[];
}

const SpotSwiper = () => {
  const [categories, setCategories] = useState<SpotCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSlidesPerView = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 750) return 1.4;
    return 3;
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
    };

    window.addEventListener("resize", handleResize);

    const fetchSpots = async () => {
      try {
        const result = await spotCategoryPerItems(6);
        setCategories(result);
      } catch (error) {
        console.error("Failed to fetch spots:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpots();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={40}
      freeMode={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      modules={[FreeMode, Pagination]}
      className="w-full"
    >
      {categories.map((category) =>
        category.items.map((item) => (
          <SwiperSlide key={item.slug}>
            <SpotItem
              href={`/spot/${item.slug}`}
              image={item.image?.[0]?.url || "/noimage.png"}
              categroy="ものづくり"
              areaName={item.area || ""}
              title={item.title}
              price={item.price}
            />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default SpotSwiper;
