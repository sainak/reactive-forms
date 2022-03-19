import { FormInputType, FormQuizType, FormType } from "../types/formTypes"

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

export const loadAllQuizForms = (): FormQuizType[] => {
  const answeredForms = Object.keys(localStorage).filter((key) =>
    key.startsWith("answeredForm_")
  )
  return answeredForms.map((key) => JSON.parse(localStorage.getItem(key) || "[]"))
}

export const loadQuizForm = (id: number) => {
  return JSON.parse(localStorage.getItem(`answeredForm_${id}`) || "{}")
}

export const saveQuizForm = (form: FormQuizType) => {
  localStorage.setItem(`answeredForm_${form.id}`, JSON.stringify(form))
}
