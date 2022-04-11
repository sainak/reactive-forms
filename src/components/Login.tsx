import { useState } from "react"
import { authApi } from "../helpers/api"
import { LoginRequest } from "../types/api/request"
import Button from "./Button"
import Input from "./Input"

export default function Login() {
  const [form, setForm] = useState<LoginRequest>({
    username: "",
    password: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    authApi.getToken(form).then((data) => {
      localStorage.setItem("token", data.token)
      window.location.reload()
    })
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="username">Username</label>
            <Input id="username" name="username" onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              required
            />
          </div>
          <Button text="Login" onClick={() => {}} />
        </div>
      </form>
    </>
  )
}
