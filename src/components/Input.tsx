import React from "react";

interface InputProps {
  id: number;
  label: string;
  type: string;
  value: string;
  updateFieldValueCB: (key: number, value: string) => void;
  removeFieldCB: (key: number) => void;
}

export default function Input(prop: InputProps) {
  return (
    <>
      <span className="mt-2 w-full text-lg">{prop.label}</span>
      <div className="flex w-full items-center justify-between gap-2">
        <input
          className="w-full rounded-lg border-2 border-gray-200 p-2"
          type={prop.type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            prop.updateFieldValueCB(prop.id, e.target.value)
          }
          placeholder={prop.label}
          value={prop.value}
        />
        <button
          className="rounded-lg bg-sky-500 p-2 text-center text-white transition duration-300 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300"
          onClick={() => prop.removeFieldCB(prop.id)}
        >
          Remove
        </button>
      </div>
    </>
  );
}
