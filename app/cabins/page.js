import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

// export const revalidate = 0; // since the page became dynamic after adding the filter component in cabinlist , there is no use of revalidating
// sets thge revalidation time so that data get updated and not cached by next js
//we can give it values in seconds so it refetches or updated according the new value given in the database , ex:- price change of the cabins , done during production

export const metadata = {
  title: "Cabins of ",
};

export default function Page({ searchParams }) {
  console.log(searchParams);
  const filter = searchParams?.capacity ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium ">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-[16px] mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy natures beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      {/*This is like automatic isLoading State , loads the fallback spinner when
      the data is still loading*/}
      {/* inside suspense the cabin list is gonna be dynamic while the other part is static , also due to the unstable_noStop we wrote in the cabinsList code*/}
      {/*this is partial pre rendering*/}
      <Filter />
      <Suspense fallback={<Spinner />}>
        <CabinList filter={filter} key={filter} />
        <ReservationReminder />
        {/* filter key is added so
        that the suspense works even when filter is changed*/}
      </Suspense>
    </div>
  );
}
