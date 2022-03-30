import { TrashIcon } from "@heroicons/react/outline"
import { Link, navigate, useQueryParams } from "raviger"
import React, { useEffect, useState } from "react"
import useTitle from "../hooks/useTitle"
import { loadAllQuizForms } from "../utils/formUtils"
import { SearchBar } from "./SearchBar"

export default function QuizAttemptsList(props: {}) {
  useTitle("Quiz Attempts")

  const [forms, setForms] = useState(() => loadAllQuizForms())
  const [{ search, formId }, setQuery] = useQueryParams()
  const [searchString, setSearchString] = useState(() => search ?? "")

  const deleteForm = (id: number) => {
    const filteredLocalForms = forms.filter((formFilter) => formFilter.id !== id)
    setForms(filteredLocalForms)
    localStorage.removeItem(`answeredForm_${id}`)
  }

  const filterForms = (search?: string, formId?: string | number) => {
    if (formId) {
      formId = Number(formId)
      return forms.filter((form) => form.formId === formId)
    }
    if (!search) return forms
    return forms.filter((form) => {
      return (
        form.label.toLowerCase().includes(search?.toLowerCase()) ||
        form.id === parseInt(search)
      )
    })
  }

  let filteredForms = filterForms(searchString, formId)

  useEffect(() => {
    filteredForms = filterForms(searchString, formId)
    let timeout = setTimeout(() => {
      if (searchString || formId) {
        navigate("/attempts", {
          replace: true,
          query: { search: searchString, formId: formId },
        })
      } else {
        navigate("/attempts", { replace: true })
      }
    }, 1500)
    return () => clearTimeout(timeout)
  }, [searchString])

  return (
    <>
      <SearchBar
        searchString={searchString}
        onFormSubmit={() => {
          navigate("/attempts", { replace: true, query: { search: searchString } })
        }}
        onSearchStringChange={(value) => setSearchString(value)}
      />
      <div className="mb-4 flex flex-col gap-2">
        {filteredForms.map((form) => (
          <div
            key={form.id}
            className=" flex w-full items-center gap-2 rounded-lg p-2 hover:bg-sky-200"
          >
            <Link
              className="h-full w-full cursor-pointer px-4 text-lg"
              href={`/preview/${form.id}`}
            >
              <span className="block">{form.label}</span>
              <span className="block text-sm text-gray-500">
                Attempt Id: {form.id} | Form Id: {form.formId}
              </span>
            </Link>
            <button
              className="ml-auto rounded-lg bg-red-500 p-2 font-bold text-white transition duration-300 ease-in-out hover:bg-red-700 "
              onClick={() => deleteForm(form.id)}
              title="delete"
            >
              <TrashIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
