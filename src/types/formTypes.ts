export interface FormType {
  id: number
  label: string
  autoSave: boolean
  fields: FormInputType[]
}

export interface FormQuizType {
  id: number
  formId: number
  label: string
  answered: boolean
  fields: FormInputType[]
}

export interface FormInputType {
  id: number
  label: string
  type: string
  value: string
}
