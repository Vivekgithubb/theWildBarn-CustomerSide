import Image from "next/image";
import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    //form, its for the signIn button, we just cant use onClick
    //we use form cause we need to add interactivity in this page but it is a server component
    //which doesnt allow it so we use somethig called as server action , a way to add interactivity to server componnets,
    <form action={signInAction}>
      <button className="rounded-lg bg-primary-950 hover:bg-primary-900 transition-all flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
