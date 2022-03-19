import { FormInputType } from "../types/formTypes"
import Input from "./Input"

interface FormInputProps extends FormInputType {
  updateFieldValueCB?: (key: number, value: string) => void
}

export default function FormQuizField(props: FormInputProps) {
  return (
    <div key={props.id}>
      <span className="mt-2 w-full text-lg">{props.label}</span>
      <Input
        type={props.type}
        value={props.value}
        placeholder={props.label}
        onChange={(e) => props.updateFieldValueCB?.(props.id, e.target.value)}
        disabled={props.updateFieldValueCB === undefined}
      />
    </div>
  )
}
