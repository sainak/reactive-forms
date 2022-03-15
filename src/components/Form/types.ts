import { FormInputType } from "../FormInput"

export interface FormType {
  id: number
  label: string
  autoSave: boolean
  fields: FormInputType[]
}
