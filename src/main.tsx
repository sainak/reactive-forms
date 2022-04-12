import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"
import ReactDOM from "react-dom/client"
import { registerSW } from "virtual:pwa-register"
import App from "./App"
import "./index.css"

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_SENTRY_ENV ?? "development",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
})

registerSW()

const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(<App />)
