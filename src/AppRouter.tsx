import { useRoutes } from "raviger"
import React from "react"
import { isLoggedIn } from "./utils/apiUtils"

const Login = React.lazy(() => import("./components/Login"))
const About = React.lazy(() => import("./components/About"))
const FormsList = React.lazy(() => import("./components/FormsList"))
const FormBuilder = React.lazy(() => import("./components/FormBuilder"))
const FormQuiz = React.lazy(() => import("./components/FormQuiz"))
const FormPreview = React.lazy(() => import("./components/FormPreview"))
const QuizAttemptsList = React.lazy(() => import("./components/QuizAttemptsList"))

const publicRoutes = {
  "/": () => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Login />
    </React.Suspense>
  ),
  "/about": () => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <About />
    </React.Suspense>
  ),
  "/login": () => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Login />
    </React.Suspense>
  ),
  "/404": () => <div>Not Found</div>,
  "/403": () => <div>Forbidden</div>,
}

const routes = {
  ...publicRoutes,
  "/": () => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <FormsList />
    </React.Suspense>
  ),
  "/attempts/:formId": ({ formId }: { formId: string }) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <QuizAttemptsList formId={Number(formId)} />
    </React.Suspense>
  ),
  "/form/:id": ({ id }: { id: string }) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <FormBuilder formId={Number(id)} />
    </React.Suspense>
  ),
  "/quiz/:formId/:qid": ({ formId, qid }: { formId: string; qid: string }) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <FormQuiz formId={Number(formId)} questionId={Number(qid)} />
    </React.Suspense>
  ),
  "/preview/:formId/:attemptId": ({
    formId,
    attemptId,
  }: {
    formId: string
    attemptId: string
  }) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <FormPreview formId={Number(formId)} attemptId={Number(attemptId)} />
    </React.Suspense>
  ),
}

export default function AppRouter() {
  let routerResult = useRoutes(isLoggedIn() ? routes : publicRoutes)
  return routerResult
}
