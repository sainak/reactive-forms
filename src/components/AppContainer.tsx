import React from "react"
import Header from "./Header"

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen overflow-auto bg-gray-100 md:items-center">
      <div className="mx-auto w-full bg-white p-4 md:my-4 md:w-3/4 md:rounded-xl md:p-8 md:shadow-lg lg:w-[42rem]">
        <Header />
        {props.children}
      </div>
    </div>
  )
}
