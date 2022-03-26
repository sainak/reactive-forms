import { ActiveLink } from "raviger"
import { ReactComponent as Logo } from "../img/logo.svg"

const routes = [
  {
    id: 1,
    page: "Forms",
    url: "/",
  },
  {
    id: 2,
    page: "Attempts",
    url: "/attempts",
  },
  {
    id: 9,
    page: "About",
    url: "/about",
  },
]

export default function Header() {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <Logo className="mr-4 h-16 w-16 animate-pinwheel" />
      {routes.map((route) => (
        <ActiveLink
          key={route.id}
          href={route.url}
          className="rounded-full border-2 px-4 py-2 capitalize transition-colors duration-300 hover:bg-sky-600 hover:text-white"
          exactActiveClass="bg-sky-500 text-white"
        >
          {route.page}
        </ActiveLink>
      ))}
    </div>
  )
}
