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
}

const routes = {
  ...publicRoutes,
  "/": () => <FormsList />,
  "/attempts": () => <QuizAttemptsList />,
  "/form/:id": ({ id }: { id: string }) => <FormBuilder formId={Number(id)} />,
  "/quiz/:id": ({ id }: { id: string }) => (
    <FromQuiz attemptId={Number(id)} questionId={0} />
  ),
  "/quiz/:id/:qid": ({ id, qid }: { id: string; qid: string }) => (
    <FromQuiz attemptId={Number(id)} questionId={Number(qid)} />
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
