import { useEffect, useState } from "react"
import { formFieldApi, submissionApi } from "../helpers/api"
import useTitle from "../hooks/useTitle"
import { Field, Submission } from "../types/api/api"
import FormQuizElement from "./FormQuizField"
import Paginator from "./Paginator"

export interface FromPreviewProps {
  formId: number
  attemptId: number
}

export default function FromPreview({ formId, attemptId }: FromPreviewProps) {
  useTitle("Preview")

  const [state, setState] = useState<Submission>()
  const [fields, setFields] = useState<Field[]>([])

  const [page, setPage] = useState({
    count: 0,
    limit: 7,
    offset: 0,
  })

  useEffect(() => {
    submissionApi.get(formId, attemptId).then((data) => {
      setState(data)
    })
  }, [])

  useEffect(() => {
    formFieldApi.list(formId, page).then((data) => {
      setFields(data.results)
      setPage({ ...page, count: data.count })
    })
  }, [page.offset])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="my-2 w-full border-b-2 border-gray-400 p-2 text-center text-xl font-semibold">
        {state?.form.title}
      </div>
      <span className="mb-4 w-full text-right text-gray-600">
        Attempt Id: {state?.id}
      </span>
      <div className="flex w-full flex-col gap-2">
        {fields.map((field) => {
          const answer = state?.answers.find((answer) => answer.form_field === field.id)
          return (
            <FormQuizElement
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.meta.kind}
              value={answer?.value || ""}
              children={field.meta.children}
              updateFieldValueCB={undefined}
            />
          )
        })}
      </div>
      <div className="w-full mt-8">
        <Paginator
          {...page}
          changePageCB={(offset) => {
            setPage({ ...page, offset })
          }}
        />
      </div>
    </div>
  )
}
