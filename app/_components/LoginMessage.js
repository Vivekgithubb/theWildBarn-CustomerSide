import Link from "next/link";

function LoginMessage() {
  return (
    <div className="grid bg-primary-800 ">
      <p className="text-center text-[16px] py-12 self-center">
        Please{" "}
        <Link
          href="/login"
          className="underline text-accent-500 italic font-semibold text-[18px]"
        >
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
