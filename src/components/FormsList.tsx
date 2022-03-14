import React, { useState } from "react";
import Button from "./Button";
import { getLocalForms, saveForms } from "./Form/utils";
import bin from "../img/bin.svg";

export default function FormsList(props: { openFormCB: (id?: number) => void }) {
  const [forms, setForms] = useState(getLocalForms());

  const deleteForm = (id: number) => {
    const filteredLocalForms = forms.filter((formFilter) => formFilter.id !== id);
    setForms(filteredLocalForms);
    saveForms(filteredLocalForms);
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-2">
        {forms.map((form) => (
          <div
            key={form.id}
            className="flex  w-full  items-center rounded-lg p-2 hover:bg-sky-200"
          >
            <span
              className="h-full w-full cursor-pointer text-lg"
              onClick={() => props.openFormCB(form.id)}
            >
              {form.label}
            </span>
            <button
              className="ml-auto rounded-md bg-red-500 p-2 font-bold text-white transition duration-300 ease-in-out hover:bg-red-700"
              onClick={() => deleteForm(form.id)}
            >
              <img className="w-6 h-6" src={bin} alt="delete" />
            </button>
          </div>
        ))}
      </div>
      <Button text="New Form" onClick={props.openFormCB} fullWidth />
    </>
  );
}
