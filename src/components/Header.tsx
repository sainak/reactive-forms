import logo from "../img/logo.svg"

const routes = [
  {
    id: 1,
    page: "Home",
    url: "/"
  },
  {
    id: 2,
    page: "About",
    url: "/about"
  }
]

export default function Header() {
  return (
    <div className="mb-4 flex items-center gap-6">
      <img className="h-16 w-16 animate-spin-slow" src={logo} alt="logo" />
      <div className="flex gap-2">
        {routes.map((route) => (
          <a
            key={route.id}
            href={route.url}
            className="rounded-full border-2 px-4 py-2 capitalize"
          >
            {route.page}
          </a>
        ))}
      </div>
    </div>
  )
}
