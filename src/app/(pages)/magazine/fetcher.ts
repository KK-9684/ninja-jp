import { getEntries, getEntry } from "@/lib/contentful/client";
import {
  CategoryEntrySkeleton,
  categoryPerItems,
  WriterEntrySkeleton,
} from "@/lib/contentful/sharedModel";
import { transformAsset } from "@/lib/contentful/transformContent";
import { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { differenceInDays } from "date-fns";
import { TagEntrySkeleton } from "../tag/fetcher";

type MagazineCategoryEntrySkeleton = CategoryEntrySkeleton & {
  contentTypeId: "magazineCategory";
};

type Magazine = EntrySkeletonType & {
  title: EntryFieldTypes.Symbol;
  summary: EntryFieldTypes.Text;
  createdAt: EntryFieldTypes.Date;
  content: Document;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  relationKeyword?: EntryFieldTypes.EntryLink<TagEntrySkeleton>;
  category?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<MagazineCategoryEntrySkeleton>
  >;
  writer?: EntryFieldTypes.EntryLink<WriterEntrySkeleton>;
};

type MagazineSkeleton = EntrySkeletonType<Magazine> & {
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
) => {
  const writer = entry.fields.writer
    ? {
        name: entry.fields.writer.fields.name,
        content: entry.fields.writer.fields.content,
      }
    : null;
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
    relationKeyword,

    ...transformPartialContent(entry),
  };
};

const transformPartialContent = (
  entry: Entry<MagazineSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const { title, summary, image, category, createdAt } = entry.fields;

  const images = image
    ?.filter((img) => img !== null && img !== undefined)
    .map(transformAsset);

  const ct = category?.map((ct) => ({
    slug: ct?.sys.id,
    title: ct?.fields.title || "",
  }));

  const isNew = differenceInDays(new Date(), new Date(createdAt)) <= 14;

  return {
    slug: entry.sys.id,
    title,
    summary,
    image: images,
    isNew,
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
  const result = await getEntries<MagazineSkeleton>({
    content_type: "magazine",
    select: [
      "fields.title",
      "fields.image",
      "fields.summary",
      "fields.category",
      "fields.createdAt",
    ],
    order: ["-fields.createdAt"],
    limit: query.perPage || fallbackPerPage,
    skip: skip,
    ...tagParams,
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
