import { Fragment, useState } from "react"
import { formFieldApi } from "../helpers/api"
import useUpdateDebounceTimeout from "../hooks/useUpdateDebounceTimeout"
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

  useUpdateDebounceTimeout(
    () => {
      formFieldApi
        .patch(formId, state.id, {
          label: state.label,
          meta: {
            kind: state.type,
            children: state.children,
          },
        })
        .then(() => {
          // loading false
        })
    },
    1000,
    [state]
  )

  return (
    <Fragment key={field.id}>
      <div className="mt-4 mb-2 flex w-full items-end gap-2">
        <span className="mr-auto font-bold text-gray-600 ">Type: {field.type}</span>
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
