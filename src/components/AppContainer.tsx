import React from "react"
import { ToastContainer } from "react-toastify"
import Header from "./Header"

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="flex min-h-screen overflow-auto bg-gray-100 md:items-center">
        <div className="mx-auto w-full bg-white p-4 md:my-4 md:w-3/4 md:rounded-xl md:p-8 md:shadow-lg lg:w-[42rem]">
          <Header />
          {props.children}
        </div>
      </div>
      <ToastContainer
        containerId="toast-container"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  )
}
