import { Asset, AssetFile } from "contentful";

export const transformAsset = (
  asset: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  if (asset === undefined || asset.fields.file === undefined) {
    throw new Error("Asset file not found");
  }

  return {
    url: transformImage(asset.fields.file),
    alt: asset.fields.title || "",
  };
};

export const transformImage = (asset: AssetFile) => {
  if (asset === undefined || asset.details.image === undefined) {
    throw new Error("Asset image not found");
  }

  return wrapImageUrl(asset.url);
};

const wrapImageUrl = (urlWithoutProtocol: string): string => {
  return `https:${urlWithoutProtocol}`;
};

export const transformPublishDate = (date: string) => {
  return new Date(date)
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");
};
