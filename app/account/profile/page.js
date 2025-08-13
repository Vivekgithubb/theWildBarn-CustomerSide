import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import SelectCountry from "@/app/_components/SelectCountry";
import Image from "next/image";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update profile on",
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);

  // const countryFlag = "pt.jpg";
  // const nationality = "portugal";
  return (
    <div className="relative ">
      <Image
        src="/bg.png"
        fill
        alt="profile bg image"
        className="z-0 object-cover object-fit opacity-30"
      />
      {/* since select country uses server components like await/async it cant be written under a client components like updateProfileForm so we pass it as a prop which is okay */}
      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-300 w-full shadow-sm rounded-md bg-transparent backdrop-blur-sm border border-sky-100"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
