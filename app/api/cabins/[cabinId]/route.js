import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// export async function POST() {}
export async function GET(request, { params }) {
  // console.log(request, params);
  const cabinId = params.cabinId;
  console.log(cabinId);

  try {
    const [cabin, bookedDates] = await Promise.all[
      (getCabin(cabinId), getBookedDatesByCabinId(cabinId))
    ];
    return Response.json({ cabin, bookedDates });
  } catch (err) {
    return Response.json({ message: "cabin not found" });
    console.log(err.message);
  }
}
