import React from "react";

import Input from "./Input";

const formFields = [
  { id: 1, label: "First Name", type: "text", value: "Aakash" },
  { id: 2, label: "Last Name", type: "text", value: "Singh" },
  { id: 3, label: "Email", type: "email", value: "aakash@example.com" },
  { id: 4, label: "Date of Birth", type: "date", value: "2001-01-01" }
];

export default function Form(props: { closeFormCB: () => void }) {
  const [formState, setFormState] = React.useState(formFields);
  const [newField, setNewField] = React.useState("");
  const [newFieldType, setNewFieldType] = React.useState("text");

  const updateFieldValueCB = (key: number, value: string) => {
    setFormState(
      formState.map((item) => {
        if (item.id === key) {
          return { ...item, value: value };
        }
        return item;
      })
    );
  };

  const addField = () => {
    setFormState([
      ...formState,
      { id: Number(new Date()), label: newField, type: newFieldType, value: "" }
    ]);
    setNewField("");
    setNewFieldType("text");
  };

  const removeFieldCB = (key: number) => {
    setFormState(() => {
      return formState.filter((item) => item.id !== key);
    });
  };

  const resetForm = () => {
    setFormState(
      formState.map((item) => {
        return { ...item, value: "" };
      })
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between gap-2">
        <button
          onClick={props.closeFormCB}
          className="w-full rounded-lg border-4 border-sky-500 p-2 text-center text-black transition duration-300 hover:border-sky-700 hover:bg-sky-700 hover:text-white focus:ring-4 focus:ring-sky-300"
        >
          Close Form
        </button>
        <button
          onClick={resetForm}
          className="w-full rounded-lg border-4 border-sky-500 bg-sky-500 p-2 text-center text-white transition duration-300 hover:border-sky-700 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300"
        >
          Reset Form
        </button>
      </div>

      {formState.map((field) => (
        <Input
          key={field.id}
          updateFieldValueCB={updateFieldValueCB}
          removeFieldCB={removeFieldCB}
          {...field}
        />
      ))}

      {/* Button to add Form Item */}
      <div className="mt-8 w-full border-t-2 border-dashed border-gray-500 pt-4">
        <input
          type="text"
          value={newField}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewField(e.target.value)
          }
          className="w-full rounded-lg border-2 border-gray-200 p-2"
          placeholder="Add New Field"
        />
        <div className="mt-4 flex items-center justify-between gap-2">
          <select
            name="fieldType"
            id=""
            title="fieldType"
            className="w-full rounded-lg border-2 border-gray-200 bg-white p-2"
            value={newFieldType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setNewFieldType(e.target.value);
            }}
          >
            <option value="text" selected>
              Text
            </option>
            <option value="number">Number</option>
            <option value="tel">Telephone</option>
            <option value="email">Email</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="datetime-local">DateTime Local</option>
          </select>
          <button
            className="w-full rounded-lg bg-sky-500 p-2 text-center text-white transition duration-300 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300"
            onClick={addField}
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
}
