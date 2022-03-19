import { useRoutes } from "raviger"
import About from "./components/About"
import FormBuilder from "./components/FormBuilder"
import FromPreview from "./components/FormPreview"
import FromQuiz from "./components/FormQuiz"
import FormsList from "./components/FormsList"
import QuizAttemptsList from "./components/QuizAttemptsList"

const routes = {
  "/": () => <FormsList />,
  "/attempts": () => <QuizAttemptsList />,
  "/form/:id": ({ id }: { id: string }) => <FormBuilder formId={Number(id)} />,
  "/quiz/:id": ({ id }: { id: string }) => (
    <FromQuiz attemptId={Number(id)} questionId={0} />
  ),
  "/quiz/:id/:qid": ({ id, qid }: { id: string; qid: string }) => (
    <FromQuiz attemptId={Number(id)} questionId={Number(qid)} />
  ),
  "/preview/:id": ({ id }: { id: string }) => (
    <FromPreview attemptId={Number(id) ?? 0} />
  ),
  "/about": () => <About />
}

export default function AppRouter() {
  let routerResult = useRoutes(routes)
  return routerResult
}
