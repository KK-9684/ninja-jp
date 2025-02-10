import { spotCategoryHasItems } from "../(pages)/spot/fetcher";
import SpotSelectionSearchForm from "./SpotSelectionSearchForm";

const SpotSelector = async () => {
  const categories = await spotCategoryHasItems();
  return <SpotSelectionSearchForm categories={categories} />;
};

export default SpotSelector;
