import { EntryFieldTypes, EntrySkeletonType } from "contentful";
import { getEntries } from "./client";
import { transformAsset } from "./transformContent";

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

type CarouselLinkEntry = {
  contentTypeId: "topCarousel";
  fields: {
    title: EntryFieldTypes.Symbol;
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
      return { id: "culture", name: "創作作品" };
    case "member":
      return { id: "ninja", name: "現代忍者" };
    case "magazine":
      return { id: "magazine", name: "マガジン" };
    default:
      return { id: "activity", name: "アクティビティ" };
  }
};
export const getLinkEntries = async () => {
  const result = await getEntries<CarouselLinkEntrySkeleton>({
    content_type: "topCarousel",
    order: ["-sys.createdAt"],
  });

  const items = result.items[0].fields.item;

  if (!items) {
    return { total: 0, items: [] };
  }

  return {
    total: result.total,
    items: items.map((item) => ({
      // model: resolveModel(item?.sys.contentType.sys.id),
      slug: item?.sys.id,
      title: item?.fields.title || "",
      image: item?.fields.image
        ?.filter((img) => img !== null && img !== undefined)
        .map(transformAsset),
    })),
  };
};
