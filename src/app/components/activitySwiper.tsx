"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import topSlide1 from "@/assets/top-slide-1.jpg";
import topSlide2 from "@/assets/top-slide-2.jpg";
import topSlide3 from "@/assets/top-slide-3.jpg";
import TopSlideDescription from "./Common/topSlideDescription";

// Swiperのスタイルをインポート
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const ActivitySwiper = () => {
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
      <SwiperSlide>
        <Image src={topSlide1} alt="体験・修行" />
        <TopSlideDescription
          title="体験・修行"
          content="タイトルタイトルタイトルタイトルタイトル"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={topSlide2} alt="施設・史跡" />
        <TopSlideDescription
          title="施設・史跡"
          content="タイトルタイトルタイトルタイトルタイトル"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={topSlide3} alt="商品・忍具" />
        <TopSlideDescription
          title="商品・忍具"
          content="タイトルタイトルタイトルタイトルタイトル"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={topSlide1} alt="研究情報" />
        <TopSlideDescription
          title="研究情報"
          content="タイトルタイトルタイトルタイトルタイトル"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={topSlide2} alt="創作作品" />
        <TopSlideDescription
          title="創作作品"
          content="タイトルタイトルタイトルタイトルタイトル"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={topSlide3} alt="現代忍者" />
        <TopSlideDescription
          title="現代忍者"
          content="タイトルタイトルタイトルタイトルタイトル"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default ActivitySwiper;
