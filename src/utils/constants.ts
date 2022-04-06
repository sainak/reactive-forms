import { appendSlash } from "./apiUtils"

export const API_BASE_URL = appendSlash(import.meta.env.VITE_API_BASE_URL)
