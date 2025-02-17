import { getEntries, getEntry } from "@/lib/contentful/client";
import { transformAsset } from "@/lib/contentful/transformContent";
import { Asset, Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { ActivitySkeleton } from "../activity/fetcher";
import {
  CategoryEntrySkeleton,
  categoryPerItems,
} from "@/lib/contentful/sharedModel";
import { TagEntrySkeleton } from "../tag/fetcher";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

type SpotCategoryEntrySkeleton = CategoryEntrySkeleton & {
  contentTypeId: "spotCategory";
};

type Writer = EntrySkeletonType & {
  name: EntryFieldTypes.Symbol;
  content: EntryFieldTypes.Text;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  slug: EntryFieldTypes.Symbol;
  snxXUrl?: EntryFieldTypes.Symbol;
  summary: EntryFieldTypes.Text;
  snsInstagramUrl: EntryFieldTypes.Symbol;
  snsYoutubeUrl: EntryFieldTypes.Symbol;
  snsFacebookUrl: EntryFieldTypes.Symbol;
};

type Spot = EntrySkeletonType & {
  title: EntryFieldTypes.Symbol;
  price: EntryFieldTypes.Symbol;
  createdAt: EntryFieldTypes.Date;
  content: Document;
  area?: EntryFieldTypes.AssetLink;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  writer?: EntryFieldTypes.EntryLink<Writer>;
  category?: EntryFieldTypes.EntryLink<SpotCategoryEntrySkeleton>;
  relationActivity?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<ActivitySkeleton>
  >;
  relationKeyword?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TagEntrySkeleton>
  >;
  map?: EntryFieldTypes.Location; // 追加: Location型のmapフィールド
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
        summary: entry.fields.writer.fields.summary,
        slug: entry.fields.writer.sys.id,
        xUrl: entry.fields.writer.fields.snsXUrl || null,
        instagramUrl: entry.fields.writer.fields.snsInstagramUrl || null,
        youtubeUrl: entry.fields.writer.fields.snsYoutubeUrl || null,
        facebookUrl: entry.fields.writer.fields.snsFacebookUrl || null,
        image: Array.isArray(entry.fields.writer.fields.image)
          ? entry.fields.writer.fields.image
              .filter(
                (img): img is Asset<"WITHOUT_UNRESOLVABLE_LINKS", string> =>
                  img !== null && img !== undefined
              )
              .map(transformAsset)
          : [],
      }
    : null;

  const relationActivityIds = entry.fields.relationActivity?.map(
    (activity) => activity?.sys.id || ""
  );

  const relationKeyword = entry.fields.relationKeyword
    ? entry.fields.relationKeyword.map((keyword) => ({
        slug: keyword?.sys.id,
        title: keyword?.fields.title,
      }))
    : [];

  const metaDescription = documentToPlainTextString(entry.fields.content).slice(
    0,
    80
  );

  return {
    content: entry.fields.content,
    writer,
    relationActivityIds,
    relationKeyword,
    metaDescription,
    ...transformPartialContent(entry),
  };
};

const transformPartialContent = (
  entry: Entry<SpotSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const { title, image, area, category, map } = entry.fields;

  const images = image
    ?.filter((img) => img !== null && img !== undefined)
    .map(transformAsset);

  const parsedArea = area ? area.fields.title : null;

  // mapフィールドの変換処理を追加
  const location = map
    ? {
        lat: map.lat,
        lon: map.lon,
      }
    : null;

  return {
    slug: entry.sys.id,
    title,
    price: entry.fields.price,
    image: images,
    area: parsedArea,
    location, // 位置情報を追加
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
    select: [
      "fields.title",
      "fields.price",
      "fields.image",
      "fields.area",
      "fields.category",
      "fields.map", // mapフィールドを追加
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
    items: result.items.map((item) => transformPartialContent(item)),
  };
};

export const getRelationSpot = async (ids: string[], limit?: number) => {
  const fallbackPerPage = 3;
  const result = await getEntries<SpotSkeleton>({
    content_type: "spot",
    select: [
      "fields.title",
      "fields.price",
      "fields.image",
      "fields.area",
      "fields.category",
      "fields.map", // mapフィールドを追加
    ],
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

export const spotCategoryHasItems = async () => {
  const result = await categoryPerItems<SpotSkeleton>("spotCategory", 1);

  return result
    .filter((item) => item.total > 0)
    .map((item) => {
      return { slug: item.slug, title: item.title };
    });
};
