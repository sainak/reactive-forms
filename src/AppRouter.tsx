import { useRoutes } from "raviger"
import About from "./components/About"
import FormBuilder from "./components/FormBuilder"
import FormsList from "./components/FormsList"

const routes = {
  "/": () => <FormsList />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <FormBuilder formId={Number(id)} />
}

export default function AppRouter() {
  let routerResult = useRoutes(routes)
  return routerResult
}
