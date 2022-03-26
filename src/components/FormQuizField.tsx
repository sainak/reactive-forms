import { FormFieldType } from "../types/fieldTypes"
import Input from "./Input"
import MultiSelect from "./MultiSelect"

interface FormInputProps extends FormFieldType {
  updateFieldValueCB?: (key: number, value: string) => void
}

function FormQuizField(props: FormInputProps) {
  switch (props.type) {
    case "text":
    case "number":
    case "email":
    case "tel":
    case "date":
    case "time":
    case "datetime-local":
    case "url":
      return (
        <Input
          type={props.type}
          value={props.value}
          onChange={(e) => props.updateFieldValueCB?.(props.id, e.target.value)}
          disabled={props.updateFieldValueCB === undefined}
        />
      )
    case "textarea":
      return (
        <textarea
          className="w-full rounded-lg border-2 border-gray-200 p-2"
          value={props.value}
          onChange={(e) => props.updateFieldValueCB?.(props.id, e.target.value)}
          disabled={props.updateFieldValueCB === undefined}
        />
      )
    case "radio":
      return (
        <div>
          {props.children?.map((child) => (
            <div className="flex items-center gap-2" key={child.id}>
              <input
                id={`id_${props.id}_${child.id}`}
                type="radio"
                name={props.id.toString()}
                value={child.id}
                checked={props.value === child.id.toString()}
                disabled={props.updateFieldValueCB === undefined}
                onChange={(e) => props.updateFieldValueCB?.(props.id, e.target.value)}
              />
              <label htmlFor={`id_${props.id}_${child.id}`}>{child.label}</label>
            </div>
          ))}
        </div>
      )
    case "select":
      return (
        <select
          className="w-full rounded-lg border-2 border-gray-200 p-2"
          onChange={(e) =>
            props.updateFieldValueCB?.(
              props.id,
              [...e.target.selectedOptions]
                .filter((option) => option.selected)
                .map((option) => option.value)
                .join(",")
            )
          }
          defaultValue={props.value}
          disabled={props.updateFieldValueCB === undefined}
        >
          {props.children?.map((child) => (
            <option key={child.id} value={child.id}>
              {child.label}
            </option>
          ))}
        </select>
      )
    case "select-multiple":
      return (
        <MultiSelect
          id={props.id}
          disabled={props.updateFieldValueCB === undefined}
          selectedItems={props.value.split(",")}
          items={props.children}
          onChange={(value) => props.updateFieldValueCB?.(props.id, value)}
        />
      )
    default:
      return <div>Unknown field type: {props.type}</div>
  }
}

export default function FormQuizElement(props: FormInputProps) {
  return (
    <div key={props.id}>
      <span className="mt-2 w-full text-lg">{props.label}</span>
      <FormQuizField {...props} />
    </div>
  )
}
