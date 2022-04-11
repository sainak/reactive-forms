import { Link } from "raviger"
import React, { useEffect, useState } from "react"
import { submissionApi } from "../helpers/api"
import useTitle from "../hooks/useTitle"
import { SubmissionResponse } from "../types/api/response"
import Paginator from "./Paginator"

export default function QuizAttemptsList(props: { formId: number }) {
  useTitle("Quiz Attempts")

  const [state, setState] = useState<SubmissionResponse[]>([])

  const [page, setPage] = useState({
    count: 0,
    limit: 7,
    offset: 0,
  })

  useEffect(() => {
    submissionApi.list(props.formId, page).then((data) => {
      setState(data.results)
      setPage({ ...page, count: data.count })
    })
  }, [page.offset])

  return (
    <div className="mb-4 flex flex-col gap-2">
      {state.map((submission) => (
        <div
          key={submission.id}
          className=" flex w-full items-center gap-2 rounded-lg p-2 hover:bg-sky-200"
        >
          <Link
            className="h-full w-full cursor-pointer px-4 text-lg"
            href={`/preview/${submission.form.id}/${submission.id}`}
          >
            <span className="block">{submission.form.title}</span>
            <span className="block text-sm text-gray-500">
              Attempt Id: {submission.id} | Form Id: {submission.form.id}
            </span>
          </Link>
        </div>
      ))}
      <Paginator
        {...page}
        changePageCB={(offset) => {
          setPage({ ...page, offset })
        }}
        objectName="submissions"
      />
    </div>
  )
}
