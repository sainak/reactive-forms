import React from "react";

import AppContainer from "./components/AppContainer";
import Form from "./components/Form";
import Header from "./components/Header";
import Button from "./components/Button";

export default function App() {
  const [page, setPage] = React.useState("HOME");
  const openForm = () => setPage("FORM");
  const closeForm = () => setPage("HOME");

  return (
    <AppContainer>
      <Header
        title={`Welcome to WD301: #react-typescript with #tailwindcss`}
      />
      {page === "HOME" ? (
        <Button text="Go to Form" onClick={openForm} fullWidth />
      ) : (
        <Form closeFormCB={closeForm} />
      )}
    </AppContainer>
  );
}
