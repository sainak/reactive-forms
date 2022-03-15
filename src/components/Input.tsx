import React from "react"

interface InputProps {
  id?: string
  name?: string
  type?: string
  placeholder?: string
  value?: string
  innerRef?: React.RefObject<HTMLInputElement>
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined
}

export default function Input({ type = "text", ...props }: InputProps) {
  return (
    <input
      id={props.id}
      name={props.name}
      ref={props.innerRef}
      className="w-full rounded-lg border-2 border-gray-200 p-2"
      type={type}
      onChange={props.onChange}
      placeholder={props.placeholder}
      value={props.value}
    />
  )
}
