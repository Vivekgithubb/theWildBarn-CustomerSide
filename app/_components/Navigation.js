import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth(); // this makes the whole app dynamic cause it header is present in layout of the site thus making it dynamic
  console.log(session);
  return (
    <nav className="z-10 text-[14px]">
      <ul className="flex gap-10 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="flex flex-row justify-center items-center gap-2 hover:text-accent-400 transition-colors relative"
            >
              <span>Profile</span>
              <img
                src={session.user.image}
                className="rounded-3xl object-contain w-[30px]"
                alt="userImage"
                referrerPolicy="no-referrer" //required to display images from google
              />
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Profile
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
