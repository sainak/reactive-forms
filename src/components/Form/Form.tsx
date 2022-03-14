import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import FormInput from "../FormInput";
import Input from "../Input";
import Select, { SelectItems } from "../Select";
import { FormType } from "./types";
import { getInitialState, getLocalForms, saveForms, updatedForms } from "./utils";

const formFieldTypes: SelectItems[] = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Telephone", value: "tel" },
  { label: "Email", value: "email" },
  { label: "Date", value: "date" },
  { label: "Time", value: "time" },
  { label: "DateTime Local", value: "datetime-local" }
];

export default function Form(props: { formId?: number; closeFormCB: () => void }) {
  const [formState, setFormState] = useState<FormType>(getInitialState(props.formId));
  const [newField, setNewField] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const formTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Form Editor";
    formTitleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  const updateFieldValue = (key: number, value: string) => {
    const newFields = formState.fields.map((field) => {
      if (field.id === key) {
        return { ...field, value };
      }
      return field;
    });
    setFormState({ ...formState, fields: newFields });
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      localStorage.setItem("savedForms", updatedForms(formState));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [formState]);

  const addField = () => {
    const newFields = [
      ...formState.fields,
      { id: Number(new Date()), label: newField, type: newFieldType, value: "" }
    ];
    setFormState({ ...formState, fields: newFields });
    setNewField("");
    setNewFieldType("text");
  };

  const removeField = (key: number) => {
    const newFields = formState.fields.filter((field) => field.id !== key);
    setFormState({
      ...formState,
      fields: newFields
    });
  };

  const resetForm = () => {
    const newFields = formState.fields.map((field) => {
      return { ...field, value: "" };
    });
    setFormState({
      ...formState,
      fields: newFields
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between gap-2">
        <Button text="Close Form" onClick={props.closeFormCB} fullWidth inverted />
        <Button text="Reset Form" onClick={resetForm} fullWidth />
      </div>

      <div className="mt-4 flex w-full items-center justify-between gap-2">
        <Input
          ref={formTitleRef}
          placeholder="Form Title"
          value={formState.label}
          onChange={(e) => setFormState({ ...formState, label: e.target.value })}
        />
        <Button text="Save Form" onClick={() => saveForms(getLocalForms())}>
          <span>saving...</span>
        </Button>
      </div>

      {formState.fields.map((field) => (
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
