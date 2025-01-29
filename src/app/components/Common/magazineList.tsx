
import Image from "next/image";

export default function MagazineList ({image , newone, category, date , title, content} : any) {
    return (
        <div className="flex md:flex-col flex-row gap-6">
                <Image src={image} alt="記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル" className="rounded-md w-[100px] h-[100px]  md:w-full md:h-full" />
                <div className="flex flex-col md:gap-5 gap-3">
                  <div className="flex justify-between gap-5">
                    <div className="flex space-x-1 items-center">
                        {
                            newone && (<div className="text-xs leading-none bg-ninjack-white px-[7px] py-[5px]">NEW</div>)
                        }
                      
                      <div className="flex items-center">
                        <span className="text-2xl" style={{ color: "#63B8A7" }}>
                          ・
                        </span>
                        <span className="text-ninjack-text-gray text-xs">{category}</span>
                      </div>
                    </div>
                    <div className="text-sm text-ninjack-text-gray self-center">{date}</div>
                  </div>
                  <p className="text-ninjack-white md:text-xl text-[14px] font-bold">{title}</p>
                  <p className="text-ninjack-text-gray text-xs">
                    {content}
                  </p>
                </div>
              </div>
    );
} 