import { FormInputType } from "../types/formTypes"
import Input from "./Input"

interface FormInputProps extends FormInputType {
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
