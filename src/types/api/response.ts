import { Field, Form, Submission } from "./api"

export type Page<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type LoginResponse = {
  token: string
}

export type FromResponse = Form

export type FieldResponse = Field

export type SubmissionResponse = Submission
