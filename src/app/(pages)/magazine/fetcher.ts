import { getEntries, getEntry } from "@/lib/contentful/client";
import {
  CategoryEntrySkeleton,
  categoryPerItems,
} from "@/lib/contentful/sharedModel";
import { transformAsset } from "@/lib/contentful/transformContent";
import { Asset, Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { differenceInDays } from "date-fns";
import { TagEntrySkeleton } from "../tag/fetcher";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

export type MagazineCore = {
  slug: string;
  title: string;
  summary: string;
  image: {
    url: string;
    alt: string;
  }[];
  isNew: boolean;
  content: never;
  createdAt: string;
  category: {
    slug: string | undefined;
    title: string;
  }[];
};

export type Magazine = MagazineCore & {
  writer: {
    name: string;
    content: never;
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
  metaDescription: string;
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

type MagazineCategoryEntrySkeleton = CategoryEntrySkeleton & {
  contentTypeId: "magazineCategory";
};

type Fields = EntrySkeletonType & {
  title: EntryFieldTypes.Symbol;
  summary: EntryFieldTypes.Text;
  createdAt: EntryFieldTypes.Date;
  content: Document;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  relationKeyword?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TagEntrySkeleton>
  >;
  category?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<MagazineCategoryEntrySkeleton>
  >;
  writer?: EntryFieldTypes.EntryLink<Writer>;
};

type MagazineSkeleton = EntrySkeletonType<Fields> & {
  contentTypeId: "magazine";
};

export type Query = {
  categories: string[];
  tag: string;
  page: number;
  perPage?: number;
};

const formatCreatedAt = (
  at: `${number}-${number}-${number}T${number}:${number}:${number}Z`
) => {
  const date = new Date(at);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const transformContent = (
  entry: Entry<MagazineSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): Magazine => {
  const writer = entry.fields.writer
    ? {
        name: String(entry.fields.writer.fields.name || ""), // 文字列型に変換
        content: entry.fields.writer.fields.content as never,
        summary: String(entry.fields.writer.fields.summary || ""),
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
                  img !== null && img !== undefined
              )
              .map(transformAsset)
          : [],
      }
    : null;

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
    writer,
    relationKeyword,
    metaDescription,
    ...transformPartialContent(entry),
  };
};

const transformPartialContent = (
  entry: Entry<MagazineSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): MagazineCore => {
  const { title, summary, image, category, createdAt, content } = entry.fields;

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

  const isNew = differenceInDays(new Date(), new Date(createdAt)) <= 14;

  return {
    slug: entry.sys.id,
    title,
    summary,
    image: images,
    isNew,
    content,
    createdAt: formatCreatedAt(createdAt),
    category: ct,
  };
};

export const getMagazine = async (id: string) => {
  try {
    const entry = await getEntry<MagazineSkeleton>("magazine", id);

    return transformContent(entry);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMagazineList = async (query: Query) => {
  const fallbackPerPage = 100;
  const skip = query.perPage ? (query.page - 1) * query.perPage : 0;
  const tagParams = query.tag
    ? { "fields.relationKeyword.sys.id": query.tag }
    : {};

  const categoryParams =
    query.categories && query.categories.length > 0
      ? { "fields.category.sys.id[in]": query.categories.join(",") }
      : {};
  const result = await getEntries<MagazineSkeleton>({
    content_type: "magazine",
    select: [
      "fields.title",
      "fields.image",
      "fields.summary",
      "fields.category",
      "fields.createdAt",
      "fields.content",
    ],
    order: ["-fields.createdAt"],
    limit: query.perPage || fallbackPerPage,
    skip: skip,
    ...tagParams,
    ...categoryParams,
  });

  return {
    total: result.total,
    items: result.items.map((item) => transformPartialContent(item)),
  };
};

export const magazineCategoryPerItems = async (limit: number) => {
  const result = await categoryPerItems<MagazineSkeleton>(
    "magazineCategory",
    limit
  );

  return result
    .filter((res) => res.total > 0)
    .map((item) => {
      return {
        ...item,
        items: item.items.map((item) => transformPartialContent(item)),
      };
    });
};
