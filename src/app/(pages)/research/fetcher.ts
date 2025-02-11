import { getEntries, getEntry } from "@/lib/contentful/client";
import { transformAsset } from "@/lib/contentful/transformContent";
import { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { ActivitySkeleton } from "../activity/fetcher";
import { ItemSkeleton } from "../item/fetcher";
import {
  CategoryEntrySkeleton,
  categoryPerItems,
  WriterEntrySkeleton,
} from "@/lib/contentful/sharedModel";
import { TagEntrySkeleton } from "../tag/fetcher";

type ResearchCategoryEntrySkeleton = CategoryEntrySkeleton & {
  contentTypeId: "researchCategory";
};

type Research = EntrySkeletonType & {
  title: EntryFieldTypes.Symbol;
  createdAt: EntryFieldTypes.Date;
  content: Document;
  summary: EntryFieldTypes.Symbol;
  category?: EntryFieldTypes.EntryLink<ResearchCategoryEntrySkeleton>;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  writer?: EntryFieldTypes.EntryLink<WriterEntrySkeleton>;
  relationKeyword?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TagEntrySkeleton>
  >;
  relationItem?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ItemSkeleton>>;
  relationActivity?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<ActivitySkeleton>
  >;
};

type ResearchSkeleton = EntrySkeletonType<Research> & {
  contentTypeId: "research";
};

export type Query = {
  categories?: string[];
  page: number;
  tag?: string;
  perPage?: number;
};

const transformContent = (
  entry: Entry<ResearchSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
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

  const relationItemIds = entry.fields.relationItem?.map(
    (activity) => activity?.sys.id || ""
  );

  const relationKeyword = entry.fields.relationKeyword
    ? entry.fields.relationKeyword.map((keyword) => ({
        slug: keyword?.sys.id,
        title: keyword?.fields.title,
      }))
    : [];

  return {
    writer,
    relationActivityIds,
    relationItemIds,
    relationKeyword,
    ...transformPartialContent(entry),
  };
};

const transformPartialContent = (
  entry: Entry<ResearchSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const { title, image, category, summary } = entry.fields;

  const images = image
    ?.filter((img) => img !== null && img !== undefined)
    .map(transformAsset);

  const ct = {
    slug: category?.sys.id,
    title: category?.fields.title || "",
  };

  return {
    slug: entry.sys.id,
    title,
    summary,
    image: images,
    category: ct,
    content: entry.fields.content,
  };
};

export const getResearch = async (id: string) => {
  try {
    const entry = await getEntry<ResearchSkeleton>("research", id);

    return transformContent(entry);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getResearchList = async (query: Query) => {
  const fallbackPerPage = 100;
  const skip = query.perPage ? (query.page - 1) * query.perPage : 0;
  const categoryParams =
    query.categories && query.categories.length > 0
      ? { "fields.category.sys.id[in]": query.categories.join(",") }
      : {};
  const tagParams = query.tag
    ? { "fields.relationKeyword.sys.id": query.tag }
    : {};
  const result = await getEntries<ResearchSkeleton>({
    content_type: "research",
    select: [
      "fields.title",
      "fields.image",
      "fields.category",
      "fields.summary",
    ],
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

export const researchCategoryHasItems = async () => {
  const result = await categoryPerItems<ResearchSkeleton>(
    "researchCategory",
    1
  );

  return result
    .filter((item) => item.total > 0)
    .map((item) => {
      return { slug: item.slug, title: item.title };
    });
};
