/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_API_BASE_URL: string
  VITE_SENTRY_DSN: string
  VITE_SENTRY_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
