import { Fragment, useState } from "react"
import { formFieldApi } from "../helpers/api"
import useUpdateDebounceTimeout from "../hooks/useUpdateDebounceTimeout"
import { Errors } from "../types/api/api"
import { FormFieldType } from "../types/fieldTypes"
import { isNestedField } from "../utils/formUtils"
import Button from "./Button"
import Input from "./Input"

interface FormFieldProps {
  formId: number
  field: FormFieldType
  formDispatchCB: React.Dispatch<any>
  removeFieldCB: (fieldId: number) => void
}

export default function FormField({
  formId,
  field,
  formDispatchCB,
  removeFieldCB,
}: FormFieldProps) {
  const [state, setState] = useState(field)

  const [errors, setErrors] = useState<Errors<FormFieldType>>({})

  const [loading, setLoading] = useState(false)

  const validateField = (field: FormFieldType) => {
    const errors: Errors<FormFieldType> = {}

    if (field.label.length < 1) {
      errors.label = "Label is required"
    } else if (field.label.length > 100) {
      errors.label = "Label must be less than 100 characters"
    }

    if (isNestedField(field.type)) {
      if (field.children.length < 1) {
        errors.children = "Options are required"
      } else {
        field.children.forEach((child, index) => {
          if (child.label.length < 1) {
            errors.children = `Option ${index + 1} label is required`
          } else if (child.label.length > 100) {
            errors.children = `Option ${
              index + 1
            } label must be less than 100 characters`
          }
        })
      }
    }
    return errors
  }

  useUpdateDebounceTimeout(
    () => {
      const errors = validateField(state)
      setErrors(errors)
      if (Object.keys(errors).length === 0) {
        setLoading(true)
        formFieldApi
          .patch(formId, state.id, {
            label: state.label,
            meta: {
              kind: state.type,
              children: state.children,
            },
          })
          .then(() => {
            setLoading(false)
          })
      }
    },
    1000,
    [state]
  )

  return (
    <Fragment key={field.id}>
      <div className="mt-4 mb-2 flex w-full items-center gap-2">
        <span className="mr-auto font-bold text-gray-600 mt-auto">
          Type: <span className="capitalize">{field.type}</span>
        </span>
        {loading && (
          <span className="animate-ping h-4 w-4 rounded-full bg-yellow-500 mr-2"></span>
        )}
        <Button text="Remove" onClick={() => removeFieldCB(field.id)} />
      </div>
      <Input
        value={state.label}
        placeholder="Question"
        onChange={(e) =>
          setState({
            ...state,
            label: e.target.value,
          })
        }
      />
      {errors.label && <p className="text-red-500">{errors.label}</p>}
      {isNestedField(state.type) && (
        <div className="flex w-full flex-col gap-2 rounded-b-lg border-2 border-t-0 p-4">
          {state.children.map((child) => (
            <div className="flex gap-2" key={child.id}>
              <Input
                value={child.label}
                onChange={(e) =>
                  setState({
                    ...state,
                    children: state.children.map((childMap) => {
                      if (childMap.id === child.id) {
                        return {
                          ...childMap,
                          label: e.target.value,
                        }
                      }
                      return childMap
                    }),
                  })
                }
                placeholder="Option"
              />
              <Button
                text="Remove"
                onClick={() =>
                  setState({
                    ...state,
                    children: state.children.filter((c) => c.id !== child.id),
                  })
                }
              />
            </div>
          ))}
          {errors.children && <p className="text-red-500">{errors.children}</p>}
          <Button
            text="Add Option"
            onClick={() =>
              setState({
                ...state,
                children: [...state.children, { id: Number(new Date()), label: "" }],
              })
            }
          />
        </div>
      )}
    </Fragment>
  )
}
