import { getActivityList } from "@/app/(pages)/activity/fetcher";
import { getFictionList } from "@/app/(pages)/fiction/fetcher";
import { getItemList } from "@/app/(pages)/item/fetcher";
import { getMemberList } from "@/app/(pages)/ninja/fetcher";
import { getResearchList } from "@/app/(pages)/research/fetcher";
import { getSpotList } from "@/app/(pages)/spot/fetcher";
import ContentCountItem from "../Common/contentCountItem";
import iconActivity from "@/assets/icon-activity.svg";
import iconItem from "@/assets/icon-item.svg";
import iconSpot from "@/assets/icon-spot.svg";
import iconResearch from "@/assets/icon-research.svg";
import iconFiction from "@/assets/icon-fiction.svg";
import iconNinja from "@/assets/icon-ninja.svg";

export default async function EachContentsCount() {
  const activityCount = (await getActivityList({ page: 1, perPage: 1 })).total;
  const spotCount = (await getSpotList({ page: 1, perPage: 1 })).total;
  const itemCount = (await getItemList({ page: 1, perPage: 1 })).total;
  const researchCount = (await getResearchList({ page: 1, perPage: 1 })).total;
  const fictionCount = (await getFictionList({ page: 1, perPage: 1 })).total;
  const memberCount = (await getMemberList({ page: 1, perPage: 1 })).total;

  const roundCount = (count: number) => {
    return Math.floor(count / 10) * 10;
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-[44px] justify-between md:w-[734px] mt-4">
      <ContentCountItem
        icon={iconActivity}
        label="体験・修行"
        counts={roundCount(activityCount)}
      />
      <ContentCountItem
        icon={iconSpot}
        label="施設・史跡"
        counts={roundCount(spotCount)}
      />
      <ContentCountItem
        icon={iconItem}
        label="商品・忍具"
        counts={roundCount(itemCount)}
      />
      <ContentCountItem
        icon={iconResearch}
        label="研究情報"
        counts={roundCount(researchCount)}
      />
      <ContentCountItem
        icon={iconFiction}
        label="創作作品"
        counts={roundCount(fictionCount)}
      />
      <ContentCountItem
        icon={iconNinja}
        label="現代忍者"
        counts={roundCount(memberCount)}
      />
    </div>
  );
}
