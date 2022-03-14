import React, { useState } from "react";

import AppContainer from "./components/AppContainer";
import Form from "./components/Form";
import FormsList from "./components/FormsList";

export default function App() {
  const [form, setForm] = useState(-1);
  const openForm = (id?: number) => setForm(id ?? 0);
  const closeForm = () => setForm(-1);

  return (
    <AppContainer>
      {form === -1 ? (
        <FormsList openFormCB={openForm} />
      ) : (
        <Form formId={form} closeFormCB={closeForm} />
      )}
    </AppContainer>
  );
}
