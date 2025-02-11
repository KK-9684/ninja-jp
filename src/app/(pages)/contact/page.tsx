import HubSpotContactForm from "@/app/components/Common/HubspotContactForm";

export default function ContactPage() {
  return (
    <div className="flex flex-col md:w-[720px] md:max-w-[720px] md:mx-auto mt-[100px]">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-ninjack-white  mb-3">
        お問い合わせ
      </h1>
      <p className="text-ninjack-white text-center  mb-6">
        以下のフォームよりお問合せ内容をご入力ください
      </p>
      <div className="md:p-[40px] w-[100%] bg-ninjack-white rounded-md">
        <HubSpotContactForm HSF_ID={"a8966ce4-6b71-40af-ad32-b8615d6a1b40"} />
      </div>
    </div>
  );
}
