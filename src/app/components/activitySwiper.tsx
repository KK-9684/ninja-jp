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
import Link from "next/link";

type ActivitySwiperProps = {
  slides: {
    slug: string;
    contentType: string;
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

  console.log(slides);

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
          <Link href={`/${slide.contentType}/${slide.slug}`} className="group">
            {slide.image && (
              <div className="overflow-hidden rounded-[20%_10px_10px_10px] w-[400px] h-[560px]">
                <Image
                  src={slide.image.url}
                  alt={slide.image.alt}
                  width={800}
                  height={1020}
                  className="rounded-[20%_10px_10px_10px] w-[400px] h-[560px] object-cover group-hover:scale-105 transition-all duration-300"
                />
              </div>
            )}
            <TopSlideDescription title={slide.title} content={slide.content} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ActivitySwiper;
