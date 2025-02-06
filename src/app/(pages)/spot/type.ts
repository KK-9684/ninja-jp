type SpotCategoryEntrySkeleton = CategoryEntrySkeleton & {
  contentTypeId: "spotCategory";
};

type Spot = EntrySkeletonType & {
  title: EntryFieldTypes.Symbol;
  createdAt: EntryFieldTypes.Date;
  content: Document;
  area?: EntryFieldTypes.AssetLink;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  writer?: EntryFieldTypes.EntryLink<WriterEntrySkeleton>;
  category?: EntryFieldTypes.EntryLink<SpotCategoryEntrySkeleton>;
  relationActivity?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<ActivitySkeleton>
  >;
  relationKeyword?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TagEntrySkeleton>
  >; // Changed to Array
};
