"use client";

import { getNinjutsu } from "@/lib/contentful/sharedModel";
import { Suspense, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

export default function TodayNinjutsu() {
  const [ninjutsus, setNinjutsus] = useState<string[]>(["", ""]);

  useEffect(() => {
    const fetchNinjutsu = async () => {
      try {
        const allNinjutsus = await getNinjutsu();
        const shuffledNinjutsus = allNinjutsus.sort(() => Math.random() - 0.5);
        setNinjutsus([
          shuffledNinjutsus[0] || "データ読み込み中...",
          shuffledNinjutsus[1] || "データ読み込み中...",
        ]);
      } catch (error) {
        console.error("Error fetching ninjutsu:", error);
        setNinjutsus(["データ読み込みエラー", "データ読み込みエラー"]);
      }
    };

    fetchNinjutsu();
  }, []);

  return (
    <div className="bg-[#222222] w-[100%] md:max-w-[420px] md:rounded-[6px] py-3 md:mx-6 px-0 md:px-2">
      <Marquee className="flex justify-between gap-4 " speed={25}>
        <Suspense fallback={<p className="m-3 text-xs">今日の忍術：</p>}>
          <div className="flex gap-6">
            <p className="text-xs">{`今日の忍術：${ninjutsus[0]}`}</p>
            <p className="text-xs">{`今日の忍術：${ninjutsus[1]}`}</p>
          </div>
        </Suspense>
      </Marquee>
    </div>
  );
}
