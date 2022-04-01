import { Form } from "./api"

export type FormRequest = Pick<Form, "title" | "description" | "is_public">
