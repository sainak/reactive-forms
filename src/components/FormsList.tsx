import React, { useEffect, useState } from "react"
import { Link, navigate, useQueryParams } from "raviger"
import { getLocalForms, saveForms } from "./Form/utils"
import { ReactComponent as BinIcon } from "../img/bin.svg"
import { ReactComponent as SearchIcon } from "../img/search.svg"

export default function FormsList(props: {}) {
  const [forms, setForms] = useState(getLocalForms())
  const [{ search }, setQuery] = useQueryParams()
  const [searchString, setSearchString] = useState(() => search ?? "")

  const deleteForm = (id: number) => {
    const filteredLocalForms = forms.filter((formFilter) => formFilter.id !== id)
    setForms(filteredLocalForms)
    saveForms(filteredLocalForms)
  }

  const filterForms = (search?: string) => {
    if (!search) return forms
    return forms.filter((form) => {
      return form.label.toLowerCase().includes(search?.toLowerCase())
    })
  }

  let filteredForms = filterForms(searchString)

  useEffect(() => {
    filteredForms = filterForms(searchString)
    /*if (searchString) {
      navigate("/", {
        replace: true,
        query: { search: searchString }
      })
    } */
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
            navigate("/", { query: { search: searchString } })
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
            className=" flex w-full items-center rounded-lg p-2 hover:bg-sky-200"
          >
            <Link
              className="h-full w-full cursor-pointer px-4 text-lg"
              href={`/form/${form.id}`}
            >
              <span className="block">{form.label}</span>
              <span className="block text-sm text-gray-500">
                {form.fields.length} questions
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
      <Link
        href="/form/new"
        className="block w-full rounded-lg bg-sky-500 px-5 py-2 text-center text-white transition duration-300 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 "
      >
        New Form
      </Link>
    </>
  )
}
