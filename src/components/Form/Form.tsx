import React, { useCallback, useEffect, useRef, useState } from "react"
import Button from "../Button"
import FormInput from "../FormInput"
import Input from "../Input"
import Select, { SelectItems } from "../Select"
import { FormType } from "./types"
import { getInitialState, saveForms, updatedForms } from "./utils"

const formFieldTypes: SelectItems[] = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Telephone", value: "tel" },
  { label: "Email", value: "email" },
  { label: "Date", value: "date" },
  { label: "Time", value: "time" },
  { label: "DateTime Local", value: "datetime-local" }
]

const buttonStyles = [
  "w-full",
  "rounded-lg",
  "text-white",
  "border-4",
  "px-5",
  "py-1",
  "text-center",
  "transition",
  "duration-300",
  "focus:ring-4"
]

const buttonUnsavedStyles = [
  "hover:border-yellow-700",
  "hover:bg-yellow-700",
  "border-yellow-500",
  "bg-yellow-500",
  "focus:ring-yellow-300"
]

const buttonSavedStyles = [
  "hover:border-green-700",
  "hover:bg-green-700",
  "border-green-500",
  "bg-green-500",
  "focus:ring-green-300"
]

export default function Form(props: { formId: number }) {
  const [formState, setFormState] = useState<FormType>(getInitialState(props.formId))
  const [newField, setNewField] = useState("")
  const [newFieldType, setNewFieldType] = useState("text")
  const formTitleRef = useRef<HTMLInputElement>(null)
  const saveButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const oldTitle = document.title
    document.title = "Form Editor"
    formTitleRef.current?.focus()
    return () => {
      document.title = oldTitle
    }
  }, [])

  const updateFieldValue = (key: number, value: string) => {
    const newFields = formState.fields.map((field) => {
      if (field.id === key) {
        return { ...field, value }
      }
      return field
    })
    setFormState({ ...formState, fields: newFields })
  }

  const saveAllForms = useCallback(() => {
    saveForms(updatedForms(formState))
    saveButtonRef.current!.className =
      buttonStyles.join(" ") + " " + buttonSavedStyles.join(" ")
  }, [formState])

  useEffect(() => {
    saveButtonRef.current!.className =
      buttonStyles.join(" ") + " " + buttonUnsavedStyles.join(" ")
    if (formState.autoSave) {
      let timeout = setTimeout(() => {
        saveAllForms()
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [formState, saveAllForms])

  const addField = () => {
    const newFields = [
      ...formState.fields,
      { id: Number(new Date()), label: newField, type: newFieldType, value: "" }
    ]
    setFormState({ ...formState, fields: newFields })
    setNewField("")
    setNewFieldType("text")
  }

  const removeField = (key: number) => {
    const newFields = formState.fields.filter((field) => field.id !== key)
    setFormState({
      ...formState,
      fields: newFields
    })
  }

  const resetForm = () => {
    const newFields = formState.fields.map((field) => {
      return { ...field, value: "" }
    })
    setFormState({
      ...formState,
      fields: newFields
    })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between gap-2">
        <Input
          innerRef={formTitleRef}
          placeholder="Form Title"
          value={formState.label}
          onChange={(e) => setFormState({ ...formState, label: e.target.value })}
        />
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
      <div className="mt-8 grid w-full grid-cols-2 gap-2">
        <Button text="Reset Form" onClick={resetForm} fullWidth inverted />
        <div className="flex items-center justify-center">
          <label
            htmlFor="autosaveCheckbox"
            className="flex cursor-pointer items-center"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="autosaveCheckbox"
                checked={formState.autoSave}
                onChange={(e) =>
                  setFormState({ ...formState, autoSave: e.target.checked })
                }
                className="sr-only"
              />
              <div className="block h-8 w-14 rounded-full bg-gray-600"></div>
              <div className="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition"></div>
            </div>
            <div className="ml-3 font-medium text-gray-700">Autosave</div>
          </label>
        </div>
        <Button
          text="Close Form"
          onClick={() => {
            window.location.href = "/"
          }}
          fullWidth
        />
        <button ref={saveButtonRef} onClick={saveAllForms} className="">
          Save
        </button>
      </div>
    </div>
  )
}
