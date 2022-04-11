import { navigate } from "raviger"
import { useEffect, useState } from "react"
import { formApi, formFieldApi, submissionApi } from "../helpers/api"
import useTitle from "../hooks/useTitle"
import { Answer, Field, Form } from "../types/api/api"
import Button from "./Button"
import FormQuizElement from "./FormQuizField"

interface FormQuizProps {
  formId: number
  questionId: number
}

export default function FromQuiz({ formId, questionId }: FormQuizProps) {
  useTitle("Quiz")

  const [form, setForm] = useState<Pick<Form, "id" | "title" | "description">>({
    id: formId,
    title: "",
    description: "",
  })
  const [field, setField] = useState<Field>()
  const [answers, setAnswers] = useState<Answer[]>([])
  const [page, setPage] = useState({
    count: 0,
    limit: 1,
    offset: questionId,
  })

  const submitForm = () => {
    submissionApi.post(formId, { answers }).then((data) => {
      navigate(`/preview/${formId}/${data.id}`, { replace: true })
    })
  }

  const updateAnswer = (id: number, value: string) => {
    const newAnswers = answers.map((answer) => {
      if (answer.form_field === id) {
        return { ...answer, value }
      }
      return answer
    })
    setAnswers(() => newAnswers)
  }

  useEffect(() => {
    formApi.get(formId).then((data) => {
      const { id, title, description } = data
      setForm({ id, title, description })
    })
  }, [])

  useEffect(() => {
    formFieldApi.list(formId, page).then((data) => {
      setField(data.results[0])
      const found = answers.some((answer) => answer.form_field === data.results[0].id)
      if (!found) {
        setAnswers([...answers, { form_field: data.results[0].id, value: "" }])
      }
      setPage({ ...page, count: data.count })
      navigate(`/quiz/${formId}/${page.offset}`)
      //loading false
    })
  }, [page.offset])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full">
        <div className=" w-full text-center text-xl font-semibold">{form?.title}</div>

        <div className="mb-2 w-full border-b-2 border-gray-400 pb-2 text-center text-sm">
          {form?.description}
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-2 text-gray-600">
        <span>
          Question {Math.min(page.offset + 1, page.count)} of {page.count}
        </span>
        <span className="ml-auto">
          {`Form Id: ${form?.id ?? 0} | Question Id: ${field?.id ?? 0}`}
        </span>
      </div>
      <div className="flex  w-full flex-col gap-2">
        <FormQuizElement
          id={field?.id ?? 0}
          label={field?.label ?? ""}
          type={field?.meta.kind ?? "text"}
          children={field?.meta.children ?? []}
          value={
            answers.filter((answer) => answer.form_field === field?.id)[0]?.value ?? ""
          }
          updateFieldValueCB={updateAnswer}
        />
      </div>
      <div className="mt-4 flex w-full justify-between">
        {page.offset < 0 ? (
          <div></div>
        ) : (
          <Button
            onClick={() => {
              setPage({ ...page, offset: page.offset - page.limit })
            }}
          >
            Previous
          </Button>
        )}
        {page.offset === page.count - 1 ? (
          <Button onClick={submitForm}>Submit</Button>
        ) : (
          <Button
            onClick={() => {
              setPage({ ...page, offset: page.offset + page.limit })
            }}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}
