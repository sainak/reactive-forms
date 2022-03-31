import { ChevronDownIcon } from "@heroicons/react/outline"
import { useEffect, useRef, useState } from "react"
import useClickAway from "../hooks/useClickAway"
import { FormFieldChildType } from "../types/fieldTypes"

interface MultiSelectProps {
  id: number
  isListOpen?: boolean
  disabled?: boolean
  selectedItems: string[]
  items?: FormFieldChildType[]
  onChange: (value: string) => void
}

export default function MultiSelect({ isListOpen = true, ...props }: MultiSelectProps) {
  const [selectedItems, setSelectedItems] = useState(() => {
    let items = new Set(props.selectedItems)
    items.delete("")
    return items
  })

  const [isListOpenState, setIsListOpen] = useState(isListOpen)

  const ref = useRef<HTMLDivElement>(null)

  const addItem = (itemId: string) => {
    setSelectedItems((prev) => new Set(prev).add(itemId))
  }

  const removeItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      newSet.delete(itemId)
      return newSet
    })
  }

  const selectAll = () => {
    setSelectedItems(() => new Set(props.items?.map((item) => item.id.toString())))
  }

  const deselectAll = () => {
    setSelectedItems(() => new Set())
  }

  const toggleList = () => {
    setIsListOpen(!isListOpenState)
  }

  const listItems = () =>
    props.items?.map((item) => {
      const itemSelected = selectedItems.has(item.id.toString())
      return (
        <div className="flex w-full items-center gap-2" key={item.id}>
          <input
            id={`id_${props}_${item.id}`}
            type="checkbox"
            className="rounded transition-all"
            checked={itemSelected}
            onChange={
              props.disabled
                ? undefined
                : () =>
                    itemSelected
                      ? removeItem(item.id.toString())
                      : addItem(item.id.toString())
            }
            disabled={props.disabled}
          />
          <label className="w-full cursor-pointer" htmlFor={`id_${props}_${item.id}`}>
            {item.label}
          </label>
        </div>
      )
    })

  const getTitle = () => {
    switch (selectedItems.size) {
      case 0:
        if (props.disabled) return "No items selected"
        return "Select items"
      case 1:
        return "1 item selected"
      default:
        return `${selectedItems.size} items selected`
    }
  }

  useEffect(() => {
    props.onChange([...selectedItems].join(","))
  }, [selectedItems])

  useClickAway(ref, () => setIsListOpen(() => false))

  return (
    <div ref={ref}>
      <button
        type="button"
        onClick={toggleList}
        className="flex w-full items-center rounded-lg border-2 border-gray-200 p-2"
      >
        <div>{getTitle()}</div>
        <ChevronDownIcon
          className={`ml-auto h-5 w-5 transition-transform duration-300 ${
            isListOpenState ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isListOpenState && (
        <div className="flex max-h-56 min-h-fit flex-col items-start gap-2 overflow-auto rounded-b-lg border-2 border-t-0 p-4">
          {!props.disabled && (
            <div
              className="w-full cursor-pointer select-none"
              onClick={selectedItems.size > 0 ? deselectAll : selectAll}
            >
              {selectedItems.size > 0 ? "Deselect all" : "Select all"}
            </div>
          )}
          {listItems()}
        </div>
      )}
    </div>
  )
}
