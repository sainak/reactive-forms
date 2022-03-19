import { useState } from "react"
import { FormQuizType } from "../types/formTypes"
import { loadQuizForm } from "../utils/formUtils"
import Input from "./Input"

export default function FromPreview(props: { attemptId: number }) {
  const [quizState, setQuizState] = useState<FormQuizType>(() =>
    loadQuizForm(props.attemptId)
  )

  if (!quizState.id) {
    return (
      <div className="text-center text-xl">
        The resource you are looking for does not exist.
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="my-2 w-full border-b-2 border-gray-400 text-center p-2 text-xl font-semibold">
        {quizState.label}
      </div>
      <span className="text-right w-full text-gray-600 mb-4">
        Attempt Id: {quizState.id}
      </span>
      <div className="flex flex-col gap-2 w-full">
        {quizState.fields.map((field) => (
          <div key={field.id}>
            <span className="mt-2 w-full text-lg">{field.label}</span>
            <Input type={field.type} value={field.value} disabled />
          </div>
        ))}
      </div>
    </div>
  )
}
