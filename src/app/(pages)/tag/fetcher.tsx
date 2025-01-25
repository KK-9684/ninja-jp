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
