import { Link, navigate } from "raviger"
import { useEffect, useState } from "react"
import { ReactComponent as CircleIcon } from "../img/circle.svg"
import { FormQuizType } from "../types/formTypes"
import { loadQuizForm, saveQuizForm } from "../utils/formUtils"
import Button from "./Button"
import FormQuizElement from "./FormQuizField"

export default function FromQuiz(props: { attemptId: number; questionId: number }) {
  const [quizState, setQuizState] = useState<FormQuizType>(() => {
    return loadQuizForm(props.attemptId)
  })

  const [saveStatus, setSaveStatus] = useState(true)

  const updateFieldValue = (key: number, value: string) => {
    setQuizState({
      ...quizState,
      fields: quizState.fields.map((field) => {
        if (field.id === key) {
          return { ...field, value }
        }
        return field
      })
    })
  }

  const submitForm = () => {
    setQuizState({ ...quizState, answered: true })
    saveQuizForm(quizState)
    navigate(`/preview/${quizState.id}`, { replace: true })
  }

  useEffect(() => {
    setSaveStatus(false)
    let timeout = setTimeout(() => {
      saveQuizForm(quizState)
      setSaveStatus(true)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [quizState])

  if (!quizState.id) {
    return (
      <div className="text-center text-xl">
        The resource you are looking for does not exist.
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="my-2 w-full border-b-2 border-gray-400 text-center p-2 text-xl font-semibold">
        {quizState.label}
      </div>
      {quizState.fields.length === 0 ? (
        <div className="text-center text-xl">No questions found.</div>
      ) : quizState.answered ? (
        <>
          <span className="text-right w-full text-gray-600 mb-4">
            Attempt Id: {quizState.id}
          </span>
          <div className="flex flex-col gap-2 w-full">
            {quizState.fields.map((field) => (
              <FormQuizElement
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                value={field.value}
                children={field.children}
                updateFieldValueCB={undefined}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-2 w-full text-gray-600 flex-wrap">
            <div className="p-1">
              <CircleIcon
                className={`w-4 h-4 transition-colors duration-300 ${
                  saveStatus ? " text-green-500 " : " text-yellow-500 "
                }`}
              />
            </div>
            <span>
              Question {props.questionId + 1} of {quizState.fields.length}
            </span>
            <span className="ml-auto">
              Attempt Id: {quizState.id} | Question Id:{" "}
              {quizState.fields[props.questionId]?.id ?? 0}
            </span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <FormQuizElement
              {...quizState.fields[props.questionId]}
              updateFieldValueCB={updateFieldValue}
            />
          </div>
          <div className="flex w-full justify-between mt-4">
            {props.questionId === 0 || props.questionId > quizState.fields.length ? (
              <div></div>
            ) : (
              <Link
                className="block rounded-lg bg-sky-500 px-5 py-2 text-center text-white transition duration-300 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 "
                href={`/preview/${quizState.id}/${props.questionId - 1}`}
              >
                Previous
              </Link>
            )}
            {props.questionId === quizState.fields.length - 1 ? (
              <Button onClick={submitForm}>Submit</Button>
            ) : (
              <Link
                className="block rounded-lg bg-sky-500 px-5 py-2 text-center text-white transition duration-300 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 "
                href={`/preview/${quizState.id}/${props.questionId + 1}`}
              >
                Next
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  )
}
