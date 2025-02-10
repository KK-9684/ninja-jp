"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import TopSlideDescription from "./Common/topSlideDescription";

// Swiperのスタイルをインポート
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

type ActivitySwiperProps = {
  slides: {
    slug: string;
    title: string;
    image: { url: string; alt: string } | null;
    content: string;
  }[];
};

const ActivitySwiper = ({ slides }: ActivitySwiperProps) => {
  const getSlidesPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 750) return 1.2;
      return window.innerWidth / 600;
    }

    return 3;
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={28}
      freeMode={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      modules={[FreeMode, Pagination]}
      className="w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={`recommend-contents-${slide.slug}`}>
          {slide.image && (
            <Image
              src={slide.image.url}
              alt={slide.image.alt}
              width={800}
              height={1020}
              className="rounded-[20%_6px_6px_6px]"
            />
          )}
          <TopSlideDescription title={slide.title} content={slide.content} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ActivitySwiper;
