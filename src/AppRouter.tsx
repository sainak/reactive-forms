import { useRoutes } from "raviger"
import About from "./components/About"
import FormBuilder from "./components/FormBuilder"
import FromPreview from "./components/FormPreview"
import FromQuiz from "./components/FormQuiz"
import FormsList from "./components/FormsList"
import Login from "./components/Login"
import QuizAttemptsList from "./components/QuizAttemptsList"
import { isLoggedIn } from "./utils/apiUtils"

const publicRoutes = {
  "/": () => <Login />,
  "/about": () => <About />,
  "/login": () => <Login />,
  "/404": () => <div>Not Found</div>,
  "/403": () => <div>Forbidden</div>,
}

const routes = {
  ...publicRoutes,
  "/": () => <FormsList />,
  "/attempts": () => <QuizAttemptsList />,
  "/form/:id": ({ id }: { id: string }) => <FormBuilder formId={Number(id)} />,
  "/quiz/:id/:qid": ({ formId, qid }: { formId: string; qid: string }) => (
    <FromQuiz formId={Number(formId)} questionId={Number(qid)} />
  ),
  "/preview/:formId/:attemptId": ({
    formId,
    attemptId,
  }: {
    formId: string
    attemptId: string
  }) => <FromPreview formId={Number(formId)} attemptId={Number(attemptId)} />,
}

export default function AppRouter() {
  let routerResult = useRoutes(isLoggedIn() ? routes : publicRoutes)
  return routerResult
}
