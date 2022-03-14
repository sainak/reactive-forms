import logo from "../img/logo.svg";

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
];

export default function Header() {
  return (
    <div className="flex items-center gap-6 mb-4">
      <img className="h-16 w-16 animate-spin-slow" src={logo} alt="logo" />
      <div className="flex gap-2 w-[30rem]">
        {routes.map((route) => (
          <a
            key={route.id}
            href={route.url}
            className="capitalize rounded-full border-2 px-4 py-2"
          >
            {route.page}
          </a>
        ))}
      </div>
    </div>
  );
}
