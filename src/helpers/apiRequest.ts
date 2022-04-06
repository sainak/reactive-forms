import { navigate } from "raviger"
import { API_BASE_URL } from "../utils/constants"

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export default async function apiRequest(
  endpoint: string,
  method: RequestMethod = "GET",
  payload: any = null,
  auth = true
) {
  const url = `${API_BASE_URL}${endpoint}${
    method === "GET" && payload ? `?${new URLSearchParams(payload).toString()}` : ""
  }`

  return fetch(url, {
    method,
    headers: {
      ...(auth && {
        Authorization: `Token ${localStorage.getItem("token") || navigate("/login")}`,
      }),
      "Content-Type": "application/json",
    },
    body: method !== "GET" && payload ? JSON.stringify(payload) : null,
  })
    .then(async (response) => {
      const isJson = response.headers.get("content-type")?.includes("application/json")
      const data = isJson ? await response.json() : null
      // check for error response
      if (response.status === 401) {
        localStorage.removeItem("token")
        window.location.reload()
      } else if (!response.ok) {
        // get error message from body or default to response status
        const error = JSON.stringify(data) || response.statusText
        return Promise.reject(error)
      }
      return data
    })
    .catch((error) => {
      console.error(error)
      // TODO: parse error json and use react alerts
      alert(error)
    })
}
