import { Link, navigate, useQueryParams } from "raviger"
import React, { useEffect, useState } from "react"
import { ReactComponent as BinIcon } from "../img/bin.svg"
import { ReactComponent as SearchIcon } from "../img/search.svg"
import { loadAllQuizForms } from "../utils/formUtils"

export default function QuizAttemptsList(props: {}) {
  const [forms, setForms] = useState(() => loadAllQuizForms())
  const [{ search }, setQuery] = useQueryParams()
  const [searchString, setSearchString] = useState(() => search ?? "")

  const deleteForm = (id: number) => {
    const filteredLocalForms = forms.filter((formFilter) => formFilter.id !== id)
    setForms(filteredLocalForms)
    localStorage.removeItem(`answeredForm_${id}`)
  }

  const filterForms = (search?: string) => {
    if (!search) return forms
    return forms.filter((form) => {
      return (
        form.label.toLowerCase().includes(search?.toLowerCase()) ||
        form.id === parseInt(search)
      )
    })
  }

  let filteredForms = filterForms(searchString)

  useEffect(() => {
    filteredForms = filterForms(searchString)
    let timeout = setTimeout(() => {
      if (searchString) {
        navigate("/attempts", {
          replace: true,
          query: { search: searchString }
        })
      } else {
        navigate("/attempts", { replace: true })
      }
    }, 1500)
    return () => clearTimeout(timeout)
  }, [searchString])

  return (
    <>
      <div>
        <form
          action=""
          method="get"
          onSubmit={(e) => {
            e.preventDefault()
            setQuery({ search: searchString })
            navigate("/attempts", { query: { search: searchString } })
          }}
        >
          <div className="relative mb-4">
            <button type="submit" title="search">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <SearchIcon className="h-5 w-5 text-gray-600" />
              </span>
            </button>
            <input
              type="search"
              name="search"
              className=" w-full rounded-lg border-2 border-gray-200 p-2 pl-10"
              onChange={(e) => setSearchString(e.target.value)}
              value={searchString}
              id="id_search"
              placeholder="Search"
              autoComplete="off"
            />
          </div>
        </form>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        {filteredForms.map((form) => (
          <div
            key={form.id}
            className=" flex w-full items-center rounded-lg p-2 hover:bg-sky-200 gap-2"
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
              className="ml-auto rounded-lg bg-red-500 p-2.5 font-bold text-white transition duration-300 ease-in-out hover:bg-red-700 "
              onClick={() => deleteForm(form.id)}
              title="delete"
            >
              <BinIcon className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
