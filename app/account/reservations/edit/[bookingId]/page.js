import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import LoadingButton from "@/app/_components/LoadingButton";

export default async function Page({ params }) {
  // CHANGE
  const { bookingId } = params;
  const booking = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(booking.cabinId);

  return (
    <div>
      <h2 className="font-semibold text-xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-[14px] flex gap-6 flex-col"
        action={updateBooking}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={booking.numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value={booking.numGuests} key="">
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
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={booking.observations}
          />
        </div>

        <input value={bookingId} type="hidden" name="bookingId" />
        <div className="flex justify-end items-center gap-6">
          <LoadingButton>Update Reservation</LoadingButton>
        </div>
      </form>
    </div>
  );
}
