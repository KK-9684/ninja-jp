"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import iconSwiperArrowLeft from "@/assets/icon-swiper-arrow-left.svg";
import iconSwiperArrowRight from "@/assets/icon-swiper-arrow-right.svg";

type ContentfulImage = {
  url: string;
  width: number;
  height: number;
};

type DetailPageSwiperProps = {
  images: ContentfulImage[];
};

const DetailPageSwiper = ({ images }: DetailPageSwiperProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={10}
          navigation={false}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full max-w-[100%] h-96"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <Image
                src={image.url}
                alt="Activity image"
                width={image.width || 800}
                height={image.height || 600}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-0 bottom-0 z-10 bg-white/80 hover:bg-white p-2  transition-all bg-ninjack-black"
          aria-label="Next slide"
        >
          <Image src={iconSwiperArrowRight} alt="Prev slide" />
        </button>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute right-12 bottom-0 z-10 bg-white/80 hover:bg-white p-2  transition-all bg-ninjack-black rounded-[20px_0_0_0]"
          aria-label="Previous slide"
        >
          <Image src={iconSwiperArrowLeft} alt="Next slide" />
        </button>
      </div>

      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={8}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs-swiper w-full max-w-[100%] h-24"
        breakpoints={{
          640: {
            slidesPerView: 10,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <Image
              src={image.url}
              alt="Activity thumbnail"
              width={60}
              height={60}
              className="w-[60px] h-[60px] object-cover rounded-[6px] overflow-hidden"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .thumbs-swiper .swiper-slide {
          opacity: 0.4;
        }
        .thumbs-swiper .swiper-slide-thumb-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default DetailPageSwiper;
