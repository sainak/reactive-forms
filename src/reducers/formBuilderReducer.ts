import { FormBuilderActions } from "../actions/FromBuilderActions"
import { FormType } from "../types/formTypes"
import { getInitialState } from "../utils/formUtils"

export default function formBuilderReducer(
  state: FormType,
  action: FormBuilderActions
): FormType {
  switch (action.type) {
    case "updateFormTitle":
      return { ...state, label: action.label }

    case "updateFormAutoSave":
      return { ...state, autoSave: action.autoSave }

    case "addField":
      return {
        ...state,
        fields: [
          ...state.fields,
          {
            id: Number(new Date()),
            value: "",
            ...action.payload,
          },
        ],
      }

    case "removeField":
      return {
        ...state,
        fields: state.fields.filter((field) => field.id !== action.id),
      }

    case "updateField":
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id === action.id) {
            return {
              ...field,
              label: action.label,
            }
          }
          return field
        }),
      }

    case "addFieldChild":
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id === action.parentId) {
            return {
              ...field,
              children: [
                ...field.children,
                {
                  id: Number(new Date()),
                  value: "",
                  label: action.label,
                },
              ],
            }
          }
          return field
        }),
      }

    case "removeFieldChild":
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id === action.parentId) {
            return {
              ...field,
              children: field.children.filter((child) => child.id !== action.id),
            }
          }
          return field
        }),
      }

    case "updateFieldChild":
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id === action.parentId) {
            return {
              ...field,
              children: field.children.map((child) => {
                if (child.id === action.id) {
                  return {
                    ...child,
                    label: action.label,
                  }
                }
                return child
              }),
            }
          }
          return field
        }),
      }

    case "resetForm":
      return { ...getInitialState(0), id: state.id }
  }
}
