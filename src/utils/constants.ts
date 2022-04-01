export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const API_AUTH =
  "Basic " +
  btoa(`${import.meta.env.VITE_API_USERNAME}:${import.meta.env.VITE_API_PASSWORD}`)
