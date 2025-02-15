import { EntryFieldTypes, EntrySkeletonType } from "contentful";
import { getEntries } from "./client";
import { transformAsset } from "./transformContent";
import { activityCategoryHasItems } from "@/app/(pages)/activity/fetcher";
import { spotCategoryHasItems } from "@/app/(pages)/spot/fetcher";
import { itemCategoryHasItems } from "@/app/(pages)/item/fetcher";
import { researchCategoryHasItems } from "@/app/(pages)/research/fetcher";
import { fictionCategoryHasItems } from "@/app/(pages)/fiction/fetcher";
import { memberCategoryHasItems } from "@/app/(pages)/ninja/fetcher";

type CategoryContentTypes =
  | "activityCategory"
  | "spotCategory"
  | "itemCategory"
  | "researchCategory"
  | "cultureCategory"
  | "memberCategory"
  | "magazineCategory";

export type WriterEntrySkeleton = {
  contentTypeId: "member";
  fields: {
    name: EntryFieldTypes.Symbol;
    content: Document;
    image: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    slug: EntryFieldTypes.Symbol;
    summary: EntryFieldTypes.Symbol;
    xUrl?: EntryFieldTypes.Symbol;
    instagramUrl?: EntryFieldTypes.Symbol;
    youtubeUrl?: EntryFieldTypes.Symbol;
    facebookUrl?: EntryFieldTypes.Symbol;
  };
};

export type CategoryEntrySkeleton = {
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
  };
};

export const getCategoryList = async (contentType: CategoryContentTypes) => {
  type Skeleton = CategoryEntrySkeleton & {
    contentTypeId: typeof contentType;
  };
  const result = await getEntries<Skeleton>({
    content_type: contentType,
    select: ["fields.title", "fields.slug"],
    order: ["-sys.createdAt"],
  });

  return {
    total: result.total,
    items: result.items.map((category) => ({
      slug: category.sys.id,
      title: category.fields.title,
    })),
  };
};

export const categoryPerItems = async <T extends EntrySkeletonType>(
  contentType: CategoryContentTypes,
  perCategory: number
) => {
  type Skeleton = CategoryEntrySkeleton & {
    contentTypeId: typeof contentType;
  };
  const result = await getEntries<Skeleton>({
    content_type: contentType,
    select: ["fields.title", "fields.slug"],
    order: ["-sys.createdAt"],
  });

  return await Promise.all(
    result.items.map(async (item) => {
      const result = await getEntries<T>({
        links_to_entry: item.sys.id,
        limit: perCategory,
      });

      return {
        slug: item.sys.id,
        title: item.fields.title,
        total: result.total,
        items: result.items,
      };
    })
  );
};

type NinjutsuSkeleton = EntrySkeletonType<{
  content: EntryFieldTypes.Symbol;
}> & {
  contentTypeId: "ninjutsu";
};
export const getNinjutsu = async () => {
  const result = await getEntries<NinjutsuSkeleton>({
    content_type: "ninjutsu",
    select: ["fields.content"],
    limit: 100,
  });

  return result.items.map((ninjutsu) => ninjutsu.fields.content);
};

type CarouselLinkEntry = {
  contentTypeId: "topCarousel";
  fields: {
    title?: EntryFieldTypes.Symbol;
    name?: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  };
};

type CarouselLinkEntrySkeleton = {
  contentTypeId: "topCarousel";
  fields: {
    item: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<CarouselLinkEntry>>;
  };
};

export const resolveModel = (contentType: string) => {
  switch (contentType) {
    case "activity":
      return { id: "activity", name: "体験・旅行" };
    case "spot":
      return { id: "spot", name: "施設・史跡" };
    case "item":
      return { id: "item", name: "商品・忍具" };
    case "research":
      return { id: "research", name: "研究情報" };
    case "culture":
      return { id: "fiction", name: "創作作品" };
    case "member":
      return { id: "ninja", name: "現代忍者" };
    case "magazine":
      return { id: "magazine", name: "マガジン" };
    default:
      return { id: "activity", name: "体験・旅行" };
  }
};
export const getTopCarousel = async () => {
  const result = await getEntries<CarouselLinkEntrySkeleton>({
    content_type: "topCarousel",
    order: ["-sys.createdAt"],
  });

  const topCarousels = result.items[0].fields.item;

  if (!topCarousels) {
    return [];
  }

  return topCarousels
    .filter((item) => item !== undefined)
    .map((item) => ({
      slug: item.sys.id || "",
      title: resolveModel(item.sys.contentType.sys.id).name,
      contentType: resolveModel(item.sys.contentType.sys.id).id,
      content: item.fields.title || item.fields.name || "",
      image: item.fields.image
        ? item.fields.image
            .filter((img) => img !== null && img !== undefined)
            .map(transformAsset)[0]
        : null,
    }));
};

type Category = {
  slug: string;
  title: string;
};

export type AllActiveCategories = {
  activityCategory: Category[];
  spotCategory: Category[];
  itemCategory: Category[];
  researchCategory: Category[];
  fictionCategory: Category[];
  memberCategory: Category[];
};

export const allActiveCategories = async (): Promise<AllActiveCategories> => {
  const activityCategory = await activityCategoryHasItems();
  const spotCategory = await spotCategoryHasItems();
  const itemCategory = await itemCategoryHasItems();
  const researchCategory = await researchCategoryHasItems();
  const fictionCategory = await fictionCategoryHasItems();
  const memberCategory = await memberCategoryHasItems();

  return {
    activityCategory,
    spotCategory,
    itemCategory,
    researchCategory,
    fictionCategory,
    memberCategory,
  };
};
