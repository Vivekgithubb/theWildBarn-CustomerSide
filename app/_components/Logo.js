import Image from "next/image";
import Link from "next/link";
// import logo1 from "@/public/logo1.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image src={logo1} alt="The Wild Oasis logo" /> */}
      <Image
        src="/logo1.png"
        height="80"
        width="80"
        quality={100}
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100 gap-0">
        The Wild Barn
      </span>
    </Link>
  );
}

export default Logo;
