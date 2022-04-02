import React from "react"
import { FieldKind } from "../types/fieldTypes"

export interface SelectItems {
  id?: string
  label: string
  value: FieldKind
}

interface SelectProps {
  id?: string
  value?: FieldKind
  name: string
  defaultValue?: string
  onChange?: ((e: React.ChangeEvent<HTMLSelectElement>) => void) | undefined
  options: SelectItems[]
}

export default function Select(props: SelectProps) {
  return (
    <select
      name={props.name}
      title={props.name}
      className="w-full rounded-lg border-2 border-gray-200 bg-white p-2"
      value={props.value}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
    >
      {props.options.map((item, i) => (
        <option key={i} id={item.id} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  )
}
