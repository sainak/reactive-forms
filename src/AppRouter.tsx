import { useRoutes } from "raviger"
import About from "./components/About"
import FormBuilder from "./components/FormBuilder"
import FromQuiz from "./components/FormQuiz"
import FormsList from "./components/FormsList"
import Login from "./components/Login"
import QuizAttemptsList from "./components/QuizAttemptsList"

const routes = {
  "/": () => <FormsList />,
  "/attempts": () => <QuizAttemptsList />,
  "/form/:id": ({ id }: { id: string }) => <FormBuilder formId={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => (
    <FromQuiz attemptId={Number(id)} questionId={0} />
  ),
  "/preview/:id/:qid": ({ id, qid }: { id: string; qid: string }) => (
    <FromQuiz attemptId={Number(id)} questionId={Number(qid)} />
  ),
  "/about": () => <About />,
  "/login": () => <Login />,
}

export default function AppRouter() {
  let routerResult = useRoutes(routes)
  return routerResult
}
