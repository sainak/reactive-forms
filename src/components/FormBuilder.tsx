import { Link, navigate } from "raviger"
import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react"
import formBuilderReducer from "../reducers/formBuilderReducer"
import newFieldReducer from "../reducers/newFieldReducer"
import { FormFieldChildType, FormFieldType } from "../types/fieldTypes"
import {
  getInitialState,
  isNestedField,
  saveForms,
  updatedForms,
} from "../utils/formUtils"
import Button from "./Button"
import Input from "./Input"
import Select, { SelectItems } from "./Select"

const formFieldTypeOptions: SelectItems[] = [
  { label: "Text", value: "text" },
  { label: "Textarea", value: "textarea" },
  { label: "Number", value: "number" },
  { label: "Telephone", value: "tel" },
  { label: "Email", value: "email" },
  { label: "Date", value: "date" },
  { label: "Time", value: "time" },
  { label: "DateTime Local", value: "datetime-local" },
  { label: "Radio Group", value: "radio" },
  { label: "Select", value: "select" },
  { label: "Multi Select", value: "select-multiple" },
]

export default function FormBuilder(props: { formId: number }) {
  const [formState, formDispatch] = useReducer(
    formBuilderReducer,
    getInitialState(props.formId)
  )

  const [newFieldState, newFieldDispatch] = useReducer(newFieldReducer, {
    label: "",
    type: "text",
    children: [],
  })

  const [isSaved, setIsSaved] = useState(false)
  const formTitleRef = useRef<HTMLInputElement>(null)

  const saveAllForms = useCallback(() => {
    if (formState.fields.length > 0) {
      saveForms(updatedForms(formState))
      setIsSaved(true)
    }
  }, [formState])

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

  useEffect(() => {
    setIsSaved(false)
    if (formState.autoSave) {
      let timeout = setTimeout(() => {
        saveAllForms()
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [formState, saveAllForms])

  const renderChildren = (children: FormFieldChildType[], parentId?: number) => (
    <div className="flex w-full flex-col gap-2 rounded-b-lg border-2 border-t-0 p-4">
      {children.map((child) => (
        <div className="flex gap-2" key={child.id}>
          <Input
            value={child.label}
            onChange={(e) =>
              parentId
                ? formDispatch({
                    type: "updateFieldChild",
                    parentId,
                    id: child.id,
                    label: e.target.value,
                  })
                : newFieldDispatch({
                    type: "updateNewFieldChildLabel",
                    id: child.id,
                    label: e.target.value,
                  })
            }
            placeholder="Option"
          />
          <Button
            text="Remove"
            onClick={() =>
              parentId
                ? formDispatch({ type: "removeFieldChild", parentId, id: child.id })
                : newFieldDispatch({ type: "removeNewFieldChild", id: child.id })
            }
          />
        </div>
      ))}
      <Button
        text="Add Option"
        onClick={() =>
          parentId
            ? formDispatch({ type: "addFieldChild", parentId, label: "" })
            : newFieldDispatch({ type: "addNewFieldChild", label: "" })
        }
      />
    </div>
  )

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between gap-2">
        <Input
          innerRef={formTitleRef}
          placeholder="Form Title"
          value={formState.label}
          onChange={(e) =>
            formDispatch({ type: "updateFormTitle", label: e.target.value })
          }
        />
      </div>

      {formState.fields.map((field) => (
        <Fragment key={field.id}>
          <div className="mt-4 mb-2 flex w-full items-end gap-2">
            <span className="mr-auto font-bold text-gray-600 ">Type: {field.type}</span>
            <Button
              text="Remove"
              onClick={() => formDispatch({ type: "removeField", id: field.id })}
            />
          </div>
          <Input
            key={field.id}
            value={field.label}
            placeholder="Question"
            onChange={(e) =>
              formDispatch({ type: "updateField", id: field.id, label: e.target.value })
            }
          />
          {isNestedField(field.type) && renderChildren(field.children || [], field.id)}
        </Fragment>
      ))}

      <div className="mt-8 w-full border-t-2 border-dashed border-gray-500 pt-4">
        <Input
          value={newFieldState.label}
          onChange={(e) =>
            newFieldDispatch({ type: "updateNewFieldLabel", label: e.target.value })
          }
          placeholder="Question"
        />
        {isNestedField(newFieldState.type) && renderChildren(newFieldState.children)}
        <div className="mt-4 flex items-center justify-between gap-2">
          <Select
            value={newFieldState.type}
            onChange={(e) =>
              newFieldDispatch({
                type: "updateNewFieldType",
                kind: e.target.value as FormFieldType["type"],
              })
            }
            name="fieldType"
            options={formFieldTypeOptions}
          />
          <Button
            text="Add Field"
            onClick={() => {
              formDispatch({
                type: "addField",
                payload: {
                  label: newFieldState.label,
                  type: newFieldState.type,
                  children: newFieldState.children,
                },
              })
              newFieldDispatch({ type: "resetNewField" })
            }}
            fullWidth
          />
        </div>
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-2">
        <Button
          text="Reset Form"
          onClick={() => formDispatch({ type: "resetForm" })}
          fullWidth
          inverted
        />
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
                  formDispatch({
                    type: "updateFormAutoSave",
                    autoSave: e.target.checked,
                  })
                }
                className="sr-only"
              />
              <div className="block h-8 w-14 rounded-full bg-gray-600"></div>
              <div
                className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                  formState.autoSave
                    ? `translate-x-full ${isSaved ? "bg-green-500" : "bg-yellow-500"}`
                    : ""
                } `}
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
        <button
          onClick={saveAllForms}
          className={`w-full rounded-lg px-5 py-1 text-white transition-colors duration-300 focus:ring-4
            ${
              isSaved
                ? " bg-green-500 hover:bg-green-700 focus:ring-green-300 "
                : " bg-yellow-500 hover:bg-yellow-700 focus:ring-yellow-300 "
            }
            ${
              formState.fields.length === 0
                ? "cursor-not-allowed bg-gray-400 hover:bg-gray-300"
                : ""
            }
            `}
          disabled={formState.fields.length === 0}
        >
          Save
        </button>
      </div>
    </div>
  )
}
