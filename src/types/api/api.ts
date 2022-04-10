import { FieldKind, FormFieldChildType } from "../fieldTypes"

export type Errors<T> = Partial<Record<keyof T, string>>

export interface Form {
  /** ID */
  id: number
  /** Title */
  title: string
  /** Description */
  description: string | null
  /** Is public */
  is_public: boolean
  /** Created by */
  created_by: number
  /**
   * Created date
   * @format date-time
   */
  created_date: string
  /**
   * Modified date
   * @format date-time
   */
  modified_date: string
}

type fieldMeta = {
  kind: FieldKind
  children: FormFieldChildType[]
}

export interface Field {
  /** ID */
  id: number
  /** Label */
  label: string
  /** Kind */
  kind: "TEXT" | "DROPDOWN" | "RADIO" | "GENERIC" // we are storing field type in meta.kind
  /** Dropdown Options */
  options: object | null // we are storing children in meta.children
  /** Value */
  value: string | null
  /**
   * Meta
   * Additional data for the field
   */
  meta: fieldMeta
}

export interface Answer {
  /* Form Field ID */
  form_field: number
  /* Value */
  value: string
}

export interface Submission {
  /** ID */
  id: number
  /** Form */
  form: Form
  /** Answers */
  answers: Answer[]
  /**
   * Created date
   * @format date-time
   */
  created_date: string
}
