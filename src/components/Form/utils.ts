import { FormInputType } from "../FormInput"
import { FormType } from "./types"

const initialFormFields: FormInputType[] = [
  { id: 1, label: "First Name", type: "text", value: "Aakash" },
  { id: 2, label: "Last Name", type: "text", value: "Singh" },
  { id: 3, label: "Email", type: "email", value: "aakash@example.com" },
  { id: 4, label: "Date of Birth", type: "date", value: "2001-01-01" }
]

export const getLocalForms = (): FormType[] =>
  JSON.parse(localStorage.getItem("savedForms") || "[]")

export const saveForms = (forms: FormType[]) =>
  localStorage.setItem("savedForms", JSON.stringify(forms))

export const getInitialState = (id: number) => {
  const localForms = getLocalForms()
  if (!isNaN(id) && localForms.length > 0) {
    id = Number(id)
    const form = localForms.find((form) => form.id === id)
    if (form) {
      return form
    }
  }
  return {
    id: Number(new Date()),
    label: `Untitled Form ${localForms.length + 1}`,
    autoSave: true,
    fields: initialFormFields
  }
}

export const updatedForms = (form: FormType) => {
  const localForms = getLocalForms()
  const filteredLocalForms = localForms.filter(
    (formFilter) => formFilter.id !== form.id
  )
  return [...filteredLocalForms, form]
}
