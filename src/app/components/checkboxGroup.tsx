"use client";
import { useState, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

type CheckboxGroupProps = {
  label: string;
  options: Option[];
  onChange: (selectedValues: string[]) => void;
  customClass?: string;
  defaultCheckedValues?: string[];
};

const CheckboxGroup = ({
  label,
  options,
  onChange,
  customClass = "",
  defaultCheckedValues = ["all"],
}: CheckboxGroupProps) => {
  const [selectedValues, setSelectedValues] =
    useState<string[]>(defaultCheckedValues);

  // defaultCheckedValuesが変更されたら選択状態を更新
  useEffect(() => {
    setSelectedValues(defaultCheckedValues);
  }, [defaultCheckedValues]);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    let newSelectedValues: string[] = [];

    if (value === "all" || value === "すべて") {
      // 「すべて」がチェックされた場合は他のチェックを外す
      newSelectedValues = checked ? [value] : [];
    } else if (checked) {
      // その他の値がチェックされた場合
      // 現在の選択値から「すべて」を除外
      const filteredValues = selectedValues.filter(
        (val) => val !== "all" && val !== "すべて"
      );
      // 新しい値を追加
      newSelectedValues = [...filteredValues, value];
    } else {
      // チェックが外れた場合はその値を除外
      newSelectedValues = selectedValues.filter((val) => val !== value);
    }

    // 何も選択されていない場合は「すべて」を選択状態に
    if (newSelectedValues.length === 0) {
      newSelectedValues = ["all"];
    }

    // 状態を更新
    setSelectedValues(newSelectedValues);

    // 親コンポーネントに変更を通知
    onChange(newSelectedValues);
  };

  return (
    <div className={`flex flex-col gap-4 ${customClass}`}>
      <div className="text-[14px] font-bold">{label}</div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <div
            key={option.value}
            className="flex space-x-2 items-center p-2.5 bg-ninjack-bg-gray rounded-[4px]"
          >
            <label className="custom-checkbox">
              <input
                type="checkbox"
                id={`checkbox-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onChange={(e) =>
                  handleCheckboxChange(option.value, e.target.checked)
                }
                className="hidden"
              />
              <span className="checkmark"></span>{" "}
              {/* This span will be styled */}
            </label>
            <label htmlFor={`checkbox-${option.value}`} className="text-[14px]">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
