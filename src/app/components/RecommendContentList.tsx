import { getTopCarousel } from "@/lib/contentful/sharedModel";
import ActivitySwiper from "./activitySwiper";

export default async function RecommendContentList() {
  const slides = await getTopCarousel();
  return <ActivitySwiper slides={slides} />;
}
