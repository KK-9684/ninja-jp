"use client";
import Image from "next/image";
import iconActivity from "@/assets/icon-activity.svg";
import iconActivityOn from "@/assets/icon-activity-on.svg";
import iconItem from "@/assets/icon-item.svg";
import iconItemOn from "@/assets/icon-item-on.svg";
import iconSpot from "@/assets/icon-spot.svg";
import iconSpotOn from "@/assets/icon-spot-on.svg";
import iconResearch from "@/assets/icon-research.svg";
import iconResearchOn from "@/assets/icon-research-on.svg";
import iconFiction from "@/assets/icon-fiction.svg";
import iconFictionOn from "@/assets/icon-fiction-on.svg";
import iconNinja from "@/assets/icon-ninja.svg";
import iconNinjaOn from "@/assets/icon-ninja-on.svg";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

const SwitchContentNavigation = () => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  return (
    <section className="bg-ninjack-bg-gray">
      <div className="container mx-auto py-[60px] px-5 flex md:flex-row flex-col justify-between items-center">
        <div>
          <div className="hidden md:block text-[40px] text-ninjack-white leading-none mb-3">
            View more{" "}
          </div>
          <div className="md:hidden mb-6">
            <div className="text-[24px] text-ninjack-white leading-none mb-3 flex flex-row gap-2">
              View more <div className="text-ninjack-purple">CONTENTS.</div>
            </div>
          </div>
          <div
            className={clsx("text-[40px] leading-none mb-1 md:block hidden")}
          >
            <p className="text-ninjack-white">
              about
              <span
                className={clsx("text-ninjack-purple ml-4 ", {
                  inlineBlock: activeIcon === "",
                  hidden: activeIcon !== "",
                })}
              >
                CONTENT.
              </span>
              <span
                className={clsx("text-ninjack-purple ml-4", {
                  inlineBlock: activeIcon === "activity",
                  hidden: activeIcon !== "activity",
                })}
              >
                ACTIVITY.
              </span>
              <span
                className={clsx("text-ninjack-purple ml-4", {
                  inlineBlock: activeIcon === "spot",
                  hidden: activeIcon !== "spot",
                })}
              >
                SPOT.
              </span>
              <span
                className={clsx("text-ninjack-purple ml-4", {
                  inlineBlock: activeIcon === "item",
                  hidden: activeIcon !== "item",
                })}
              >
                ITEM.
              </span>
              <span
                className={clsx("text-ninjack-purple ml-4", {
                  inlineBlock: activeIcon === "research",
                  hidden: activeIcon !== "research",
                })}
              >
                RESEARCH.
              </span>
              <span
                className={clsx("text-ninjack-purple ml-4", {
                  inlineBlock: activeIcon === "fiction",
                  hidden: activeIcon !== "fiction",
                })}
              >
                FICTION.
              </span>
              <span
                className={clsx("text-ninjack-purple ml-4", {
                  inlineBlock: activeIcon === "ninja",
                  hidden: activeIcon !== "ninja",
                })}
              >
                NINJA.
              </span>
            </p>
          </div>
          <div className="text-ninjack-purple text-sm text-end leading-none hidden md:block">
            <span
              className={clsx({
                inlineBlock: activeIcon === "",
                hidden: activeIcon !== "",
              })}
            >
              &nbsp;
            </span>
            <span
              className={clsx({
                inlineBlock: activeIcon === "activity",
                hidden: activeIcon !== "activity",
              })}
            >
              体験・修行
            </span>
            <span
              className={clsx({
                inlineBlock: activeIcon === "spot",
                hidden: activeIcon !== "spot",
              })}
            >
              施設・史跡
            </span>
            <span
              className={clsx({
                inlineBlock: activeIcon === "item",
                hidden: activeIcon !== "item",
              })}
            >
              商品・忍具
            </span>
            <span
              className={clsx({
                inlineBlock: activeIcon === "research",
                hidden: activeIcon !== "research",
              })}
            >
              研究情報
            </span>
            <span
              className={clsx({
                inlineBlock: activeIcon === "fiction",
                hidden: activeIcon !== "fiction",
              })}
            >
              創作作品
            </span>
            <span
              className={clsx({
                inlineBlock: activeIcon === "ninja",
                hidden: activeIcon !== "ninja",
              })}
            >
              現代忍者
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/activity"
            className="group"
            onMouseEnter={() => setActiveIcon("activity")}
            onMouseLeave={() => setActiveIcon("")}
          >
            <Image
              src={activeIcon === "activity" ? iconActivityOn : iconActivity}
              alt="体験・修行"
              width={72}
              height={72}
              className="m-8 w-[72px] h-[72px]"
            />
          </Link>
          <Link
            href="/spot"
            className="group"
            onMouseEnter={() => setActiveIcon("spot")}
            onMouseLeave={() => setActiveIcon("")}
          >
            <Image
              src={activeIcon === "spot" ? iconSpotOn : iconSpot}
              alt="施設・史跡"
              width={72}
              height={72}
              className="m-8 w-[72px] h-[72px]"
            />
          </Link>
          <Link
            href="/item"
            className="group"
            onMouseEnter={() => setActiveIcon("item")}
            onMouseLeave={() => setActiveIcon("")}
          >
            <Image
              src={activeIcon === "item" ? iconItemOn : iconItem}
              alt="商品・忍具"
              width={72}
              height={72}
              className="m-8 w-[72px] h-[72px]"
            />
          </Link>
          <Link
            href="/research"
            className="group"
            onMouseEnter={() => setActiveIcon("research")}
            onMouseLeave={() => setActiveIcon("")}
          >
            <Image
              src={activeIcon === "research" ? iconResearchOn : iconResearch}
              alt="研究情報"
              width={72}
              height={72}
              className="m-8 w-[72px] h-[72px]"
            />
          </Link>
          <Link
            href="/fiction"
            className="group"
            onMouseEnter={() => setActiveIcon("fiction")}
            onMouseLeave={() => setActiveIcon("")}
          >
            <Image
              src={activeIcon === "fiction" ? iconFictionOn : iconFiction}
              alt="創作作品"
              width={72}
              height={72}
              className="m-8 w-[72px] h-[72px]"
            />
          </Link>
          <Link
            href="/ninja"
            className="group"
            onMouseEnter={() => setActiveIcon("ninja")}
            onMouseLeave={() => setActiveIcon("")}
          >
            <Image
              src={activeIcon === "ninja" ? iconNinjaOn : iconNinja}
              alt="現代忍者"
              width={72}
              height={72}
              className="m-8 w-[72px] h-[72px]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SwitchContentNavigation;
