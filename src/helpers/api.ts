import {
  FieldRequest,
  FormRequest,
  FullFieldRequest,
  LoginRequest,
  PageParams,
  SubmissionRequest,
} from "../types/api/request"
import {
  FieldResponse,
  FromResponse,
  LoginResponse,
  Page,
  SubmissionResponse,
} from "../types/api/response"
import fetchWrapper from "./fetchWrapper"

export const authApi = {
  getToken: (data: LoginRequest) => {
    return fetchWrapper("auth-token/", "POST", data, false) as Promise<LoginResponse>
  },
}

export const formApi = {
  list: (page: PageParams) => {
    return fetchWrapper(`forms/`, "GET", page) as Promise<Page<FromResponse>>
  },
  post: (data: FormRequest) => {
    return fetchWrapper(`forms/`, "POST", data) as Promise<FromResponse>
  },
  get: (formId: number) => {
    return fetchWrapper(`forms/${formId}/`, "GET") as Promise<FromResponse>
  },
  put: (formId: number, data: FormRequest) => {
    return fetchWrapper(`forms/${formId}/`, "PUT", data) as Promise<FromResponse>
  },
  patch: (formId: number, data: Partial<FormRequest>) => {
    return fetchWrapper(`forms/${formId}/`, "PATCH", data) as Promise<FromResponse>
  },
  delete: (formId: number) => {
    return fetchWrapper(`forms/${formId}/`, "DELETE")
  },
}

export const formFieldApi = {
  list: (formId: number, page: PageParams) => {
    return fetchWrapper(`forms/${formId}/fields/`, "GET", page) as Promise<
      Page<FieldResponse>
    >
  },
  post: (formId: number, data: FieldRequest) => {
    let _data: FullFieldRequest = {
      kind: "GENERIC",
      options: null,
      value: null,
      ...data,
    }
    return fetchWrapper(
      `forms/${formId}/fields/`,
      "POST",
      _data
    ) as Promise<FieldResponse>
  },
  get: (formId: number, fieldId: number) => {
    return fetchWrapper(
      `forms/${formId}/fields/${fieldId}/`,
      "GET"
    ) as Promise<FieldResponse>
  },
  put: (formId: number, fieldId: number, data: FieldRequest) => {
    let _data: FullFieldRequest = {
      kind: "GENERIC",
      options: null,
      value: null,
      ...data,
    }
    return fetchWrapper(
      `forms/${formId}/fields/${fieldId}/`,
      "PUT",
      _data
    ) as Promise<FieldResponse>
  },
  patch: (formId: number, fieldId: number, data: Partial<FieldRequest>) => {
    let _data: Partial<FullFieldRequest> = {
      kind: "GENERIC",
      options: null,
      value: null,
      ...data,
    }
    return fetchWrapper(
      `forms/${formId}/fields/${fieldId}/`,
      "PATCH",
      _data
    ) as Promise<FieldResponse>
  },
  delete: (formId: number, fieldId: number) => {
    return fetchWrapper(`forms/${formId}/fields/${fieldId}/`, "DELETE")
  },
}

export const submissionApi = {
  list: (formId: number, page: PageParams) => {
    return fetchWrapper(`forms/${formId}/submissions/`, "GET", page) as Promise<
      Page<SubmissionResponse>
    >
  },
  post: (formId: number, data: SubmissionRequest) => {
    return fetchWrapper(
      `forms/${formId}/submissions/`,
      "POST",
      data
    ) as Promise<SubmissionResponse>
  },
  get: (formId: number, submissionId: number) => {
    return fetchWrapper(
      `forms/${formId}/submissions/${submissionId}/`,
      "GET"
    ) as Promise<SubmissionResponse>
  },
}
