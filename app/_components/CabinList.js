import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";

async function CabinList({ filter }) {
  // noStore();
  //This function can be used to declaratively opt out of static rendering and indicate a particular component should not be cached. so that getCabins function is not cached and always updated
  const cabins = await getCabins();
  console.log(cabins);
  if (!cabins.length) return null;

  //filtering cabins (server part)
  let displayedCabins;
  if (filter == "all") displayedCabins = cabins;
  if (filter == "small")
    displayedCabins = cabins.filter((cabin) => cabin?.maxCapacity <= 3);
  if (filter == "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin?.maxCapacity >= 4 && cabin?.maxCapacity < 8
    );
  if (filter == "large")
    displayedCabins = cabins.filter((cabin) => cabin?.maxCapacity >= 8);

  return (
    <div
      className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12
      xl:gap-14 "
    >
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
