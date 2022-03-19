import { Link, navigate } from "raviger"
import { useEffect, useState } from "react"
import { ReactComponent as CircleIcon } from "../img/circle.svg"
import { FormQuizType } from "../types/formTypes"
import { loadQuizForm, saveQuizForm } from "../utils/formUtils"
import Button from "./Button"
import FormQuizField from "./FormQuizField"

export default function FromQuiz(props: { attemptId: number; questionId: number }) {
  const [quizState, setQuizState] = useState<FormQuizType>(() => {
    return loadQuizForm(props.attemptId)
  })

  if (quizState.answered) navigate(`/preview/${quizState.id}`)

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
    saveQuizForm({ ...quizState, answered: true })
    navigate(`/preview/${quizState.id}`, { replace: true })
  }

  if (!quizState.id) {
    return (
      <div className="text-center text-xl">
        The resource you are looking for does not exist.
      </div>
    )
  }

  useEffect(() => {
    setSaveStatus(false)
    let timeout = setTimeout(() => {
      saveQuizForm(quizState)
      setSaveStatus(true)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [quizState])

  let currentQuestion = quizState.fields[props.questionId]

  const selectedQuestion = () => {
    try {
      return (
        <FormQuizField
          key={currentQuestion.id}
          id={currentQuestion.id}
          label={currentQuestion.label}
          type={currentQuestion.type}
          value={currentQuestion.value}
          updateFieldValueCB={updateFieldValue}
        />
      )
    } catch (e) {
      return (
        <div className="flex w-full p-10 justify-center text-xl">Invalid Question</div>
      )
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="my-2 w-full border-b-2 border-gray-400 text-center p-2 text-xl font-semibold">
        {quizState.label}
      </div>
      <div className="flex gap-2 w-full text-gray-600">
        <span className="mr-auto">
          Attempt Id: {quizState.id} | Question Id: {currentQuestion?.id ?? 0}
        </span>
        <span>
          Question {props.questionId + 1} of {quizState.fields.length}
        </span>
        <div className="p-1">
          <CircleIcon
            className={`w-4 h-4 transition-colors duration-300 ${
              saveStatus ? " text-green-500 " : " text-yellow-500 "
            }`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">{selectedQuestion()}</div>
      <div className="flex w-full justify-between mt-4">
        {props.questionId === 0 || props.questionId > quizState.fields.length ? (
          <div></div>
        ) : (
          <Link
            className="block rounded-lg bg-sky-500 px-5 py-2 text-center text-white transition duration-300 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 "
            href={`/quiz/${quizState.id}/${props.questionId - 1}`}
          >
            Previous
          </Link>
        )}
        {props.questionId === quizState.fields.length - 1 ? (
          <Button onClick={submitForm}>Submit</Button>
        ) : (
          <Link
            className="block rounded-lg bg-sky-500 px-5 py-2 text-center text-white transition duration-300 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 "
            href={`/quiz/${quizState.id}/${props.questionId + 1}`}
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}