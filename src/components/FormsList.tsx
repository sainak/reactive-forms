import { ClipboardListIcon, LightBulbIcon, TrashIcon } from "@heroicons/react/outline"
import { Link, navigate, useQueryParams } from "raviger"
import React, { useEffect, useState } from "react"
import { formApi } from "../helpers/api"
import useTitle from "../hooks/useTitle"
import { PageParams } from "../types/api/request"
import { FromResponse } from "../types/api/response"
import Button from "./Button"
import CreateForm from "./CreateForm"
import Modal from "./Modal"
import Paginator from "./Paginator"
import { SearchBar } from "./SearchBar"

export default function FormsList(props: {}) {
  useTitle("Home")

  const [forms, setForms] = useState<FromResponse[]>([])
  const [newForm, setNewForm] = useState(false)
  const [{ search }, setQuery] = useQueryParams()
  const [searchString, setSearchString] = useState(() => search ?? "")

  const [page, setPage] = useState({
    count: 0,
    limit: 7,
    offset: 0,
  })

  const deleteForm = (id: number) => {
    const filteredLocalForms = forms.filter((formFilter) => formFilter.id !== id)
    formApi.delete(id).then(() => {
      setForms(filteredLocalForms)
    })
  }
  const fetchForms = (page: PageParams) => {
    formApi.list(page).then((data) => {
      setForms(data.results)
      setPage({ ...page, count: data.count })
    })
  }

  const filterForms = (search?: string) => {
    if (!search) return forms
    return forms.filter((form) => {
      return (
        form.title.toLowerCase().includes(search?.toLowerCase()) ||
        form.description?.toLowerCase().includes(search?.toLowerCase())
      )
    })
  }

  let filteredForms = filterForms(searchString)

  useEffect(() => {
    filteredForms = filterForms(searchString)
    let timeout = setTimeout(() => {
      if (searchString) {
        navigate("/", {
          replace: true,
          query: { search: searchString },
        })
      } else {
        navigate("/", { replace: true })
      }
    }, 1500)
    return () => clearTimeout(timeout)
  }, [searchString])

  useEffect(() => {
    fetchForms(page)
  }, [page.offset])

  return (
    <>
      <SearchBar
        searchString={searchString}
        onFormSubmit={() => {
          navigate("/", { replace: true, query: { search: searchString } })
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
              href={`/form/${form.id}`}
            >
              <span className="block">{form.title}</span>
              <span className="block text-sm text-gray-500">{form.description}</span>
            </Link>
            <Link
              className="ml-auto rounded-lg bg-yellow-500 p-2 font-bold text-white transition duration-300 ease-in-out hover:bg-yellow-700 "
              href={`/attempts/${form.id}`}
              title="attempts"
            >
              <ClipboardListIcon className="h-5 w-5 text-white" />
            </Link>
            <Link
              className="rounded-lg bg-green-500 p-2 font-bold text-white transition duration-300 ease-in-out hover:bg-green-700 "
              href={`/quiz/${form.id}/0`}
              title="quiz"
            >
              <LightBulbIcon className="h-5 w-5 text-white" />
            </Link>
            <button
              className="rounded-lg bg-red-500 p-2 font-bold text-white transition duration-300 ease-in-out hover:bg-red-700 "
              onClick={() => deleteForm(form.id)}
              title="delete"
            >
              <TrashIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        ))}
      </div>
      <Paginator
        {...page}
        changePageCB={(offset) => {
          setPage({ ...page, offset })
        }}
        objectName="forms"
      />
      <Button text="New Form" onClick={() => setNewForm(true)} fullWidth />

      <Modal isOpen={newForm} closeCB={() => setNewForm(false)}>
        <CreateForm />
      </Modal>
    </>
  )
}
