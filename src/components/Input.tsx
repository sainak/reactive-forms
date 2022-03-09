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
      <span className="w-full text-lg mt-2">{prop.label}</span>
      <div className="flex w-full justify-between items-center gap-2">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 w-full"
          type={prop.type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            prop.updateFieldValueCB(prop.id, e.target.value)
          }
          placeholder={prop.label}
          value={prop.value}
        />
        <button
          className="rounded-lg p-2 text-center text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 transition duration-300"
          onClick={() => prop.removeFieldCB(prop.id)}>
          Remove
        </button>
      </div>
    </>
  )
}
