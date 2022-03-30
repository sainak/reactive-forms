import { FormQuizActions } from "../actions/FormQuizActions"
import { FormQuizType } from "../types/formTypes"

export default function formQuizReducer(
  state: FormQuizType,
  action: FormQuizActions
): FormQuizType {
  switch (action.type) {
    case "updateField":
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id === action.id) {
            return {
              ...field,
              value: action.value,
            }
          }
          return field
        }),
      }

    case "submitForm":
      return {
        ...state,
        answered: true,
      }
  }
}
