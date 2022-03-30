import { Link, navigate } from "raviger"
import { useEffect, useReducer, useState } from "react"
import { ReactComponent as CircleIcon } from "../img/circle.svg"
import formQuizReducer from "../reducers/formQuizReducer"
import { loadQuizForm, saveQuizForm } from "../utils/formUtils"
import Button from "./Button"
import FormQuizElement from "./FormQuizField"

export default function FromQuiz(props: { attemptId: number; questionId: number }) {
  const [quizState, quizDispatch] = useReducer(
    formQuizReducer,
    loadQuizForm(props.attemptId)
  )
  const [isSaved, setIsSaved] = useState(false)

  const submitForm = () => {
    quizDispatch({ type: "submitForm" })
    saveQuizForm(quizState)
    navigate(`/preview/${quizState.id}`, { replace: true })
  }

  useEffect(() => {
    setIsSaved(false)
    let timeout = setTimeout(() => {
      saveQuizForm(quizState)
      setIsSaved(true)
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
      <div className="my-2 w-full border-b-2 border-gray-400 p-2 text-center text-xl font-semibold">
        {quizState.label}
      </div>
      {quizState.fields.length === 0 ? (
        <div className="text-center text-xl">No questions found.</div>
      ) : quizState.answered ? (
        <>
          <span className="mb-4 w-full text-right text-gray-600">
            Attempt Id: {quizState.id}
          </span>
          <div className="flex w-full flex-col gap-2">
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
          <div className="flex w-full flex-wrap gap-2 text-gray-600">
            <div className="p-1">
              <CircleIcon
                className={`h-4 w-4 transition-colors duration-300 ${
                  isSaved ? " text-green-500 " : " text-yellow-500 "
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
          <div className="flex  w-full flex-col gap-2">
            <FormQuizElement
              {...quizState.fields[props.questionId]}
              updateFieldValueCB={(id, value) => {
                quizDispatch({ type: "updateField", id, value })
              }}
            />
          </div>
          <div className="mt-4 flex w-full justify-between">
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
