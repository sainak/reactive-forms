import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  fullWidth?: boolean;
  inverted?: boolean;
}

export default function Button({
  fullWidth = false,
  inverted = false,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`${fullWidth && "w-full"} rounded-lg ${
        inverted ? "text-black" : "bg-sky-500 text-white"
      } border-4 border-sky-500 px-5 py-1 text-center transition duration-300 hover:bg-sky-700 hover:border-sky-700 hover:text-white focus:ring-4 focus:ring-sky-300 `}
    >
      {props.text}
    </button>
  );
}
