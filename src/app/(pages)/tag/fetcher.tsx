import { getEntries } from "@/lib/contentful/client";
import { resolveModel } from "@/lib/contentful/sharedModel";
import { transformAsset } from "@/lib/contentful/transformContent";
import { EntryFieldTypes } from "contentful";

export type TagEntrySkeleton = {
  contentTypeId: "tag";
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
  };
};

type TagLinkEntrySkeleton = {
  contentTypeId: "tag";
  fields: {
    contentType: EntryFieldTypes.Object;
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  };
};

export const getTagLinkEntries = async (id: string) => {
  const result = await getEntries<TagLinkEntrySkeleton>({
    links_to_entry: id,
  });

  return {
    total: result.total,
    items: result.items.map((tag) => ({
      model: resolveModel(tag.sys.contentType.sys.id),
      slug: tag.sys.id,
      title: tag.fields.title,
      image: tag.fields.image
        ?.filter((img) => img !== null && img !== undefined)
        .map(transformAsset),
    })),
  };
};

export const getTagList = async () => {
  const result = await getEntries<TagEntrySkeleton>({
    content_type: "tag",
    select: ["fields.title", "fields.slug"],
    order: ["-sys.createdAt"],
  });

  return {
    total: result.total,
    items: result.items.map((tag) => ({
      slug: tag.sys.id,
      title: tag.fields.title,
    })),
  };
};

export const getTagTitle = async (id: string) => {
  const result = await getEntries<TagEntrySkeleton>({
    content_type: "tag",
    "fields.slug": id, // 修正前
    select: ["fields.title"],
  });

  // もし `slug` で検索して見つからなかった場合、`sys.id` で再検索
  if (result.items.length === 0) {
    console.log(`Slug '${id}' では見つからなかったため、sys.id で検索します`);
    const resultById = await getEntries<TagEntrySkeleton>({
      content_type: "tag",
      "sys.id": id, // `sys.id` で検索
      select: ["fields.title"],
    });

    if (resultById.items.length === 0) {
      console.log(`Tag not found for slug or sys.id: ${id}`);
      return null;
    }

    return resultById.items[0].fields.title;
  }

  return result.items[0].fields.title;
};
