import { Link } from "raviger"
import React, { useEffect, useReducer, useRef, useState } from "react"
import { formApi, formFieldApi } from "../helpers/api"
import useTitle from "../hooks/useTitle"
import useUpdateDebounceTimeout from "../hooks/useUpdateDebounceTimeout"
import formBuilderReducer from "../reducers/formBuilderReducer"
import newFieldReducer from "../reducers/newFieldReducer"
import { Errors } from "../types/api/api"
import { FieldRequest, PageParams } from "../types/api/request"
import { FormFieldType } from "../types/fieldTypes"
import { isNestedField } from "../utils/formUtils"
import Button from "./Button"
import FormField from "./FormField"
import Input from "./Input"
import Paginator from "./Paginator"
import Select, { SelectItems } from "./Select"

const formFieldTypeOptions: SelectItems[] = [
  { label: "Text", value: "text" },
  { label: "Textarea", value: "textarea" },
  { label: "Number", value: "number" },
  { label: "Telephone", value: "tel" },
  { label: "Email", value: "email" },
  { label: "Date", value: "date" },
  { label: "Time", value: "time" },
  { label: "DateTime Local", value: "datetime-local" },
  { label: "Radio Group", value: "radio" },
  { label: "Select", value: "select" },
  { label: "Multi Select", value: "select-multiple" },
]

export default function FormBuilder(props: { formId: number }) {
  useTitle("Form Builder")

  const [formState, formDispatch] = useReducer(formBuilderReducer, {
    fields: [],
    id: 0,
    description: "",
    title: "",
    is_public: false,
  })

  const [page, setPage] = useState({
    count: 0,
    limit: 4, //TODO: set this to 20 after testing
    offset: 0,
  })

  const [newFieldState, newFieldDispatch] = useReducer(newFieldReducer, {
    label: "",
    type: "text",
    children: [],
  })

  const [isSaved, setIsSaved] = useState(false)
  const formTitleRef = useRef<HTMLInputElement>(null)

  const [errors, setErrors] = useState<Errors<typeof newFieldState>>({})

  const validateNewField = (field: typeof newFieldState) => {
    const errors: Errors<typeof newFieldState> = {}

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

  const fetchForm = (formId: number) => {
    formApi.get(formId).then((data) => {
      //loading false
      formDispatch({
        type: "loadForm",
        payload: {
          id: data.id,
          title: data.title,
          description: data.description,
          is_public: data.is_public,
        },
      })
    })
  }

  const fetchFields = (page: PageParams) => {
    formFieldApi.list(props.formId, page).then((data) => {
      formDispatch({
        type: "loadFields",
        payload: data.results,
      })
      setPage({ ...page, count: data.count })
    })
  }

  const createNewField = () => {
    const validationErrors = validateNewField(newFieldState)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      const payload: FieldRequest = {
        label: newFieldState.label,
        meta: {
          kind: newFieldState.type,
          children: newFieldState.children,
        },
      }
      formFieldApi.post(props.formId, payload).then((data) => {
        // set page as last page
        setPage({
          ...page,
          offset: Math.floor(page.count / page.limit) * page.limit,
        })
        newFieldDispatch({ type: "resetNewField" })
        //loading false
      })
    }
  }

  const removeField = (id: number) => {
    formFieldApi.delete(props.formId, id).then(() => {
      fetchFields(page)
      // loading false
    })
  }

  useUpdateDebounceTimeout(
    () => {
      formApi
        .patch(props.formId, {
          title: formState.title,
          description: formState.description,
        })
        .then((data) => {
          //loading false
        })
    },
    1000,
    [formState.title, formState.description]
  )

  useEffect(() => {
    fetchForm(props.formId)
  }, [])

  useEffect(() => {
    fetchFields(page)
  }, [page.offset])

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-col items-center justify-between gap-2">
        <Input
          innerRef={formTitleRef}
          placeholder="Form Title"
          value={formState.title}
          onChange={(e) =>
            formDispatch({ type: "updateFormTitle", title: e.target.value })
          }
        />
        <Input
          placeholder="Description"
          value={formState.description ?? ""}
          onChange={(e) =>
            formDispatch({ type: "updateFormDescription", description: e.target.value })
          }
        />
      </div>

      {formState.fields.map((field) => (
        <FormField
          key={field.id + Number(new Date())} // need to re render fields so they dont spam update
          formId={props.formId}
          field={field}
          formDispatchCB={formDispatch}
          removeFieldCB={removeField}
        />
      ))}

      <div className="mt-8 w-full">
        <Paginator
          {...page}
          changePageCB={(offset) => {
            setPage({ ...page, offset })
          }}
          objectName="fields"
        />
      </div>

      <div className="mt-4 w-full border-t-2 border-dashed border-gray-500 pt-4">
        <Input
          value={newFieldState.label}
          onChange={(e) =>
            newFieldDispatch({ type: "updateNewFieldLabel", label: e.target.value })
          }
          placeholder="Question"
        />
        {errors.label && <p className="text-red-500">{errors.label}</p>}
        {isNestedField(newFieldState.type) && (
          <div className="flex w-full flex-col gap-2 rounded-b-lg border-2 border-t-0 p-4">
            {newFieldState.children.map((child) => (
              <div className="flex gap-2" key={child.id}>
                <Input
                  value={child.label}
                  onChange={(e) =>
                    newFieldDispatch({
                      type: "updateNewFieldChildLabel",
                      id: child.id,
                      label: e.target.value,
                    })
                  }
                  placeholder="Option"
                />
                <Button
                  text="Remove"
                  onClick={() =>
                    newFieldDispatch({ type: "removeNewFieldChild", id: child.id })
                  }
                />
              </div>
            ))}
            {errors.children && <p className="text-red-500">{errors.children}</p>}
            <Button
              text="Add Option"
              onClick={() => newFieldDispatch({ type: "addNewFieldChild", label: "" })}
            />
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          <Select
            value={newFieldState.type}
            onChange={(e) =>
              newFieldDispatch({
                type: "updateNewFieldType",
                kind: e.target.value as FormFieldType["type"],
              })
            }
            name="fieldType"
            options={formFieldTypeOptions}
          />
          <Button text="Add Field" onClick={() => createNewField()} fullWidth />
        </div>
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-2">
        <Link
          href="/"
          className="block w-full rounded-lg bg-sky-500 px-5 py-2 text-center text-white transition duration-300 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 "
        >
          Close
        </Link>
        <Link
          href="/"
          className="block w-full rounded-lg bg-sky-500 px-5 py-2 text-center text-white transition duration-300 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 "
        >
          Preview
        </Link>
      </div>
    </div>
  )
}
