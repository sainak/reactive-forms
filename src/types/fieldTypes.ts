//https://stackoverflow.com/a/54061487/9420669
export const singleSubFieldKind = [
  "text",
  "textarea",
  "number",
  "date",
  "time",
  "datetime-local",
  "email",
  "url",
  "tel",
] as const

export const nestedSubFieldKind = [
  "radio",
  "select-multiple",
  "select",
  "checkbox",
] as const

export type SingleSubFieldKind = typeof singleSubFieldKind[number]
export type NestedSubFieldKind = typeof nestedSubFieldKind[number]

export type FieldKind = SingleSubFieldKind | NestedSubFieldKind

export interface FormFieldChildType {
  id: number
  label: string
}

export interface FormFieldType {
  id: number
  label: string
  type: FieldKind
  children?: FormFieldChildType[]
  value: string
}
