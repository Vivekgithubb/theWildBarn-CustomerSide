"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function UpdateProfile(formData) {
  // console.log(formData);
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");
  const nationalId = formData.get("nationalId");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // Allow only 6–12 alphanumeric characters

  const nationalIdRegex = /^[A-Za-z0-9]{6,12}$/;
  if (!nationalIdRegex.test(nationalId)) {
    throw new Error("Provide valid national Id");
  }

  const updateData = { nationalId, nationality, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");
  //making sure user can delete only bookings made by them
  const guestBooking = await getBookings(session.user.guestId);
  const guestBookingId = guestBooking.map((booking) => booking.id);
  if (!guestBookingId.includes(bookingId))
    throw new Error("You are not Allowed to delete this booking");

  const { error } = await supabase.from("booking").delete().eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations"); //this will show the changes without refreshing the page
}

export async function updateBooking(formData) {
  //1)Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");

  //2)AUthorisation
  const guestBooking = await getBookings(session.user.guestId);
  const guestBookingId = guestBooking.map((booking) => booking.id);

  //3)Getting the data and error handling
  const id = Number(formData.get("bookingId"));
  if (!guestBookingId.includes(id))
    throw new Error("You are not Allowed to update this booking");
  const updatedField = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  //4)Mutations
  const { error } = await supabase
    .from("booking")
    .update(updatedField)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  //5)Revalidation
  revalidatePath(`/account/reservations/edit/${id}`);
  revalidatePath("/account/reservations");

  //6)Redirecting
  redirect("/account/reservations");
}

// here bookingData needs to be the first argument since its passed from the "bind" function
//formadata is written as last argument if more data like bookingData is sent
export async function createBooking(bookingData, formData) {
  //1)Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  const { error } = await supabase.from("booking").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
