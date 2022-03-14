import React from "react";
import Button from "./Button";
import Input from "./Input";

export interface FormInputType {
  id: number;
  label: string;
  type: string;
  value: string;
}

interface FormInputProps extends FormInputType {
  updateFieldValueCB: (key: number, value: string) => void;
  removeFieldCB: (key: number) => void;
}

export default function FormInput(props: FormInputProps) {
  return (
    <>
      <span className="mt-2 w-full text-lg">{props.label}</span>
      <div className="flex w-full items-center justify-between gap-2">
        <Input
          type={props.type}
          value={props.value}
          placeholder={props.label}
          onChange={(e) => props.updateFieldValueCB(props.id, e.target.value)}
        />
        <Button text="Remove" onClick={() => props.removeFieldCB(props.id)} />
      </div>
    </>
  );
}
