import { Form } from "./api"

export type Page<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type FromResponse = Form
