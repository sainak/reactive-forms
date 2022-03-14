import React, { useState } from "react";

import AppContainer from "./components/AppContainer";
import Form from "./components/Form";
import Button from "./components/Button";

export default function App() {
  const [form, setForm] = useState(-1);
  const openForm = () => setForm(0);
  const closeForm = () => setForm(-1);

  return (
    <AppContainer>
      {form === -1 ? (
        <Button text="Go to Form" onClick={openForm} fullWidth />
      ) : (
        <Form closeFormCB={closeForm} />
      )}
    </AppContainer>
  );
}
