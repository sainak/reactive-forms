type UpdateFieldAction = {
  type: "updateField"
  id: number
  value: string
}

type SubmitFormAction = {
  type: "submitForm"
}

export type FormQuizActions = UpdateFieldAction | SubmitFormAction
