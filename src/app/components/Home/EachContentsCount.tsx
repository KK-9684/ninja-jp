import { getActivityList } from "@/app/(pages)/activity/fetcher";
import { getCultureList } from "@/app/(pages)/fiction/fetcher";
import { getItemList } from "@/app/(pages)/item/fetcher";
import { getMemberList } from "@/app/(pages)/ninja/fetcher";
import { getResearchList } from "@/app/(pages)/research/fetcher";
import { getSpotList } from "@/app/(pages)/spot/fetcher";

export default async function EachContentsCount() {
  const activityCount = (await getActivityList({ page: 1, perPage: 1 })).total;
  const spotCount = (await getSpotList({ page: 1, perPage: 1 })).total;
  const itemCount = (await getItemList({ page: 1, perPage: 1 })).total;
  const researchCount = (await getResearchList({ page: 1, perPage: 1 })).total;
  const cultureCount = (await getCultureList({ page: 1, perPage: 1 })).total;
  const memberCount = (await getMemberList({ page: 1, perPage: 1 })).total;

  const roundCount = (count: number) => {
    return Math.floor(count / 10) * 10;
  };

  return (
    <ul>
      <li>体験・修行: {roundCount(activityCount)}</li>
      <li>施設・史跡: {roundCount(spotCount)}</li>
      <li>商品・忍具: {roundCount(itemCount)}</li>
      <li>研究情報: {roundCount(researchCount)}</li>
      <li>創作作品: {roundCount(cultureCount)}</li>
      <li>現代忍者: {roundCount(memberCount)}</li>
    </ul>
  );
}
