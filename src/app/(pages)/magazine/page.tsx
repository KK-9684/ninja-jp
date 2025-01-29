"use client";

import SearchKeysGroup from "@/app/components/searchKeysGroup";
import SectionLinkGroup from "../../components/Common/sectionLinkGroup";
import { sectionFictionLinks, sectionNinjackMagazineLinks } from "../../constant/sectionLinks";

import IconSearch from "@/assets/icon-search-magazine.svg";
import Image from "next/image";
import imageMagazineNew from "@/assets/image-magazine-new.png";
import MagazineList from "@/app/components/Common/magazineList";
import { useRouter } from "next/navigation";
import Pagination from "@/app/components/pagination";

export default function Magazine() {
    const router = useRouter();
    const showDetail = (index: number) => {
        router.push(`/magazine/${index}`);
    }
    const handlePageChange = () => {

    }
    return (
        <div className="container w-full mx-auto">
            <section className="flex flex-col gap-8 md:mt-[100px] mt-[64px]">
                <div className="flex md:flex-row flex-col justify-center md:space-x-5 gap-4 text-center md:text-[66px] text-[48px] leading-none">
                    <span className="text-ninjack-purple">Ninjack</span>
                    <span className="text-ninjack-white">MAGAZINE</span>
                </div>
                <div className="flex justify-center">
                    <SectionLinkGroup links={sectionNinjackMagazineLinks} />
                </div>
                <div className="md:px-[139px] px-8">
                    <div className="flex flex-col gap-[20px] px-[23px] py-[20px] bg-ninjack-bg-gray rounded-[10px]">
                        <div className="self-center flex flex-row gap-3">
                            <Image src={IconSearch} alt="" />
                            <span className="text-[14px] text-ninjack-white">キーワードから探す</span>
                        </div>
                        <SearchKeysGroup />
                    </div>
                </div>
            </section>

            <section className="grid md:grid-cols-3 grid-cols-1 gap-[50px] mt-[80px] px-8">
                {
                    magazineList.map((item: any, index: any) => {
                        return (
                            <button key={index} onClick={() => showDetail(index)}>
                                <MagazineList
                                    image={item.image}
                                    newone={item.newone}
                                    category={item.category}
                                    date={item.date}
                                    title={item.title}
                                    content={item.content}
                                />
                            </button>
                        )
                    })
                }
            </section>
            <Pagination 
                currentPage={1} 
                totalPages={3} 
                onPageChange={handlePageChange}
            />
        </div>
    )
}

const magazineList = [
    {
        image: imageMagazineNew,
        newone: true,
        category: 'ニュース',
        date: '2024.01.01',
        title: '記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル',
        content: 'これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…'
    },
    {
        image: imageMagazineNew,
        newone: true,
        category: 'ニュース',
        date: '2024.01.01',
        title: '記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル',
        content: 'これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…'
    },
    {
        image: imageMagazineNew,
        newone: true,
        category: 'ニュース',
        date: '2024.01.01',
        title: '記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル',
        content: 'これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…'
    },
    {
        image: imageMagazineNew,
        newone: false,
        category: 'ニュース',
        date: '2024.01.01',
        title: '記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル',
        content: 'これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…'
    },
    {
        image: imageMagazineNew,
        newone: false,
        category: 'ニュース',
        date: '2024.01.01',
        title: '記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル',
        content: 'これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…'
    },
    {
        image: imageMagazineNew,
        newone: false,
        category: 'ニュース',
        date: '2024.01.01',
        title: '記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル',
        content: 'これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…'
    },
    {
        image: imageMagazineNew,
        newone: false,
        category: 'ニュース',
        date: '2024.01.01',
        title: '記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル',
        content: 'これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…'
    },
    {
        image: imageMagazineNew,
        newone: false,
        category: 'ニュース',
        date: '2024.01.01',
        title: '記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル',
        content: 'これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…'
    },
    {
        image: imageMagazineNew,
        newone: false,
        category: 'ニュース',
        date: '2024.01.01',
        title: '記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル',
        content: 'これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…'
    },
    {
        image: imageMagazineNew,
        newone: false,
        category: 'ニュース',
        date: '2024.01.01',
        title: '記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル',
        content: 'これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…'
    },
    {
        image: imageMagazineNew,
        newone: false,
        category: 'ニュース',
        date: '2024.01.01',
        title: '記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル',
        content: 'これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…'
    },
    {
        image: imageMagazineNew,
        newone: false,
        category: 'ニュース',
        date: '2024.01.01',
        title: '記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル',
        content: 'これはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこれはじゅうもじですこ…'
    },
]