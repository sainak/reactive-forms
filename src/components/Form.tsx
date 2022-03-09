import React from "react";

import Input from "./Input";


const formFields = [
  { id: 1, label: "First Name", type: "text", value: "Aakash" },
  { id: 2, label: "Last Name", type: "text", value: "Singh" },
  { id: 3, label: "Email", type: "email", value: "aakash@example.com" },
  { id: 4, label: "Date of Birth", type: "date", value: "2001-01-01" },
];



export default function Form(props: { closeFormCB: () => void }) {
  const [formState, setFormState] = React.useState(formFields);
  const [newField, setNewField] = React.useState("");

  const updateFieldValueCB = (key: number, value: string) => {
    setFormState(
      formState.map((item) => {
        if (item.id === key) {
          return { ...item, value: value };
        }
        return item;
      })
    )
  }

  const addField = () => {
    setFormState([
      ...formState,
      { id: Number(new Date()), label: newField, type: "text", value: "" },
    ]);
    setNewField("");
  }

  const removeFieldCB = (key: number) => {
    setFormState(() => {
      const newState = formState.filter((item) => item.id !== key);
      console.table(newState);
      return newState;
    })
  }

  const resetForm = () => {
    setFormState(
      formState.map((item) => {
        return { ...item, value: "" };
      })
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-between items-center gap-2">
        <button
          onClick={props.closeFormCB}
          className="rounded-lg p-2 text-center border-4 text-black border-sky-500 hover:bg-sky-700 hover:border-sky-700 hover:text-white focus:ring-4 focus:ring-sky-300 transition duration-300 w-full">
          Close Form
        </button>
        <button
          onClick={resetForm}
          className="rounded-lg p-2 text-center text-white border-4 border-sky-500 bg-sky-500 hover:bg-sky-700 hover:border-sky-700 focus:ring-4 focus:ring-sky-300 transition duration-300 w-full">
          Reset Form
        </button>
      </div>

      {formState.map((field) => (
        <Input key={field.id} updateFieldValueCB={updateFieldValueCB} removeFieldCB={removeFieldCB} {...field} />
      ))}

      {/* Button to add Form Item */}
      <div className="flex w-full justify-between items-center gap-2 mt-8 pt-4 border-t-2 border-gray-500 border-dashed">
        <input
          type="text"
          value={newField}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewField(e.target.value)}
          className="border-2 border-gray-200 rounded-lg p-2 w-full"
          placeholder="Add New Field"
        />
        <button
          className="rounded-lg p-2 text-center text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 transition duration-300 w-full"
          onClick={addField}>
          Add Field
        </button>
      </div>
    </div>
  );
}
