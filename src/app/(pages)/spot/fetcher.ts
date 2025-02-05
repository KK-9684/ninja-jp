import { getEntries, getEntry } from "@/lib/contentful/client";
import { transformAsset } from "@/lib/contentful/transformContent";
import { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { ActivitySkeleton } from "../activity/fetcher";
import {
  CategoryEntrySkeleton,
  categoryPerItems,
  WriterEntrySkeleton,
} from "@/lib/contentful/sharedModel";
import { TagEntrySkeleton } from "../tag/fetcher";

type SpotCategoryEntrySkeleton = CategoryEntrySkeleton & {
  contentTypeId: "spotCategory";
};

type Spot = EntrySkeletonType & {
  title: EntryFieldTypes.Symbol;
  createdAt: EntryFieldTypes.Date;
  content: Document;
  area?: EntryFieldTypes.AssetLink;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  writer?: EntryFieldTypes.EntryLink<WriterEntrySkeleton>;
  category?: EntryFieldTypes.EntryLink<SpotCategoryEntrySkeleton>;
  relationActivity?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<ActivitySkeleton>
  >;
  relationKeyword?: EntryFieldTypes.EntryLink<TagEntrySkeleton>;
};

type SpotSkeleton = EntrySkeletonType<Spot> & {
  contentTypeId: "spot";
};

export type Query = {
  categories?: string[];
  area?: string[];
  tag?: string;
  page: number;
  perPage?: number;
};

const transformContent = (
  entry: Entry<SpotSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const writer = entry.fields.writer
    ? {
        name: entry.fields.writer.fields.name,
        content: entry.fields.writer.fields.content,
      }
    : null;

  const relationActivityIds = entry.fields.relationActivity?.map(
    (activity) => activity?.sys.id || ""
  );

  const relationKeyword =
    entry.fields.relationKeyword
      ?.filter(
        (keyword): keyword is NonNullable<typeof keyword> => keyword != null
      )
      .map((keyword) => ({
        slug: keyword.sys.id,
        title: keyword.fields.title || "",
      })) || null;

  return {
    content: entry.fields.content,
    writer,
    relationActivityIds,
    relationKeyword,
    ...transformPartialContent(entry),
  };
};

const transformPartialContent = (
  entry: Entry<SpotSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const { title, image, area, category } = entry.fields;

  const images = image
    ?.filter((img) => img !== null && img !== undefined)
    .map(transformAsset);

  const parsedArea = area ? area.fields.title : null;

  return {
    slug: entry.sys.id,
    title,
    image: images,
    area: parsedArea,

    category: {
      slug: category?.sys.id,
      title: category?.fields.title || "",
    },
  };
};

export const getSpot = async (id: string) => {
  try {
    const entry = await getEntry<SpotSkeleton>("spot", id);

    return transformContent(entry);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSpotList = async (query: Query) => {
  const fallbackPerPage = 100;
  const skip = query.perPage ? (query.page - 1) * query.perPage : 0;
  const areaParams =
    query.area && query.area.length > 0
      ? { "fields.area.sys.id[in]": query.area.join(",") }
      : {};

  const tagParams = query.tag
    ? { "fields.relationKeyword.sys.id": query.tag }
    : {};

  const categoryParams =
    query.categories && query.categories.length > 0
      ? { "fields.category.sys.id[in]": query.categories.join(",") }
      : {};

  const result = await getEntries<SpotSkeleton>({
    content_type: "spot",
    select: ["fields.title", "fields.image", "fields.area", "fields.category"],
    order: ["-fields.createdAt"],
    limit: query.perPage || fallbackPerPage,
    skip: skip,
    ...categoryParams,
    ...areaParams,
    ...tagParams,
  });

  return {
    total: result.total,
    items: result.items.map((item) => transformPartialContent(item)),
  };
};

export const getRelationSpot = async (ids: string[], limit?: number) => {
  const fallbackPerPage = 3;
  const result = await getEntries<SpotSkeleton>({
    content_type: "spot",
    select: ["fields.title", "fields.image", "fields.area", "fields.category"],
    order: ["-fields.createdAt"],
    "sys.id[in]": ids,
    limit: limit || fallbackPerPage,
  });

  return {
    total: result.total,
    items: result.items.map((item) => transformPartialContent(item)),
  };
};

export const spotCategoryPerItems = async (limit: number) => {
  const result = await categoryPerItems<SpotSkeleton>("spotCategory", limit);

  return result
    .filter((item) => item.total > 0)
    .map((item) => {
      return {
        ...item,
        items: item.items.map((item) => transformPartialContent(item)),
      };
    });
};
