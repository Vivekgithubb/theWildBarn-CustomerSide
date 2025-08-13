"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  // CHANGE
  const { range, setRange, resetRange } = useReservation();
  const regularPrice = cabin.regularPrice;
  const discount = cabin.discount;
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);
  // SETTINGS
  const minBookingLength = settings.minBookingLength;
  const maxBookingLength = settings.maxBookingLength;
  const today = new Date();
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 5);
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-2 place-self-center text-[14px]"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        onSelect={setRange}
        defaultMonth={today}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
        selected={displayRange}
        startMonth={today}
        endMonth={futureDate}
        captionLayout="dropdown"
        numberOfMonths={1}
        modifiersClassNames={{
          selected: "text-accent-500 bg-primary-900",
          range_start: "text-accent-500 bg-primary-900  rounded-l-3xl",
          range_end: "text-accent-500 bg-primary-900  rounded-e-3xl",
          range_middle: "text-white bg-primary-500",
        }}
      />

      <div className="flex flex-row items-center justify-between w-full px-8 bg-accent-500 text-primary-800 h-[62px] rounded-lg mb-2 ">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-[14px]">₹{regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ₹{regularPrice}
                </span>
              </>
            ) : (
              <span className="text-[14px]">₹{regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-[15px]">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-[18px] font-bold uppercase">Total </span>{" "}
                <span className="text-[18px] font-semibold">
                  {" "}
                  ₹{cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
