import { toast } from "react-toastify"

export default function toastWrapper(
  promise: Promise<any>,
  id: string = "toast-wrapper"
) {
  return toast.promise(promise, {
    pending: {
      render: () => "Loading...",
      toastId: id,
    },
    error: {
      render({ data }) {
        return `Error: ${data}`
      },
      autoClose: 5000,
      toastId: id,
    },
  })
}
