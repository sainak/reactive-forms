import { SearchIcon } from "@heroicons/react/outline"

interface SearchBarProps {
  searchString: string
  onFormSubmit: () => void
  onSearchStringChange: (value: string) => void
}
export function SearchBar(props: SearchBarProps) {
  return (
    <form
      action=""
      method="get"
      onSubmit={(e) => {
        e.preventDefault()
        props.onFormSubmit()
      }}
    >
      <div className="relative mb-4">
        <button type="submit" title="search">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <SearchIcon className="h-5 w-5 text-gray-600" />
          </span>
        </button>
        <input
          type="search"
          name="search"
          className=" w-full rounded-lg border-2 border-gray-200 p-2 pl-10"
          onChange={(e) => props.onSearchStringChange(e.target.value)}
          value={props.searchString}
          id="id_search"
          placeholder="Search"
          autoComplete="off"
        />
      </div>
    </form>
  )
}
