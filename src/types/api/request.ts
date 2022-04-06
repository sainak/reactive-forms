import { Form } from "./api"

export type NewFormRequest = Pick<Form, "title" | "description" | "is_public">
