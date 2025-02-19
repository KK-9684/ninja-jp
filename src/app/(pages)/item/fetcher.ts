import { getEntries, getEntry } from "@/lib/contentful/client";
import {
  CategoryEntrySkeleton,
  categoryPerItems,
} from "@/lib/contentful/sharedModel";
import { transformAsset } from "@/lib/contentful/transformContent";
import { Asset, Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { TagEntrySkeleton } from "../tag/fetcher";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
type ItemCategoryEntrySkeleton = CategoryEntrySkeleton & {
  contentTypeId: "itemCategory";
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

type Item = EntrySkeletonType & {
  title: EntryFieldTypes.Symbol;
  createdAt: EntryFieldTypes.Date;
  price: EntryFieldTypes.Symbol;
  content: Document;
  item?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<ItemCategoryEntrySkeleton>
  >;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  writer?: EntryFieldTypes.EntryLink<Writer>;
  relationKeyword?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TagEntrySkeleton>
  >;
  linkGroup?: EntryFieldTypes.Object<LinkGroup>;
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

export type LinkGroup = {
  title: string;
  url: string;
};

const transformContent = (
  entry: Entry<ItemSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
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
              ) // ✅ 型を限定
              .map(transformAsset)
          : [], // `image` が配列でない場合は空配列を返す
      }
    : null;

  const relationKeyword = entry.fields.relationKeyword
    ? entry.fields.relationKeyword.map((keyword) => ({
        slug: keyword?.sys.id,
        title: keyword?.fields.title,
      }))
    : [];

  const linkGroup = entry.fields.linkGroup ? entry.fields.linkGroup : [];

  const metaDescription = documentToPlainTextString(entry.fields.content).slice(
    0,
    80
  );

  return {
    content: entry.fields.content,
    writer,
    linkGroup,
    relationKeyword,
    metaDescription,
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

export const itemCategoryHasItems = async () => {
  const result = await categoryPerItems<ItemSkeleton>("itemCategory", 1);

  return result
    .filter((item) => item.total > 0)
    .map((item) => {
      return { slug: item.slug, title: item.title };
    });
};
