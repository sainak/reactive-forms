import React from "react";

export interface SelectItems {
  id?: string;
  label: string;
  value: string;
}

interface SelectProps {
  id?: string;
  value?: string;
  name: string;
  defaultValue?: string;
  onChange?: ((e: React.ChangeEvent<HTMLSelectElement>) => void) | undefined;
  options: SelectItems[];
}

export default function Select(props: SelectProps) {
  return (
    <select
      id={props.id}
      name={props.name}
      title={props.name}
      className="w-full rounded-lg border-2 border-gray-200 bg-white p-2"
      value={props.value}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
    >
      {props.options.map((item) => (
        <option id={item.id} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
