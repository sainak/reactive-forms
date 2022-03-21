import { Link, navigate } from "raviger"
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { fieldKind, FormFieldChildType } from "../types/fieldTypes"
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
  { label: "DateTime Local", value: "datetime-local" },
  { label: "Textarea", value: "textarea" },
  { label: "Radio Group", value: "radio" },
  { label: "Select", value: "select" },
  { label: "Multi Select", value: "select-multiple" }
]

const nestedFieldTypes = ["radio", "select-multiple", "select"]

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
  const [newFieldChildren, setNewFieldChildren] = useState<FormFieldChildType[]>([])
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

  const getChildren = (id: number) =>
    formState.fields.find((field) => field.id === id)?.children || []

  const addNewChild = (label: string, parentId?: number) => {
    if (parentId === undefined) {
      setNewFieldChildren([...newFieldChildren, { id: Number(new Date()), label }])
    } else {
      setFormState({
        ...formState,
        fields: formState.fields.map((field) => {
          if (field.id === parentId) {
            return {
              ...field,
              children: [...getChildren(parentId), { id: Number(new Date()), label }]
            }
          }
          return field
        })
      })
    }
  }

  const removeChild = (id: number, parentId?: number) => {
    if (parentId === undefined) {
      setNewFieldChildren(newFieldChildren.filter((child) => child.id !== id))
    } else {
      setFormState({
        ...formState,
        fields: formState.fields.map((field) => {
          if (field.id === parentId) {
            return {
              ...field,
              children: getChildren(parentId).filter((child) => child.id !== id)
            }
          }
          return field
        })
      })
    }
  }

  const updateChildLabel = (id: number, value: string, parentId?: number) => {
    if (parentId === undefined) {
      const newChildren = newFieldChildren.map((child) => {
        if (child.id === id) {
          return { ...child, label: value }
        }
        return child
      })
      setNewFieldChildren(newChildren)
    } else {
      setFormState({
        ...formState,
        fields: formState.fields.map((field) => {
          if (field.id === parentId) {
            return {
              ...field,
              children: getChildren(parentId).map((child) => {
                if (child.id === id) {
                  return { ...child, label: value }
                }
                return child
              })
            }
          }
          return field
        })
      })
    }
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
      {
        id: Number(new Date()),
        label: newField,
        type: newFieldType,
        value: "",
        children: nestedFieldTypes.includes(newFieldType) ? newFieldChildren : []
      }
    ]
    setFormState({ ...formState, fields: newFields })
    setNewField("")
    setNewFieldType("text")
    setNewFieldChildren([])
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

  const childrenFields = (children: FormFieldChildType[], parentId?: number) => (
    <div className="flex flex-col gap-2 p-4 w-full rounded-b-lg border-2 border-t-0">
      {children.map((child) => (
        <div className="flex gap-2" key={child.id}>
          <Input
            value={child.label}
            onChange={(e) => updateChildLabel(child.id, e.target.value, parentId)}
            placeholder="Option"
          />
          <Button text="Remove" onClick={() => removeChild(child.id, parentId)} />
        </div>
      ))}
      <Button text="Add Option" onClick={() => addNewChild("", parentId)} />
    </div>
  )

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
          {nestedFieldTypes.includes(field.type) &&
            childrenFields(field.children || [], field.id)}
        </Fragment>
      ))}

      <div className="mt-8 w-full border-t-2 border-dashed border-gray-500 pt-4">
        <Input
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
          placeholder="Question"
        />
        {nestedFieldTypes.includes(newFieldType) && childrenFields(newFieldChildren)}
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
              <div
                className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                  formState.autoSave ? " translate-x-full bg-green-500 " : ""
                }`}
              ></div>
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
