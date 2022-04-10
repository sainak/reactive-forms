import { Field, Form, Submission } from "./api"

export type PageParams = {
  limit: number
  offset: number
}

export type LoginRequest = {
  username: string
  password: string
}

export type FormRequest = Pick<Form, "title" | "description" | "is_public">

export type FullFieldRequest = Omit<Field, "id">

export type FieldRequest = Pick<FullFieldRequest, "label" | "meta">

export type SubmissionRequest = Pick<Submission, "answers">
