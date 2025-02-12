import CustomButton from "@/app/components/Common/customButton";
import iconContact from "@/assets/icon-contact.svg";
import Image from "next/image";

export default function ContactThanksPage() {
  return (
    <div className="flex flex-col md:w-[720px] md:max-w-[720px] md:mx-auto mt-[100px]">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-ninjack-white  mb-3">
        お問い合わせ
      </h1>
      <Image
        src={iconContact}
        alt="お問い合わせ"
        className="w-[100px] mx-auto my-5"
      />
      <p className="text-ninjack-white text-center text-[18px] mb-6 font-bold">
        お問い合わせフォームの送信を完了いたしました。
      </p>
      <p className="text-ninjack-white text-center  mb-6 text-[14px]">
        この度はお問い合わせいただきまして誠にかたじけない。
        <br />
        内容を確認次第、担当忍者より折返しご連絡させていただきます。
        今しばらくお待ちくだされ。
      </p>
      <div className="max-w-[200px] mx-auto">
        <CustomButton
          text="TOPページへ戻る"
          link="/"
          font="Geist"
          color="ninjack-white"
          isArrow={true}
        />
      </div>
    </div>
  );
}
