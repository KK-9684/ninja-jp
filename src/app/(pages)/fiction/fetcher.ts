import { getEntries, getEntry } from "@/lib/contentful/client";
import {
  CategoryEntrySkeleton,
  categoryPerItems,
  WriterEntrySkeleton,
} from "@/lib/contentful/sharedModel";
import { transformAsset } from "@/lib/contentful/transformContent";
import { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { ItemSkeleton } from "../item/fetcher";

export type Fiction = FictionCore & {
  content: never;
  writer: {
    name: string;
    content: never;
  } | null;
  relationKeyword: {
    slug: string | undefined;
    title: string | undefined;
  }[];
  relationItemIds: string[];
};

export type FictionCore = {
  slug: string;
  title: string;
  image: {
    url: string;
    alt: string;
  }[];
  category: {
    slug: string | undefined;
    title: string;
  }[];
  createdAt: string;
};

type FictionCategoryEntrySkeleton = CategoryEntrySkeleton & {
  contentTypeId: "cultureCategory";
};

type RelationKeywordSkeleton = EntrySkeletonType & {
  contentTypeId: "relationKeyword";
  fields: {
    title: EntryFieldTypes.Symbol;
  };
};

type Fields = EntrySkeletonType & {
  title: EntryFieldTypes.Symbol;
  createdAt: EntryFieldTypes.Date;
  content: Document;
  category?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<FictionCategoryEntrySkeleton>
  >;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  relationKeyword?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<RelationKeywordSkeleton>
  >;
  writer?: EntryFieldTypes.EntryLink<WriterEntrySkeleton>;
  relationItem?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ItemSkeleton>>;
};

export type FictionSkeleton = EntrySkeletonType<Fields> & {
  contentTypeId: "culture";
};

export type Query = {
  categories?: string[];
  page: number;
  relationKeyword?: string[];
  perPage?: number;
  tag?: string | null;
};

const transformContent = (
  entry: Entry<FictionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): Fiction => {
  const writer = entry.fields.writer
    ? {
        name: entry.fields.writer.fields.name,
        content: entry.fields.writer.fields.content,
      }
    : null;

  const relationItemIds = entry.fields.relationItem
    ? entry.fields.relationItem?.map((item) => item?.sys.id || "")
    : [];

  const relationKeyword = entry.fields.relationKeyword
    ? entry.fields.relationKeyword.map((keyword) => ({
        slug: keyword?.sys.id,
        title: keyword?.fields.title,
      }))
    : [];

  return {
    content: entry.fields.content,
    relationKeyword,
    writer,
    relationItemIds,
    ...transformPartialContent(entry),
  };
};

const transformPartialContent = (
  entry: Entry<FictionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): FictionCore => {
  const { title, image, category, createdAt } = entry.fields;

  const images = image
    ? image
        ?.filter((img) => img !== null && img !== undefined)
        .map(transformAsset)
    : [];

  const ct = category
    ? category?.map((ct) => ({
        slug: ct?.sys.id,
        title: ct?.fields.title || "",
      }))
    : [];

  return {
    slug: entry.sys.id,
    title,
    image: images,
    category: ct,
    createdAt,
  };
};

export const getFiction = async (id: string) => {
  try {
    const entry = await getEntry<FictionSkeleton>("culture", id);
    return transformContent(entry);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getFictionList = async (query: Query) => {
  const fallbackPerPage = 100;
  const skip = query.perPage ? (query.page - 1) * query.perPage : 0;

  const categoryParams =
    query.categories && query.categories.length > 0
      ? { "fields.category.sys.id[in]": query.categories.join(",") }
      : {};

  const relationKeywordParams =
    query.relationKeyword && query.relationKeyword.length > 0
      ? {
          "fields.relationKeyword.sys.id[in]": query.relationKeyword.join(","),
        }
      : {};

  const result = await getEntries<FictionSkeleton>({
    content_type: "culture",
    select: [
      "fields.title",
      "fields.image",
      "fields.category",
      "fields.relationKeyword",
    ],
    order: ["-fields.createdAt"],
    limit: query.perPage || fallbackPerPage,
    skip: skip,
    ...categoryParams,
    ...relationKeywordParams,
  });

  return {
    total: result.total,
    items: result.items.map((item) => transformPartialContent(item)),
  };
};

export const fictionCategoryPerItems = async (limit: number) => {
  const result = await categoryPerItems<FictionSkeleton>(
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
