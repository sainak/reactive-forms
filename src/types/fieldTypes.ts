export type fieldKind =
  | "text"
  | "number"
  | "date"
  | "time"
  | "datetime-local"
  | "email"
  | "tel"
  | "url"
  | "textarea"
  | "select"
  | "select-multiple"
  | "radio"
  | "checkbox"

export interface FormFieldChildType {
  id: number
  label: string
}
export interface FormFieldType {
  id: number
  label: string
  type: fieldKind
  children?: FormFieldChildType[]
  value: string
}
