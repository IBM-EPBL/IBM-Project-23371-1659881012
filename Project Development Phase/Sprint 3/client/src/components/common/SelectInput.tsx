import React from "react";
import InputSelect from "./SelectInputBox";

interface SelectInputProps {
  value: any;
  setter: any;
  valueMap: Array<Object>;
  label: string;
  mandatory: boolean;
  styles: string;
}

const SelectInput = ({
  label,
  valueMap,
  value,
  mandatory,
  setter,
  styles,
}: SelectInputProps) => {
  return (
    <section className="flex flex-col items-start gap-5 w-full">
      <label htmlFor={label} className="text-primary text-lg font-medium">
        {label} {mandatory && <span className="text-mandatory">*</span>}
      </label>
      <InputSelect
        setter={setter}
        value={value}
        valueMap={valueMap}
        styles={`text-secondary px-5 py-3 text-lg font-medium focus:outline-none border-[0.75px] border-border bg-background ${styles}`}
      />
    </section>
  );
};

export default SelectInput;
