import { Switch } from "@headlessui/react"
import { navigate } from "raviger"
import React, { useState } from "react"
import { formApi } from "../helpers/api"
import { Errors } from "../types/api/api"
import { FormRequest } from "../types/api/request"
import Button from "./Button"
import Input from "./Input"

export default function CreateForm() {
  const [form, setForm] = useState<FormRequest>({
    title: "",
    description: "",
    is_public: false,
  })

  const [errors, setErrors] = useState<Errors<FormRequest>>({})

  const validateForm = (form: FormRequest) => {
    const errors: Errors<FormRequest> = {}

    if (form.title.length < 1) {
      errors.title = "Title is required"
    } else if (form.title.length > 100) {
      errors.title = "Title must be less than 100 characters"
    }

    if (form.description && form.description.length > 1000) {
      errors.description = "Description must be less than 100 characters"
    }
    return errors
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validateForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      formApi.post(form).then((data) => {
        navigate(`/form/${data.id}/`)
      })
    }
  }

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="my-2 text-2xl">Create Form</h1>
      <form className="flex flex-col gap-4 pt-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className={`${errors.title ? "text-red-500" : ""}`}>
            Title
          </label>
          <Input id="title" name="title" value={form.title} onChange={handleChange} />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label
            htmlFor="description"
            className={`${errors.description ? "text-red-500" : ""}`}
          >
            Description
          </label>
          <Input
            id="description"
            name="description"
            value={form.description ?? ""}
            onChange={handleChange}
          />

          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>
        <div className="flex items-center">
          <Switch
            checked={form.is_public ?? false}
            id="is_public"
            onChange={() => {
              setForm({ ...form, is_public: !form.is_public })
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full bg-slate-500 transition-all`}
          >
            <span className="sr-only">Is Public</span>
            <span
              className={`${
                form.is_public ? "translate-x-6 bg-sky-500" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200`}
            />
          </Switch>
          <label htmlFor="is_public" className="ml-2">
            Is Public
          </label>
        </div>
        <Button text="Create" onClick={() => {}} fullWidth />
      </form>
    </div>
  )
}
