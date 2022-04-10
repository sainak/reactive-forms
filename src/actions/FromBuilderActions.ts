import { Field } from "../types/api/api"
import { FieldKind, FormFieldChildType } from "../types/fieldTypes"

type LoadFormAction = {
  type: "loadForm"
  payload: {
    id: number
    title: string
    description: string | null
    is_public: boolean
  }
}

type LoadFieldsAction = {
  type: "loadFields"
  payload: Field[]
}

type UpdateFormTitleAction = {
  type: "updateFormTitle"
  title: string
}

type UpdateFormDescriptionAction = {
  type: "updateFormDescription"
  description: string
}

type AddFieldAction = {
  type: "addField"
  payload: {
    label: string
    type: FieldKind
    children: FormFieldChildType[]
  }
}

type RemoveFieldAction = {
  type: "removeField"
  id: number
}

type ResetFormAction = {
  type: "resetForm"
}

export type FormBuilderActions =
  | LoadFormAction
  | LoadFieldsAction
  | UpdateFormTitleAction
  | UpdateFormDescriptionAction
  | AddFieldAction
  | RemoveFieldAction
  | ResetFormAction
