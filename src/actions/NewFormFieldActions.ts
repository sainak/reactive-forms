import { FieldKind } from "../types/fieldTypes"

type UpdateNewFieldLabelAction = {
  type: "updateNewFieldLabel"
  label: string
}

type UpdateNewFieldTypeAction = {
  type: "updateNewFieldType"
  kind: FieldKind
}

type AddNewFieldChildAction = {
  type: "addNewFieldChild"
  label: string
}

type RemoveNewFieldChildAction = {
  type: "removeNewFieldChild"
  id: number
}

type UpdateNewFieldChildLabelAction = {
  type: "updateNewFieldChildLabel"
  id: number
  label: string
}

type ResetNewFieldAction = {
  type: "resetNewField"
}

export type NewFormFieldActions =
  | UpdateNewFieldLabelAction
  | UpdateNewFieldTypeAction
  | AddNewFieldChildAction
  | RemoveNewFieldChildAction
  | UpdateNewFieldChildLabelAction
  | ResetNewFieldAction
