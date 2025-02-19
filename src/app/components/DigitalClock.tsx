import { useCurrentTime } from "@/hooks/useCurrentTime";
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
  const currentTime = useCurrentTime();
  const dateString = currentTime.toLocaleDateString("ja-JP", {
    month: "2-digit",
    day: "2-digit",
  });
  const timeString = currentTime.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // 現在の時間を取得
  const currentHour = currentTime.getHours();

  // 時間に応じた猫の目画像を取得
  const getEyeImage = () => {
    // 夜間（17時〜6時）
    if (currentHour >= 17 || currentHour <= 6) {
      return imageEyeNight;
    }
    // 早朝（7〜8時）
    if (currentHour >= 7 && currentHour <= 8) {
      return imageEyeMorning;
    }
    // 午前（9〜10時）
    if (currentHour >= 9 && currentHour <= 10) {
      return imageEyeDay1;
    }
    // 昼（11〜12時）
    if (currentHour >= 11 && currentHour <= 12) {
      return imageEyeDay2;
    }
    // それ以外（13〜16時）
    return imageEye;
  };

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
      <Image src={getEyeImage()} alt="猫の目" className="w-[35px]" />
    </div>
  );
}
