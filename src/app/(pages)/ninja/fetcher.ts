import { getEntries, getEntry } from "@/lib/contentful/client";
import { CategoryEntrySkeleton } from "@/lib/contentful/sharedModel";
import { transformAsset } from "@/lib/contentful/transformContent";
import { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { ActivitySkeleton } from "../activity/fetcher";

type MemberCategoryEntrySkeleton = CategoryEntrySkeleton & {
  contentTypeId: "memberCategory";
};

type Member = EntrySkeletonType & {
  name: EntryFieldTypes.Symbol;
  createdAt: EntryFieldTypes.Date;
  content: Document;
  category?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<MemberCategoryEntrySkeleton>
  >;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  relationActivity?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<ActivitySkeleton>
  >;
  relationMember?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<MemberSkeleton>
  >;
};

export type MemberSkeleton = EntrySkeletonType<Member> & {
  contentTypeId: "member";
};

export type Query = {
  categories?: string[];
  page: number;
  perPage?: number;
};

const transformContent = (
  entry: Entry<MemberSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const relationActivityIds = entry.fields.relationActivity?.map(
    (activity) => activity?.sys.id || ""
  );
  const relationMemberIds = entry.fields.relationMember?.map(
    (activity) => activity?.sys.id || ""
  );

  return {
    content: entry.fields.content,
    relationActivityIds,
    relationMemberIds,
    ...transformPartialContent(entry),
  };
};

const transformPartialContent = (
  entry: Entry<MemberSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
) => {
  const { name, image, category } = entry.fields;

  const images = image
    ?.filter((img) => img !== null && img !== undefined)
    .map(transformAsset);

  const ct = category?.map((ct) => ({
    slug: ct?.sys.id,
    name: ct?.fields.title || "",
  }));

  return {
    slug: entry.sys.id,
    name,
    image: images,
    category: ct,
  };
};

export const getMember = async (id: string) => {
  try {
    const entry = await getEntry<MemberSkeleton>("member", id);

    return transformContent(entry);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMemberList = async (query: Query) => {
  const fallbackPerPage = 100;
  const skip = query.perPage ? (query.page - 1) * query.perPage : 0;
  const categoryParams =
    query.categories && query.categories.length > 0
      ? { "fields.category.sys.id[in]": query.categories.join(",") }
      : {};
  const result = await getEntries<MemberSkeleton>({
    content_type: "member",
    select: ["fields.name", "fields.image", "fields.category"],
    order: ["-fields.createdAt"],
    limit: query.perPage || fallbackPerPage,
    skip: skip,
    ...categoryParams,
  });

  return {
    total: result.total,
    items: result.items.map((item) => transformPartialContent(item)),
  };
};

export const getRelationMember = async (ids: string[], limit?: number) => {
  const fallbackPerPage = 3;
  const result = await getEntries<MemberSkeleton>({
    content_type: "member",
    select: ["fields.name", "fields.image", "fields.category"],
    order: ["-fields.createdAt"],
    "sys.id[in]": ids,
    limit: limit || fallbackPerPage,
  });

  return {
    total: result.total,
    items: result.items.map((item) => transformPartialContent(item)),
  };
};
