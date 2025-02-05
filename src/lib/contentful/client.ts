import { EntriesQueries, EntrySkeletonType, createClient } from "contentful";

const getContentfulCredentials = () => {
  // クライアントサイドの場合
  if (typeof window !== "undefined") {
    return {
      space: process.env.NEXT_PUBLIC_CF_SPACE_ID,
      accessToken: process.env.NEXT_PUBLIC_CF_DELIVERY_ACCESS_TOKEN,
    };
  }
  // サーバーサイドの場合
  return {
    space: process.env.CF_SPACE_ID,
    accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN,
  };
};

const { space, accessToken } = getContentfulCredentials();

const client = createClient({
  space: space!,
  accessToken: accessToken!,
});

// コンテンツタイプの一覧を取得する関数を追加
export const getContentTypes = async () => {
  try {
    const response = await client.getContentTypes();
    console.log("Available Content Types:");
    response.items.forEach((type) => {
      console.log(`- ${type.name} (ID: ${type.sys.id})`);
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching content types:", error);
    return [];
  }
};

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
