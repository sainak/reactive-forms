import { FormBuilderActions } from "../actions/FromBuilderActions"
import { FormFieldType } from "../types/fieldTypes"
import { FormType } from "../types/formTypes"

export default function formBuilderReducer(
  state: FormType,
  action: FormBuilderActions
): FormType {
  switch (action.type) {
    case "loadForm":
      return { ...state, ...action.payload }

    case "loadFields":
      return {
        ...state,
        fields: action.payload.map<FormFieldType>((field) => {
          return {
            id: field.id,
            label: field.label,
            type: field.meta.kind,
            children: field.meta.children,
            value: field.value ?? "",
          }
        }),
      }

    case "updateFormTitle":
      return { ...state, title: action.title }

    case "updateFormDescription":
      return { ...state, description: action.description }

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

    case "resetForm":
      return {
        id: state.id,
        title: "",
        description: null,
        is_public: false,
        fields: [],
      }
  }
}
