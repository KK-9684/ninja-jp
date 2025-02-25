import { getEntries, getEntry } from "@/lib/contentful/client";
import {
  CategoryEntrySkeleton,
  categoryPerItems,
} from "@/lib/contentful/sharedModel";
import { transformAsset } from "@/lib/contentful/transformContent";
import { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Asset } from "contentful";

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
  writer?: EntryFieldTypes.EntryLink<Writer>;
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
        name:
          typeof entry.fields.writer.fields.name === "string"
            ? entry.fields.writer.fields.name
            : "", // `string` 以外は空文字をセット
        summary:
          typeof entry.fields.writer.fields.summary === "string"
            ? entry.fields.writer.fields.summary
            : "",
        slug: entry.fields.writer.sys.id,
        xUrl:
          typeof entry.fields.writer.fields.snsXUrl === "string"
            ? entry.fields.writer.fields.snsXUrl
            : null,
        instagramUrl:
          typeof entry.fields.writer.fields.snsInstagramUrl === "string"
            ? entry.fields.writer.fields.snsInstagramUrl
            : null,
        youtubeUrl:
          typeof entry.fields.writer.fields.snsYoutubeUrl === "string"
            ? entry.fields.writer.fields.snsYoutubeUrl
            : null,
        facebookUrl:
          typeof entry.fields.writer.fields.snsFacebookUrl === "string"
            ? entry.fields.writer.fields.snsFacebookUrl
            : null,
        image: Array.isArray(entry.fields.writer.fields.image)
          ? entry.fields.writer.fields.image
              .filter(
                (img): img is Asset<"WITHOUT_UNRESOLVABLE_LINKS", string> =>
                  typeof img === "object" && img !== null && "fields" in img
              )
              .map(transformAsset)
          : [],
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
  try {
    // デフォルト値と値の整理
    const fallbackPerPage = 12;
    const currentPage = Math.max(1, query.page || 1);
    const perPage = query.perPage || fallbackPerPage;
    const skip = (currentPage - 1) * perPage;

    // フィルターパラメータの整理と検証
    const validCategories = Array.isArray(query.categories)
      ? query.categories.filter(Boolean)
      : [];

    const validAreas = Array.isArray(query.area)
      ? query.area.filter(Boolean)
      : [];

    const validTag =
      typeof query.tag === "string" && query.tag.trim() !== ""
        ? query.tag.trim()
        : "";

    console.log("Processed query parameters:", {
      page: currentPage,
      perPage,
      skip,
      categories: validCategories,
      areas: validAreas,
      tag: validTag,
    });

    // 基本クエリパラメータ
    const queryParams: Record<string, string | number | string[]> = {
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
      limit: perPage,
      skip: skip,
    };

    // フィルター条件を追加
    if (validCategories.length > 0) {
      queryParams["fields.category.sys.id[in]"] = validCategories.join(",");
    }

    if (validAreas.length > 0) {
      queryParams["fields.relationArea.sys.id[in]"] = validAreas.join(",");
    }

    if (validTag) {
      queryParams["fields.tag.sys.id"] = validTag;
    }

    // クエリパラメータをログ出力
    console.log("Contentful query parameters:", JSON.stringify(queryParams));

    // データ取得
    const result = await getEntries<ActivitySkeleton>(queryParams);

    // 結果の変換
    return {
      total: result.total,
      items: result.items.map((activity) => transformPartialContent(activity)),
    };
  } catch (error) {
    // エラーハンドリング
    console.error("Error fetching activity list:", error);

    // エラー発生時はデフォルト値を返す
    return {
      total: 0,
      items: [],
    };
  }
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
