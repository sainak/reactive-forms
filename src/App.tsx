import React from "react";

import AppContainer from "./components/AppContainer";
import Form from "./components/Form";
import Header from './components/Header';


export default function App() {
  const [page, setPage] = React.useState("HOME");
  const openForm = () => setPage("FORM");
  const closeForm = () => setPage("HOME");

  return (
    <AppContainer>
      <Header title={`Welcome to Lesson ${4 + 2} of #react-typescript with #tailwindcss`}/>
      {
        page === "HOME"
        ? (
            <button
              onClick={openForm}
              className="w-full rounded-lg p-3 text-center text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 transition duration-300">
              Go to Form
            </button>
          )
        : (
            <Form closeFormCB={closeForm} />
          )
      }
    </AppContainer>
  );
}
