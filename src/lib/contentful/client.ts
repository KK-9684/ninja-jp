import { EntriesQueries, EntrySkeletonType, createClient } from "contentful";

const client = createClient({
  space: process.env.CF_SPACE_ID || "",
  accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN || "",
});

export const getEntries = async <TEntrySkeleton extends EntrySkeletonType>(
  query?: EntriesQueries<TEntrySkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
) => {
  const result =
    await client.withoutUnresolvableLinks.getEntries<TEntrySkeleton>({
      ...query,
    });

  return { total: result.total, items: result.items };
};

export const getEntry = async <TEntrySkeleton extends EntrySkeletonType>(
  contentType: string,
  slug: string
) => {
  const entries =
    await client.withoutUnresolvableLinks.getEntries<TEntrySkeleton>({
      content_type: contentType,
      "sys.id": slug,
    });

  const entry = entries.items[0];
  if (entry === undefined) {
    throw new Error("Content not found");
  }

  return entry;
};
