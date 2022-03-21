import { FormFieldType } from "./fieldTypes"

export interface FormType {
  id: number
  label: string
  autoSave: boolean
  fields: FormFieldType[]
}

export interface FormQuizType {
  id: number
  formId: number
  label: string
  answered: boolean
  fields: FormFieldType[]
}
