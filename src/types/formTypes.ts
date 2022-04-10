import { FormFieldType } from "./fieldTypes"

export interface FormType {
  id: number
  title: string
  description: string | null
  is_public: boolean
  fields: FormFieldType[]
}

export interface FormQuizType {
  id: number
  formId: number
  label: string
  answered: boolean
  fields: FormFieldType[]
}
