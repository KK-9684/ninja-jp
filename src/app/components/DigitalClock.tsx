"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BarlowFont } from "./Common/font";
import clsx from "clsx";

// 猫の目の画像をインポート
import imageEyeNight from "@/assets/eye-night.svg";
import imageEyeMorning from "@/assets/eye-morning.svg";
import imageEyeDay1 from "@/assets/eye-day-1.svg";
import imageEyeDay2 from "@/assets/eye-day-2.svg";
import imageEye from "@/assets/eye.svg";

export default function DigitalClock() {
  // 初期状態を空に設定
  const [dateString, setDateString] = useState("");
  const [timeString, setTimeString] = useState("");
  const [eyeImage, setEyeImage] = useState(imageEye);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // 日付文字列の更新
      setDateString(
        now.toLocaleDateString("ja-JP", {
          month: "2-digit",
          day: "2-digit",
        })
      );

      // 時刻文字列の更新
      setTimeString(
        now.toLocaleTimeString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      // 時間に応じた猫の目画像の設定
      const currentHour = now.getHours();
      if (currentHour >= 17 || currentHour <= 6) {
        setEyeImage(imageEyeNight);
      } else if (currentHour >= 7 && currentHour <= 8) {
        setEyeImage(imageEyeMorning);
      } else if (currentHour >= 9 && currentHour <= 10) {
        setEyeImage(imageEyeDay1);
      } else if (currentHour >= 11 && currentHour <= 12) {
        setEyeImage(imageEyeDay2);
      } else {
        setEyeImage(imageEye);
      }
    };

    // 初期表示
    updateDateTime();

    // 1分ごとに更新
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  // 初期レンダリング時は空の表示
  if (!dateString || !timeString) {
    return <div className="flex gap-2 px-2">--/-- --:--</div>;
  }

  return (
    <div className="flex gap-2 px-2">
      <div className="flex gap-1">
        <p className={clsx("text-[16px] md:text-[24px]", BarlowFont.className)}>
          {dateString}
        </p>
        <p className={clsx("text-[16px] md:text-[24px]", BarlowFont.className)}>
          {timeString}
        </p>
      </div>
      <Image src={eyeImage} alt="猫の目" className="w-[35px]" />
    </div>
  );
}
