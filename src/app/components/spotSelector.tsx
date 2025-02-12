import { Suspense } from "react";
import { spotCategoryHasItems } from "../(pages)/spot/fetcher";
import SpotSelectionSearchForm from "./SpotSelectionSearchForm";

const SpotSelector = async () => {
  const categories = await spotCategoryHasItems();
  return (
    <Suspense>
      <SpotSelectionSearchForm categories={categories} />
    </Suspense>
  );
};

export default SpotSelector;
