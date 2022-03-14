import React, { useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import Input from "./Input";
import Select, { SelectItems } from "./Select";

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

const formFieldTypes: SelectItems[] = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Telephone", value: "tel" },
  { label: "Email", value: "email" },
  { label: "Date", value: "date" },
  { label: "Time", value: "time" },
  { label: "DateTime Local", value: "datetime-local" }
];

export default function Form(props: { closeFormCB: () => void }) {
  const [formState, setFormState] = useState(initialFormFields);
  const [newField, setNewField] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");

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
        <Button text="Close Form" onClick={props.closeFormCB} fullWidth inverted />
        <Button text="Reset Form" onClick={resetForm} fullWidth />
      </div>

      {formState.map((field) => (
        <FormInput
          key={field.id}
          updateFieldValueCB={updateFieldValue}
          removeFieldCB={removeField}
          {...field}
        />
      ))}

      <div className="mt-8 w-full border-t-2 border-dashed border-gray-500 pt-4">
        <Input
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
          placeholder="New Field"
        />
        <div className="mt-4 flex items-center justify-between gap-2">
          <Select
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value)}
            name="fieldType"
            options={formFieldTypes}
          />
          <Button text="Add Field" onClick={addField} fullWidth />
        </div>
      </div>
    </div>
  );
}
