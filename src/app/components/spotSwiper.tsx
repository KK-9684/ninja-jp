import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import SpotItem from "./Common/spotItem";
import imageSpot from "@/assets/image-spot.jpg";

const SpotSwiper = () => {
  const getSlidesPerView = () => {
    if(window.innerWidth < 750)
      return 1.4;
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
      spaceBetween={40}
      freeMode={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      modules={[FreeMode, Pagination]}
      className="w-full"
    >
      <SwiperSlide>
        <SpotItem
          image={imageSpot}
          categroy="ものづくり"
          areaName="エリア名"
          title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
          price="XXXX"
        />
      </SwiperSlide>
      <SwiperSlide>
        <SpotItem
          image={imageSpot}
          categroy="ものづくり"
          areaName="エリア名"
          title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
          price="XXXX"
        />
      </SwiperSlide>
      <SwiperSlide>
        <SpotItem
          image={imageSpot}
          categroy="ものづくり"
          areaName="エリア名"
          title="タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル"
          price="XXXX"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SpotSwiper;
