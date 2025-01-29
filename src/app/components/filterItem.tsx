"use client";

import IconFilter from '@/assets/icon-filter.svg';
import IconClose from '@/assets/icon-close.svg';
import Image from 'next/image';
import { useState } from 'react';
import CheckboxGroup from './checkboxGroup';
import KeywordsGroup from './keywordsGroup';
const FilterItem = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="border-[1px] border-ninjack-line-gray bg-ninjack-bg-gray rounded py-2 px-3 items-center  flex flex-row gap-2 text-ninjack-white" onClick={handleShow}><Image src={IconFilter} alt="" /> 絞り込み</button>

      {
        show && (
          <div className='absolute top-0 left-0 text-ninjack-white w-full bg-ninjack-black h-screen p-6'>
            <div className='relative'>
              <div className='flex flex-row gap-2 text-[20px] font-bold justify-center pt-[26px]'>
                <Image src={IconFilter} alt="" />
                絞り込み
              </div>
              <button className='absolute top-0 right-0' onClick={handleClose}><Image src={IconClose} alt='' /></button>
            </div>

            <div className='flex flex-col gap-4 mt-8'>
              <CheckboxGroup
                label="カテゴリで絞り込む"
                options={[
                  { label: "すべて", value: "すべて" },
                  { label: "ものづくり", value: "ものづくり" },
                  { label: "体験", value: "体験" },
                ]}
                onChange={(selectedValues) => {
                  console.log(selectedValues);
                }}
                customClass="border-t-[2px] border-ninjack-line-gray pt-6"
                defaultCheckedValues={["すべて"]}
              />

              <CheckboxGroup
                label="エリア名で絞り込む"
                options={[
                  { label: "すべて", value: "すべて" },
                  { label: "北海道", value: "北海道" },
                  { label: "東北", value: "東北" },
                  { label: "関東", value: "関東" },
                  { label: "中部", value: "中部" },
                  { label: "近畿", value: "近畿" },
                  { label: "中国", value: "中国" },
                  { label: "四国", value: "四国" },
                  { label: "九州", value: "九州" },
                ]}
                onChange={(selectedValues) => {
                  console.log(selectedValues);
                }}
                customClass="border-t-[2px] border-b-[2px] border-ninjack-line-gray py-6"
                defaultCheckedValues={["すべて"]}
              />

              <KeywordsGroup
                label="キーワードから探す"
                keywords={[
                  { label: "キーワード", value: "キーワード" },
                  { label: "忍者体験", value: "忍者体験" },
                  { label: "修行", value: "修行" },
                  { label: "キーワード", value: "キーワード" },
                  { label: "忍者体験", value: "忍者体験" },
                  { label: "キーワード", value: "キーワード" },
                  { label: "キーワード", value: "キーワード" },
                  { label: "忍者体験", value: "忍者体験" },
                  { label: "修行", value: "修行" },
                ]}
              />
            </div>
          </div>
        )
      }

    </>
  )
}

export default FilterItem;