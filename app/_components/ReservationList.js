"use client";

import { useOptimistic } from "react";
import ReservationCard from "../account/reservations/ReservationCard";
import { deleteBooking } from "../_lib/actions";
function ReservationList({ bookings }) {
  //use optimistic helps us quickly change the deleted list on the front while th edeletion takes time in backend, its like creating a seperate state or list with all bookings and removing one directly while the backend does it job
  //Therefore no loader shows up when we delete and it instantly dissapears from the screen
  const [optimisticBoookings, OptimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id != bookingId);
    }
  );
  async function handleDelete(bookingId) {
    OptimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <div>
      <ul className="space-y-6">
        {optimisticBoookings.map((booking) => (
          <ReservationCard
            booking={booking}
            key={booking.id}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
