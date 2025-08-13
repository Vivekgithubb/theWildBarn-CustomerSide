import { auth } from "../_lib/auth";
import { getBookings } from "../_lib/data-service";

export const metadata = {
  title: "Acount of ",
};

export default async function AccountPage() {
  const session = await auth();

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        <span className="italic text-primary-200 text-xl">Hello, </span>{" "}
        {session.user.name}
      </h2>
    </div>
  );
}
