import { FieldKind, FormFieldChildType } from "../types/fieldTypes"

type UpdateFormTitleAction = {
  type: "updateFormTitle"
  label: string
}

type UpdateFormAutoSaveAction = {
  type: "updateFormAutoSave"
  autoSave: boolean
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

type UpdateFieldAction = {
  type: "updateField"
  id: number
  label: string
}

type AddFieldChildAction = {
  type: "addFieldChild"
  parentId: number
  label: string
}

type RemoveFieldChildAction = {
  type: "removeFieldChild"
  parentId: number
  id: number
}

type UpdateFieldChildAction = {
  type: "updateFieldChild"
  parentId: number
  id: number
  label: string
}

type ResetFormAction = {
  type: "resetForm"
}

export type FormBuilderActions =
  | UpdateFormTitleAction
  | UpdateFormAutoSaveAction
  | AddFieldAction
  | RemoveFieldAction
  | UpdateFieldAction
  | AddFieldChildAction
  | RemoveFieldChildAction
  | UpdateFieldChildAction
  | ResetFormAction
