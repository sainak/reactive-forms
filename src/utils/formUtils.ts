import { FieldKind, nestedSubFieldKind } from "../types/fieldTypes"
import { FormQuizType, FormType } from "../types/formTypes"

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
    fields: [],
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

export const isNestedField = (field: FieldKind) => {
  return Object.values(nestedSubFieldKind).includes(field as any)
}
