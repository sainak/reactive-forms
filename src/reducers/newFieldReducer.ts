import { NewFormFieldActions } from "../actions/NewFormFieldActions"
import { FormFieldType } from "../types/fieldTypes"

type NewField = Omit<FormFieldType, "id" | "value">

export default function newFieldReducer(
  state: NewField,
  action: NewFormFieldActions
): NewField {
  switch (action.type) {
    case "updateNewFieldLabel":
      return { ...state, label: action.label }

    case "updateNewFieldType":
      return { ...state, type: action.kind }

    case "addNewFieldChild":
      return {
        ...state,
        children: [
          ...state.children,
          {
            id: Number(new Date()),
            label: action.label,
          },
        ],
      }

    case "removeNewFieldChild":
      return {
        ...state,
        children: state.children.filter((child) => child.id !== action.id),
      }

    case "updateNewFieldChildLabel":
      return {
        ...state,
        children: state.children.map((child) => {
          if (child.id === action.id) {
            return {
              ...child,
              label: action.label,
            }
          }
          return child
        }),
      }

    case "resetNewField":
      return {
        label: "",
        type: "text",
        children: [],
      }
  }
}
