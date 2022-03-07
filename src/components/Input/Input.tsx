interface InputProps {
  key: number;
  label: string;
  type: string;
}

export default function Input(prop: InputProps) {
  return (
    <div key={prop.key} className="w-full">
      <span className="text-lg px-2">{prop.label}</span>
      <input
        className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full"
        type={prop.type}
        placeholder={prop.label}
      />
    </div>
  )
}
