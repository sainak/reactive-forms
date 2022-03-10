import React from "react";
import Button from "./Button";

import Input from "./Input";

interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

const initialFormFields: formField[] = [
  { id: 1, label: "First Name", type: "text", value: "Aakash" },
  { id: 2, label: "Last Name", type: "text", value: "Singh" },
  { id: 3, label: "Email", type: "email", value: "aakash@example.com" },
  { id: 4, label: "Date of Birth", type: "date", value: "2001-01-01" }
];

export default function Form(props: { closeFormCB: () => void }) {
  const [formState, setFormState] = React.useState(initialFormFields);
  const [newField, setNewField] = React.useState("");
  const [newFieldType, setNewFieldType] = React.useState("text");

  const updateFieldValue = (key: number, value: string) => {
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

  const removeField = (key: number) => {
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
        <Button text="Close Form" onClick={props.closeFormCB} fullWidth inverted/>
        <Button text="Reset Form" onClick={resetForm} fullWidth/>
      </div>

      {formState.map((field) => (
        <Input
          key={field.id}
          updateFieldValueCB={updateFieldValue}
          removeFieldCB={removeField}
          {...field}
        />
      ))}

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
          <Button text="Add Field" onClick={addField} fullWidth/>
        </div>
      </div>
    </div>
  );
}
