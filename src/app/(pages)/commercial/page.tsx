"use client";
export default function CommercialPage() {
    return (
        <div className="container mx-auto p-6">
            <div className="text-ninjack-white text-[36px] md:mt-[80px] mt-[44px] text-center font-bold">
                特定商取引法
            </div>
            <div className="py-4 px-6 border-[1px] border-[#2e2e2e] rounded-[10px] text-[16px] text-[#7a7a7a] font-bold md:mt-[52px] mt-[40px]">
                特定商取引法に基づく表記
            </div>
            <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col">
              <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">事業者</div>
              <div className="w-full text-[#ffffff]">株式会社Ninjack</div>
            </div>
            <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col">
              <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">電話番号</div>
              <div className="w-full text-[#ffffff]">請求をいただければ遅滞なく開示します</div>
            </div>
            <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col">
              <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">メールアドレス</div>
              <div className="w-full text-[#ffffff]">yabumi@ninjack.co.jp</div>
            </div>
            <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col">
              <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">役務の対価</div>
              <div className="w-full text-[#ffffff]">各サービスの申込ページに表示</div>
            </div>
            <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col">
              <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">対価以外に必要となる費用</div>
              <div className="w-full text-[#ffffff]">なし（但し、インターネット接続料金その他の電気通信回線の通信に関する費用及び通信機器はユーザーにて負担して頂きます）。</div>
            </div>
            <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col">
              <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">代金の支払方法</div>
              <div className="w-full text-[#ffffff]">銀行振込・クレジットカード決済</div>
            </div>
            <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col">
              <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">代金の支払時期</div>
              <div className="w-full text-[#ffffff]">各サービスの申込時に入力したクレジットカードに課金します。</div>
            </div>
            <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col">
              <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">役務の提供時期</div>
              <div className="w-full text-[#ffffff]">即時</div>
            </div>
            <div className="px-5 py-4 border-b-[1px] border-[#2e2e2e] text-[14px] flex md:flex-row flex-col">
              <div className="md:w-[40%] text-[#B261F1] md:self-center text-left">キャンセル（返品・交換/返品特約</div>
              <div className="w-full text-[#ffffff]">申込後のキャンセルはできません。</div>
            </div>
        </div>
    )
}