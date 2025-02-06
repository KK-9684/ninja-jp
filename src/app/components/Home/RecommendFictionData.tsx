import { fictionCategoryPerItems } from "@/app/(pages)/fiction/fetcher";

async function RecommendFictionData() {
  const result = await fictionCategoryPerItems(5);
  return result;
}
