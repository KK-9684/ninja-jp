import { getEntries, getEntry } from "@/lib/contentful/client";
import {
  CategoryEntrySkeleton,
  categoryPerItems,
  WriterEntrySkeleton,
} from "@/lib/contentful/sharedModel";
import { transformAsset } from "@/lib/contentful/transformContent";
import { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { TagEntrySkeleton } from "../tag/fetcher";
import { Document } from "@contentful/rich-text-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

type AreaEntrySkeleton = {
  contentTypeId: "area";
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
  };
};

type ActivityCategoryEntrySkeleton = CategoryEntrySkeleton & {
  contentTypeId: "activityCategory";
};

type ActivityRelationSpotEntrySkeleton = {
  contentTypeId: "relationSpot";
  fields: {
    title: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    area?: EntryFieldTypes.EntryLink<AreaEntrySkeleton>;
  };
};

export type Plan = {
  name?: string;
  price?: string;
  description?: string;
  url?: string;
};

type ActivityTagsEntrySkeleton = {
  contentTypeId: "tag";
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
  };
};

type Activity = EntrySkeletonType & {
  title: EntryFieldTypes.Symbol;
  createdAt: EntryFieldTypes.Date;
  price: EntryFieldTypes.Symbol;
  time: EntryFieldTypes.Symbol;
  content: Document;
  plans?: EntryFieldTypes.Object;
  category?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<ActivityCategoryEntrySkeleton>
  >;
  relationKeyword?: EntryFieldTypes.EntryLink<TagEntrySkeleton>;
  relationSpot?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<ActivityRelationSpotEntrySkeleton>
  >;
  tag: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<ActivityTagsEntrySkeleton>
  >;
  relationActivity?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<ActivitySkeleton>
  >;
  relationArea?: EntryFieldTypes.AssetLink;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  writer?: EntryFieldTypes.EntryLink<WriterEntrySkeleton>;
};

export type ActivitySkeleton = EntrySkeletonType<Activity> & {
  contentTypeId: "activity";
};

const transformContent = (
  entry: Entry<ActivitySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const relationSpotIds = entry.fields.relationSpot?.map(
    (spot) => spot?.sys.id || ""
  );
  const relationActivityIds =
    entry.fields.relationActivity
      ?.filter(
        (activity): activity is NonNullable<typeof activity> => activity != null
      )
      .map((activity) => activity.sys.id) || [];

  const writer = entry.fields.writer
    ? {
        name: entry.fields.writer.fields.name,
        content: entry.fields.writer.fields.content,
      }
    : null;

  const plans = entry.fields.plans ? entry.fields.plans : [];

  const content = entry.fields.content as Document;
  const metaDescription = documentToPlainTextString(content).slice(0, 80);

  return {
    content: entry.fields.content,
    relationSpotIds,
    relationActivityIds,
    writer,
    plans,
    metaDescription,
    ...transformPartialContent(entry),
  };
};

const transformPartialContent = (
  entry: Entry<ActivitySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const { title, price, time, category, image, relationArea } = entry.fields;

  const categories = category?.map((ct) => ({
    slug: ct?.sys.id,
    title: ct?.fields.title || "",
  }));

  const tag = entry.fields.tag?.map((tg) => ({
    slug: tg?.sys.id,
    title: tg?.fields.title || "",
  }));

  const images = image
    ?.filter((img) => img !== null && img !== undefined)
    .map(transformAsset);

  const area = relationArea ? relationArea.fields.title : null;

  return {
    slug: entry.sys.id,
    title,
    price,
    time,
    category: categories,
    image: images,
    area,
    tag,
  };
};

export const getAreaList = async () => {
  const result = await getEntries<AreaEntrySkeleton>({
    content_type: "area",
    select: ["fields.title", "fields.slug"],
    order: ["sys.createdAt"],
  });

  return {
    total: result.total,
    items: result.items.map((area) => ({
      slug: area.sys.id,
      title: area.fields.title,
    })),
  };
};

export type ActivityListQuery = {
  categories?: string[];
  area?: string[];
  tag?: string;
  page: number;
  perPage?: number;
};

export const getActivity = async (id: string) => {
  try {
    const activity = await getEntry<ActivitySkeleton>("activity", id);

    return transformContent(activity);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getActivityList = async (query: ActivityListQuery) => {
  const fallbackPerPage = 100;
  const skip = query.perPage ? (query.page - 1) * query.perPage : 0;
  const categoryParams =
    query.categories && query.categories.length > 0
      ? { "fields.category.sys.id[in]": query.categories.join(",") }
      : {};

  const areaParams =
    query.area && query.area.length > 0
      ? { "fields.relationArea.sys.id[in]": query.area.join(",") }
      : {};
  const tagParams = query.tag
    ? { "fields.relationKeyword.sys.id": query.tag }
    : {};
  const result = await getEntries<ActivitySkeleton>({
    content_type: "activity",
    select: [
      "fields.title",
      "fields.createdAt",
      "fields.time",
      "fields.price",
      "fields.category",
      "fields.relationArea",
      "fields.image",
      "fields.tag",
    ],
    order: ["-fields.createdAt"],
    limit: query.perPage || fallbackPerPage,
    skip: skip,
    ...categoryParams,
    ...areaParams,
    ...tagParams,
  });

  return {
    total: result.total,
    items: result.items.map((activity) => transformPartialContent(activity)),
  };
};

export const getRelationActivity = async (ids: string[], limit?: number) => {
  const fallbackPerPage = 3;
  const result = await getEntries<ActivitySkeleton>({
    content_type: "activity",
    select: [
      "fields.title",
      "fields.createdAt",
      "fields.time",
      "fields.price",
      "fields.category",
      "fields.relationArea",
      "fields.relationArea",
      "fields.image",
      "fields.tag",
    ],
    order: ["-fields.createdAt"],
    limit: limit || fallbackPerPage,
    "sys.id[in]": ids,
  });

  return {
    total: result.total,
    items: result.items.map((activity) => transformPartialContent(activity)),
  };
};

export const activityCategoryHasItems = async () => {
  const result = await categoryPerItems<ActivitySkeleton>(
    "activityCategory",
    1
  );

  return result
    .filter((item) => item.total > 0)
    .map((item) => {
      return { slug: item.slug, title: item.title };
    });
};
