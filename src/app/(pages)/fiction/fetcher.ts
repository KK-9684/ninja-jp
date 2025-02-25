import { getEntries, getEntry } from "@/lib/contentful/client";
import {
  CategoryEntrySkeleton,
  categoryPerItems,
} from "@/lib/contentful/sharedModel";
import { Asset, Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { ItemSkeleton } from "../item/fetcher";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

export const transformAsset = (
  asset: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const url = asset.fields.file?.url ?? "";
  return {
    url: url.startsWith("//") ? `https:${url}` : url,
    alt: typeof asset.fields.title === "string" ? asset.fields.title : "",
  };
};

export type Fiction = FictionCore & {
  content: never;
  writer: {
    name: string;
    summary: string;
    slug: string;
    xUrl: string | null;
    instagramUrl: string | null;
    youtubeUrl: string | null;
    facebookUrl: string | null;
    image: {
      url: string;
      alt: string;
    }[];
  } | null;
  relationKeyword: {
    slug: string | undefined;
    title: string | undefined;
  }[];
  relationItemIds: string[];
  metaDescription: string;
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

type Writer = EntrySkeletonType & {
  name: EntryFieldTypes.Symbol;
  content: EntryFieldTypes.Text;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink> | null;
  slug: EntryFieldTypes.Symbol;
  snsXUrl?: EntryFieldTypes.Symbol;
  summary: EntryFieldTypes.Text;
  snsInstagramUrl: EntryFieldTypes.Symbol;
  snsYoutubeUrl: EntryFieldTypes.Symbol;
  snsFacebookUrl: EntryFieldTypes.Symbol;
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
  writer?: EntryFieldTypes.EntryLink<Writer>;
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
  const relationItemIds = entry.fields.relationItem
    ? entry.fields.relationItem?.map((item) => item?.sys.id || "")
    : [];

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
    relationKeyword,
    writer,
    relationItemIds,
    metaDescription,
    ...transformPartialContent(entry),
  };
};
const transformPartialContent = (
  entry: Entry<FictionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): FictionCore => {
  if (!entry || !entry.fields) {
    throw new Error("Invalid entry data");
  }
  const { title, category, createdAt, image } = entry.fields;

  const images = image
    ? image
        .filter(
          (img): img is Asset<"WITHOUT_UNRESOLVABLE_LINKS", string> =>
            typeof img === "object" && img !== null && "fields" in img
        )
        .map((img) =>
          transformAsset(img as Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>)
        )
    : [];

  const ct = Array.isArray(category)
    ? category.map((ct) => ({
        slug: ct?.sys?.id || "",
        title: ct?.fields?.title || "不明",
      }))
    : [];

  return {
    slug: entry.sys.id,
    title,
    image: images, // 正しい画像データを使用
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
  try {
    const fallbackPerPage = 12;
    const perPage = query.perPage || fallbackPerPage;
    const currentPage = Math.max(1, query.page || 1);
    const skip = (currentPage - 1) * perPage;

    // フィルターパラメータの整理と検証
    const validCategories = Array.isArray(query.categories)
      ? query.categories.filter(Boolean)
      : [];

    const validRelationKeyword = Array.isArray(query.relationKeyword)
      ? query.relationKeyword.filter(Boolean)
      : [];

    console.log("Processed query parameters:", {
      page: currentPage,
      perPage,
      skip,
      categories: validCategories,
      relationKeyword: validRelationKeyword,
    });

    // 基本クエリパラメータ
    const queryParams: Record<string, string | number | string[]> = {
      content_type: "culture",
      select: [
        "fields.title",
        "fields.image",
        "fields.category",
        "fields.relationKeyword",
      ],
      order: ["-fields.createdAt"],
      limit: perPage,
      skip: skip,
    };

    // フィルター条件を追加
    if (validCategories.length > 0) {
      queryParams["fields.category.sys.id[in]"] = validCategories.join(",");
    }

    if (validRelationKeyword.length > 0) {
      queryParams["fields.relationKeyword.sys.id[in]"] =
        validRelationKeyword.join(",");
    }

    // クエリパラメータをログ出力
    console.log("Contentful query parameters:", JSON.stringify(queryParams));

    const result = await getEntries<FictionSkeleton>(queryParams);

    const transformedItems: FictionCore[] = result.items.map((item) =>
      transformPartialContent(item)
    );

    return {
      total: result.total,
      items: transformedItems as FictionCore[],
    };
  } catch (error) {
    console.error("Error fetching fiction list:", error);

    // エラー発生時はデフォルト値を返す
    return {
      total: 0,
      items: [],
    };
  }
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

export const fictionCategoryHasItems = async () => {
  const result = await categoryPerItems<FictionSkeleton>("cultureCategory", 1);

  return result
    .filter((item) => item.total > 0)
    .map((item) => {
      return { slug: item.slug, title: item.title };
    });
};
