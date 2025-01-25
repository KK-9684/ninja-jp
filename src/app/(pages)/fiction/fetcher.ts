import { getEntries, getEntry } from "@/lib/contentful/client";
import {
  CategoryEntrySkeleton,
  categoryPerItems,
  WriterEntrySkeleton,
} from "@/lib/contentful/sharedModel";
import { transformAsset } from "@/lib/contentful/transformContent";
import { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { TagEntrySkeleton } from "../tag/fetcher";
import { ItemSkeleton } from "../item/fetcher";

type CultureCategoryEntrySkeleton = CategoryEntrySkeleton & {
  contentTypeId: "cultureCategory";
};

type Culture = EntrySkeletonType & {
  title: EntryFieldTypes.Symbol;
  createdAt: EntryFieldTypes.Date;
  content: Document;
  category?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<CultureCategoryEntrySkeleton>
  >;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  relationKeyword?: EntryFieldTypes.EntryLink<TagEntrySkeleton>;
  writer?: EntryFieldTypes.EntryLink<WriterEntrySkeleton>;
  relationItem?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ItemSkeleton>>;
};

export type CultureSkeleton = EntrySkeletonType<Culture> & {
  contentTypeId: "culture";
};

export type Query = {
  categories?: string[];
  page: number;
  tag?: string;
  perPage?: number;
};

const transformContent = (
  entry: Entry<CultureSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const writer = entry.fields.writer
    ? {
        name: entry.fields.writer.fields.name,
        content: entry.fields.writer.fields.content,
      }
    : null;

  const relationItemIds = entry.fields.relationItem?.map(
    (activity) => activity?.sys.id || ""
  );

  return {
    content: entry.fields.content,
    tag: entry.fields.relationKeyword?.fields.title || "",
    writer,
    relationItemIds,
    ...transformPartialContent(entry),
  };
};

const transformPartialContent = (
  entry: Entry<CultureSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const { title, image, category } = entry.fields;

  const images = image
    ?.filter((img) => img !== null && img !== undefined)
    .map(transformAsset);

  const ct = category?.map((ct) => ({
    slug: ct?.sys.id,
    title: ct?.fields.title || "",
  }));

  return {
    slug: entry.sys.id,
    title,
    image: images,
    category: ct,
  };
};

export const getCulture = async (id: string) => {
  try {
    const entry = await getEntry<CultureSkeleton>("culture", id);

    return transformContent(entry);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCultureList = async (query: Query) => {
  const fallbackPerPage = 100;
  const skip = query.perPage ? (query.page - 1) * query.perPage : 0;
  const categoryParams =
    query.categories && query.categories.length > 0
      ? { "fields.category.sys.id[in]": query.categories.join(",") }
      : {};
  const tagParams = query.tag
    ? { "fields.relationKeyword.sys.id": query.tag }
    : {};
  const result = await getEntries<CultureSkeleton>({
    content_type: "culture",
    select: ["fields.title", "fields.image", "fields.category"],
    order: ["-fields.createdAt"],
    limit: query.perPage || fallbackPerPage,
    skip: skip,
    ...categoryParams,
    ...tagParams,
  });

  return {
    total: result.total,
    items: result.items.map((item) => transformPartialContent(item)),
  };
};

export const cultureCategoryPerItems = async (limit: number) => {
  const result = await categoryPerItems<CultureSkeleton>(
    "cultureCategory",
    limit
  );

  return result
    .filter((item) => item.total > 0)
    .map((item) => {
      return {
        ...item,
        items: item.items.map((item) => transformPartialContent(item)),
      };
    });
};
