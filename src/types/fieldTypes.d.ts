//https://stackoverflow.com/a/54061487/9420669
export enum singleSubFieldKind {
  "text",
  "textarea",
  "number",
  "date",
  "time",
  "datetime-local",
  "email",
  "url",
  "tel",
}

export enum nestedSubFieldKind {
  "radio",
  "select-multiple",
  "select",
  "checkbox",
}

export type SingleSubFieldKind = keyof typeof singleSubFieldKind
export type NestedSubFieldKind = keyof typeof nestedSubFieldKind

export type FieldKind = SingleSubFieldKind | NestedSubFieldKind

export interface FormFieldChildType {
  id: number
  label: string
}

export interface FormFieldType {
  id: number
  label: string
  type: FieldKind
  children: FormFieldChildType[]
  value: string
}
