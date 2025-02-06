import { getEntries, getEntry } from "@/lib/contentful/client";
import {
  CategoryEntrySkeleton,
  WriterEntrySkeleton,
} from "@/lib/contentful/sharedModel";
import { transformAsset } from "@/lib/contentful/transformContent";
import { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { TagEntrySkeleton } from "../tag/fetcher";

type ItemCategoryEntrySkeleton = CategoryEntrySkeleton & {
  contentTypeId: "itemCategory";
};

type Item = EntrySkeletonType & {
  title: EntryFieldTypes.Symbol;
  createdAt: EntryFieldTypes.Date;
  price: EntryFieldTypes.Symbol;
  content: Document;
  item?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<ItemCategoryEntrySkeleton>
  >; // カテゴリだけどIDがitemになっている
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  writer?: EntryFieldTypes.EntryLink<WriterEntrySkeleton>;
  relationKeyword?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TagEntrySkeleton>
  >;
};

export type ItemSkeleton = EntrySkeletonType<Item> & {
  contentTypeId: "item";
};

export type Query = {
  categories?: string[];
  tag?: string;
  page: number;
  perPage?: number;
};

const transformContent = (
  entry: Entry<ItemSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const writer = entry.fields.writer
    ? {
        name: entry.fields.writer.fields.name,
        summary: entry.fields.writer.fields.content,
      }
    : null;

  const relationKeyword = entry.fields.relationKeyword
    ? entry.fields.relationKeyword.map((keyword) => ({
        slug: keyword?.sys.id,
        title: keyword?.fields.title,
      }))
    : [];

  return {
    content: entry.fields.content,
    writer,
    relationKeyword,
    ...transformPartialContent(entry),
  };
};

const transformPartialContent = (
  entry: Entry<ItemSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const { title, image, item, price } = entry.fields;

  const images = image
    ?.filter((img) => img !== null && img !== undefined)
    .map(transformAsset);

  const ct = item?.map((ct) => ({
    slug: ct?.sys.id,
    title: ct?.fields.title || "",
  }));

  return {
    slug: entry.sys.id,
    title,
    price,
    image: images,
    category: ct,
  };
};

export const getItem = async (id: string) => {
  try {
    const entry = await getEntry<ItemSkeleton>("item", id);

    return transformContent(entry);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getItemList = async (query: Query) => {
  const fallbackPerPage = 100;
  const skip = query.perPage ? (query.page - 1) * query.perPage : 0;
  const categoryParams =
    query.categories && query.categories.length > 0
      ? { "fields.item.sys.id[in]": query.categories.join(",") }
      : {};

  const tagParams = query.tag
    ? { "fields.relationKeyword.sys.id": query.tag }
    : {};

  const result = await getEntries<ItemSkeleton>({
    content_type: "item",
    select: ["fields.title", "fields.image", "fields.item", "fields.price"],
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

export const getRelationItem = async (ids: string[], limit?: number) => {
  const fallbackPerPage = 3;
  const result = await getEntries<ItemSkeleton>({
    content_type: "item",
    select: ["fields.title", "fields.image", "fields.item", "fields.price"],
    order: ["-fields.createdAt"],
    "sys.id[in]": ids,
    limit: limit || fallbackPerPage,
  });

  return {
    total: result.total,
    items: result.items.map((item) => transformPartialContent(item)),
  };
};
