import { API_AUTH, API_BASE_URL } from "../utils/constants"

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export default async function apiRequest(
  endpoint: string,
  method: RequestMethod = "GET",
  payload = null
) {
  const url = `${API_BASE_URL}${endpoint}${
    method === "GET" && payload ? `?${new URLSearchParams(payload).toString()}` : ""
  }`

  return fetch(url, {
    method,
    headers: {
      Authorization: API_AUTH,
      "Content-Type": "application/json",
    },
    body: method !== "GET" && payload ? JSON.stringify(payload) : null,
  })
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error)
}
