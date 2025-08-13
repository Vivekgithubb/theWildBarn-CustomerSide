"use client";

import { useFormStatus } from "react-dom";
import { UpdateProfile } from "../_lib/actions";

function UpdateProfileForm({ children, guest }) {
  // CHANGE
  // const countryFlag = "pt.jpg";
  // const nationality = "portugal";
  const { fullName, email, nationalId, countryFlag } = guest;

  return (
    <div>
      <form
        className="bg-primary-900 py-8 px-12 text-[14px] flex gap-[16px] flex-col rounded-md  h-full "
        action={UpdateProfile} // no need for state all data will be automatically sent to the server
      >
        <h2 className="font-semibold text-[17px]  text-accent-400 mb-2 relative">
          Update your Profile
        </h2>

        <p className=" text-[14px]  text-primary-200 relative">
          Providing the following information will make your check-in process
          faster and smoother. See you soon!
        </p>
        <div className="space-y-2 z-10 ">
          <label>Full name</label>
          <input
            name="fullName"
            defaultValue={fullName}
            disabled
            className="px-5 py-3 bg-transparent backdrop-blur-sm rounded-md text-primary-700 w-full shadow-sm disabled:cursor-not-allowed disabled:opacity-70 disabled:text-gray-300 border-2 border-primary-600"
          />
        </div>

        <div className="space-y-2 z-10">
          <label>Email address</label>
          <input
            name="email"
            disabled
            defaultValue={email}
            className="px-5 py-3 bg-transparent bg-opacity-50 backdrop-blur-sm rounded-md text-primary-700 w-full shadow-sm disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-300 border-2 border-primary-600"
          />
        </div>

        <div className="space-y-2 z-10">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <img
              src={countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          </div>
          {children}
        </div>

        <div className="space-y-2 z-10">
          <label htmlFor="nationalID">National ID number</label>
          <input
            name="nationalId"
            defaultValue={nationalId}
            className="px-5 py-3 bg-transparent backdrop-blur-sm rounded-md text-primary-100 w-full shadow-sm disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-400 border-2 border-primary-400"
          />
        </div>

        <div className="flex justify-end items-center gap-2 z-10">
          <Button />
        </div>
      </form>
    </div>
  );
}
function Button() {
  const { pending } = useFormStatus(); // this gives the current status of form like , if it updating etc
  //note:- it should be written iniside a form thus we pass it in as a function
  return (
    <button
      className="text-[13px] bg-accent-500 px-5 py-2 text-primary-800 font-semibold hover:bg-accent-600 transition-all rounded-lg disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? "Updating" : "Update profile"}
    </button>
  );
}

export default UpdateProfileForm;
