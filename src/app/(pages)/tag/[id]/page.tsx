import Link from "next/link";
import Image from "next/image";
import { getTagLinkEntries } from "../fetcher";
// import iconActivity from "@/assets/icon-ninja.svg";
// import illus6 from "@/assets/illus-6.png";
// import FilterItem from "@/app/components/filterItem";
// import SearchForm from "@/app/components/Common/SearchForm";
// import Pagination from "@/app/components/Common/Pagination";

type Params = Promise<{ id: string }>;

export default async function TagDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const entries = await getTagLinkEntries(id);

  if (entries === null) {
    return <h1>Not Found</h1>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ジャンル</th>
            <th>タイトル</th>
            <th>画像</th>
          </tr>
        </thead>
        <tbody>
          {entries.items.map((item) => (
            <tr key={item.slug}>
              <td>{item.model.name}</td>
              <td>
                <Link href={`/${item.model.id}/${item.slug}`} key={item.slug}>
                  {item.title}
                </Link>
              </td>
              <td>
                {item.image && (
                  <Image
                    src={item.image[0].url}
                    alt={item.image[0].alt}
                    width={324}
                    height={160}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*
      <div>
        <section className="container pt-[80px] pb-[52px] mx-auto px-5">
          <div className="md:flex hidden space-x-4 items-center">
            <Image src={iconActivity} alt="現代忍者" width={40} height={40} />
            <h2 className="text-[36px] text-ninjack-white font-bold">
              現代忍者
            </h2>
          </div>

          <div className="flex flex-row md:hidden items-center justify-between">
            <div className="flex flex-row gap-4">
              <h2 className="text-[28px] font-bold text-ninjack-white">
                現代忍者
              </h2>
            </div>
            <FilterItem />
          </div>

          <div className="md:flex hidden space-x-[88px] items-center">
            <p className="text-ninjack-text-gray text-[18px] leading-loose">
              　忍者ショーで人を魅了する忍者や、自ら修行を重ねて伝統的な忍術を後世へと残そうとする忍者、忍者を学問的に研究する専門家など、さまざまな形で活躍する現代の忍者たちを取り上げます。気になる忍者への任務の依頼も承りまする！
            </p>
          </div>
          <div className="md:hidden flex flex-col gap-8 items-center mt-10">
            <p className="text-ninjack-text-gray text-[18px] leading-loose">
              　忍者ショーで人を魅了する忍者や、自ら修行を重ねて伝統的な忍術を後世へと残そうとする忍者、忍者を学問的に研究する専門家など、さまざまな形で活躍する現代の忍者たちを取り上げます。気になる忍者への任務の依頼も承りまする！
            </p>
          </div>
        </section>
        {/* メインコンテンツ */}
      {/* <section className="container md:pb-[160px] pb-[40px] mx-auto px-5 flex gap-[60px]">
          <div className="hidden md:block min-w-[240px] max-w-[300px]">
            {/* <SearchForm categories={categories.items} /> */}
      {/* </div>
          <div>
            <div className="mb-20 grid md:grid-cols-3 grid-cols-2 md:gap-[40px] gap-8">
              {entries.items.map((item, index) => {
                if (!item?.slug) return null; // 必要なデータの存在チェック
                return (
                  <div key={`tag-${item.slug}-${index}`}>
                    <Link href={href} className="flex flex-col space-y-5">
                      <Image
                        src={image}
                        alt="ダミーテキスト"
                        className="rounded-lg w-[380px] h-[380px] object-cover"
                        width={380}
                        height={380}
                      />
                      <div>
                        <p className="font-bold text-ninjack-white text-left ">
                          {title}
                        </p>
                        <p className="text-ninjack-white text-sm text-left">
                          {item.model.name}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <Pagination totalPages={totalPages} /> */}
      {/* </div> */}
    </>
  );
}
