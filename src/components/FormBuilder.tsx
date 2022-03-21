import { Link, navigate } from "raviger"
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { fieldKind } from "../types/fieldTypes"
import { FormType } from "../types/formTypes"
import { getInitialState, saveForms, updatedForms } from "../utils/formUtils"
import Button from "./Button"
import Input from "./Input"
import Select, { SelectItems } from "./Select"

const formFieldTypes: SelectItems[] = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Telephone", value: "tel" },
  { label: "Email", value: "email" },
  { label: "Date", value: "date" },
  { label: "Time", value: "time" },
  { label: "DateTime Local", value: "datetime-local" }
]

const buttonStyle = (color: string) => [
  "w-full",
  "rounded-lg",
  "text-white",
  "px-5",
  "py-1",
  "transition",
  "duration-300",
  "focus:ring-4",
  `hover:bg-${color}-700`, // hover:bg-yellow-700 hover:bg-green-700
  `bg-${color}-500`, // bg-yellow-500 bg-green-500
  `focus:ring-${color}-300` // focus:ring-yellow-300 focus:ring-green-300
]

export default function FormBuilder(props: { formId: number }) {
  const [formState, setFormState] = useState<FormType>(() =>
    getInitialState(props.formId)
  )
  const [newField, setNewField] = useState("")
  const [newFieldType, setNewFieldType] = useState<fieldKind>("text")
  const formTitleRef = useRef<HTMLInputElement>(null)
  const saveButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const oldTitle = document.title
    document.title = "Form Editor"
    formState.id !== props.formId &&
      navigate(`/form/${formState.id}`, { replace: true })
    formTitleRef.current?.focus()
    return () => {
      document.title = oldTitle
    }
  }, [formState.id, props.formId])

  const updateFieldQuestion = (key: number, value: string) => {
    const newFields = formState.fields.map((field) => {
      if (field.id === key) {
        return { ...field, label: value }
      }
      return field
    })
    setFormState({ ...formState, fields: newFields })
  }

  const saveAllForms = useCallback(() => {
    saveForms(updatedForms(formState))
    saveButtonRef.current!.className = buttonStyle("green").join(" ")
  }, [formState])

  useEffect(() => {
    saveButtonRef.current!.className = buttonStyle("yellow").join(" ")
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
        <Fragment key={field.id}>
          <div className="mt-4 mb-2 flex w-full items-end gap-2">
            <span className="mr-auto font-bold text-gray-600 ">Type: {field.type}</span>
            <Button text="Remove" onClick={() => removeField(field.id)} />
          </div>
          <Input
            key={field.id}
            value={field.label}
            placeholder="Question"
            onChange={(e) => updateFieldQuestion(field.id, e.target.value)}
          />
        </Fragment>
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
            onChange={(e) => setNewFieldType(e.target.value as fieldKind)}
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
            htmlFor="autoSaveCheckbox"
            className="flex cursor-pointer items-center"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="autoSaveCheckbox"
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
        <Link
          href="/"
          className="block w-full rounded-lg bg-sky-500 px-5 py-2 text-center text-white transition duration-300 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 "
        >
          Close Form
        </Link>
        <button ref={saveButtonRef} onClick={saveAllForms} className="">
          Save
        </button>
      </div>
    </div>
  )
}
