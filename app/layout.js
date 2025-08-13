import Header from "./_components/Header";
import "./_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import { Figtree, Oxygen } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
});
const oxygen = Oxygen({
  subsets: ["latin"],
  display: "swap",
  weight: "300",
});

export const metadata = {
  // title: "The Wild Barn",
  title: {
    template: "%s The Wild Barn", //%s includes the expports of other pages there
    default: "Welcome to The Wild Barn",
  },
  // this will be description for all pages , its good for seo sake to include it , if we want different for diferent page then we can just export it for each page or else this will be shown as defualt
  description:
    "Perched high above the emerald valleys and misty forests of the European highlands, Wild Barn is your private gateway to serenity and splendor. Nestled on a secluded hilltop, our luxurious cabins blend rustic charm with modern indulgence—offering panoramic views of snow-dusted peaks, rolling meadows, and starlit skies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${oxygen.className} bg-primary-950 text-primary-100 min-h-screen text-[14px] flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid ">
          <main className="max-w-7xl mx-auto w-full ">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
