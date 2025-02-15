import { getTagLinkEntries, getTagTitle } from "../fetcher";
import ItemItem from "@/app/components/Common/itemItem";
import { Metadata } from "next/types";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const title = await getTagTitle(resolvedParams.id);
  return {
    title: title ? `${title} に関するタグ一覧` : "タグが見つかりません",
  };
}

export default async function TagDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const resolvedParams = await params;
  const title = await getTagTitle(resolvedParams.id);

  if (!title) {
    return <h1>タグが見つかりません</h1>;
  }

  const entries = await getTagLinkEntries(resolvedParams.id);
  if (!entries || entries.items.length === 0) {
    return <h1>記事が見つかりません</h1>;
  }
  return (
    <>
      <div>
        <section className="container pt-[80px] pb-[52px] mx-auto px-5">
          <div className="md:flex hidden space-x-4 items-center">
            <h2 className="text-[36px] text-ninjack-white font-bold">
              「{title}」に関するタグ一覧
            </h2>
          </div>

          <div className="flex flex-row md:hidden items-center justify-between">
            <div className="flex flex-row gap-4">
              <h2 className="text-[28px] font-bold text-ninjack-white">
                「{title}」に関するタグ一覧
              </h2>
            </div>
          </div>
        </section>
        <section className="container md:pb-[160px] pb-[40px] mx-auto px-5">
          <div>
            <div className="mb-20 grid md:grid-cols-6 grid-cols-2 md:gap-[40px] gap-6">
              {entries.items.map((item, index) => (
                <div key={`spot-${item.slug}-${index}`}>
                  <ItemItem
                    image={item.image?.[0]?.url || "/noimage.png"}
                    category={item.model.name}
                    title={item.title}
                    href={`/${item.model.id}/${item.slug}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
