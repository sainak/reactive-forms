export interface FormFieldType {
  id: number
  label: string
  type:
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
    | "radio"
    | "checkbox"
  children?: string
  value: string
}
