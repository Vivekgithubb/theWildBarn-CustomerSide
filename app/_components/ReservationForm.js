"use client";

import { differenceInDays, format } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import Button from "@/app/_components/LoadingButton";
// import { auth } from "../_lib/auth";

function ReservationForm({ cabin, user }) {
  // CHANGE
  const { range, resetRange } = useReservation();
  const maxCapacity = cabin.maxCapacity;
  const { regularPrice, discount, id } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.0] grid grid-rows-[10%_25%_65%] ">
      <div className="mt-3 ml-14 bg-primary-800 w-fit h-fit rounded-t-lg text-primary-300 px-3 py-2 flex justify-between items-center">
        <p className="text-[15px] text-primary-400">
          Logged in:
          {/* <span className="text-accent-600 font-semibold font-figtree px-2">
            {user.name}
          </span>{" "} */}
        </p>

        <div className="flex mx-2 gap-1 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-6 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-1 bg-primary-900 ml-14 rounded-e-lg rounded-bl-lg mr-16">
        <div className="flex flex-col justify-center items-start gap-5 pt-5 ml-3">
          <h1>Booking starts from:</h1>
          <h1>Booking ends on:</h1>
        </div>{" "}
        <div className="w-full flex justify-end">
          {range?.from && range?.to ? (
            <div className="text-[13px] flex flex-col justify-center items-start gap-3 pt-5 px-2 ">
              <h1 className="bg-accent-500 text-primary-900 font-normal p-1 px-2 rounded-lg">
                {format(new Date(range.from), "dd MMM yyyy")}
              </h1>
              <h1 className="bg-accent-500 text-primary-900 font-normal p-1 px-2 rounded-lg">
                {format(new Date(range.to), "dd MMM yyyy")}
              </h1>
            </div>
          ) : (
            <div className=" text-[13px] flex flex-col justify-center items-start gap-3 pt-5 px-2">
              <h1 className="bg-primary-900 text-primary-300 font-normal p-1 px-2 rounded-lg">
                select now
              </h1>
              <h1 className="bg-primary-900 text-primary-300 font-normal p-1 px-2 rounded-lg">
                select now
              </h1>
            </div>
          )}
        </div>
      </div>

      <form
        // action={createBookingWithData} //version 1 without resetrange
        //below method is used so that we can call the reset Range function to remove the range highlightig
        action={async (formData) => {
          resetRange(); // write this before functioncall or else it wont be executed since it get inerupted by the redirect
          await createBookingWithData(formData);
        }}
        className=" rounded-b-lg py-10 px-16 text-[14px] flex gap-5 h-full flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-400 text-primary-900 w-full shadow-sm rounded-md"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-900 w-full shadow-sm rounded-md"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>
        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <Button>Reserve Now</Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
