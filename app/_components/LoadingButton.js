"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function Button({ children }) {
  const { pending } = useFormStatus(); // this gives the current status of form like , if it updating etc
  //note:- it should be written iniside a form thus we pass it in as a function
  return (
    <button
      className="text-[13px] bg-accent-500 px-5 py-2 text-primary-800 font-semibold hover:bg-accent-600 transition-all rounded-lg disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? <SpinnerMini /> : children}
    </button>
  );
}
export default Button;
