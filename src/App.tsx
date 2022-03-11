import React, { useState } from "react";

import AppContainer from "./components/AppContainer";
import Form from "./components/Form";
import Button from "./components/Button";

export default function App() {
  const [page, setPage] = useState("HOME");
  const openForm = () => setPage("FORM");
  const closeForm = () => setPage("HOME");

  return (
    <AppContainer>
      {page === "HOME" ? (
        <Button text="Go to Form" onClick={openForm} fullWidth />
      ) : (
        <Form closeFormCB={closeForm} />
      )}
    </AppContainer>
  );
}
