"use client";

import { useEffect, useState } from "react";

interface CheckboxItemProps {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  label: string;
  options: CheckboxItemProps[];
  onChange: (selectedValues: string[]) => void;
  customClass?: string;
  defaultCheckedValues?: string[];
}

const CheckboxGroup = ({ label, options, onChange, customClass, defaultCheckedValues = [] }: CheckboxGroupProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultCheckedValues);

  useEffect(() => {
    setSelectedValues(defaultCheckedValues);
  }, [defaultCheckedValues]);

  const handleChange = (value: string) => {
    setSelectedValues((prev) => {
      const updatedValues = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      onChange(updatedValues);
      return updatedValues;
    });
  };

  return (
    <div className={customClass}>
      <div className="text-sm leading-none font-bold text-ninjack-white mb-5">{label}</div>
      <div className="md:flex md:flex-col  md:space-y-2 grid grid-cols-2 gap-4">
        {options.map((item: CheckboxItemProps, index) => {
          const isChecked = selectedValues.includes(item.value);
          return (
            <div key={index} className="flex space-x-2 items-center p-2.5 bg-ninjack-bg-gray rounded-[4px]">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  value={item.value}
                  checked={isChecked}
                  onChange={() => handleChange(item.value)}
                  className="hidden" // Hide the default checkbox
                />
                <span className="checkmark"></span> {/* This span will be styled */}
              </label>
              <label className="text-ninjack-white text-sm">{item.label}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxGroup;
