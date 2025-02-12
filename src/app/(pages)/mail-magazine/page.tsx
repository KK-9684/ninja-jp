import HubSpotMailMagazineForm from "@/app/components/Common/HubspotMailMagazineForm";
import Image from "next/image";
import ImageLeading from "@/assets/image-leading.png";
import Link from "next/link";

const MailMagazineSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl mb-8 text-ninjack-white text-center">
          <span className="text-ninjack-purple">Ninjack</span> MAIL MAGAZINE
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="min-w-[340px]">
            <p className="text-xl text-center md:text-left leading-relaxed text-ninjack-white font-bold">
              Ninjackに新規掲載した体験や、
              <br />
              更新情報を定期的にお届けいたす。
            </p>
            <Image
              src={ImageLeading}
              alt="メールマガジンを読む忍者"
              width={300}
              height={300}
              className="w-[280px] md:w-full h-auto md:m-0 m-5"
            />
          </div>

          <div className="">
            <div>
              <div className=" md:w-[100%] bg-ninjack-white rounded-md box-border">
                <HubSpotMailMagazineForm
                  HSF_ID={"0946d4ff-0cd3-4096-8c0d-a8e903f756cc"}
                />
              </div>
              <p className="text-sm text-gray-600 text-ninjack-white mt-5">
                お客様の個人情報の利用目的などについて、ご送信前に必ず
                <Link href="/privacy-policy" className="text-ninjack-purple">
                  プライバシーポリシー
                </Link>
                をご確認頂き、ご同意いただける場合にのみご送信ください。ご入力いただいた個人情報は、弊社のプライバシーポリシーに従い、厳重に管理いたします。以下よりご登録いただいた場合は、当該プライバシーポリシーに同意いただいたものとみなします。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MailMagazineSection;
