import React from "react";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center overflow-auto bg-gray-100">
      <div className="m-4 mx-auto rounded-xl bg-white p-8 shadow-lg">
        {props.children}
      </div>
    </div>
  );
}
