import { useRoutes } from "raviger";
import App from "./App";

import About from "./components/About";
import AppContainer from "./components/AppContainer";
import Form from "./components/Form";
import FormsList from "./components/FormsList";

const routes = {
  "/": () => <FormsList />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => (
    <Form formId={Number(id)} />
  )
};

export default function AppRouter() {
  let routerResult = useRoutes(routes);
  return <AppContainer>{routerResult}</AppContainer>;
}
