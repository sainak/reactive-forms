import React, { useState } from "react";
import Button from "./Button";
import { getLocalForms, saveForms } from "./Form/utils";
import bin from "../img/bin.svg";

export default function FormsList(props: {}) {
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
            <a
              className="h-full w-full cursor-pointer text-lg"
              href={`/form/${form.id}`}
            >
              {form.label}
            </a>
            <button
              className="ml-auto rounded-md bg-red-500 p-2 font-bold text-white transition duration-300 ease-in-out hover:bg-red-700"
              onClick={() => deleteForm(form.id)}
            >
              <img className="h-6 w-6" src={bin} alt="delete" />
            </button>
          </div>
        ))}
      </div>
      <Button
        text="New Form"
        onClick={() => {
          window.location.href = `/form/${Number(new Date())}`;
        }}
        fullWidth
      />
    </>
  );
}
