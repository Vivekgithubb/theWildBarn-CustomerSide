"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function Filter() {
  const [active, setActive] = useState("all");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";
  function handleFilter(filter) {
    setActive(filter);
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="flex flex-row w-full justify-end">
      <div className=" flex flex-row border mb-3 w-fit rounded-3xl border-primary-800">
        <Button
          filter="all"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          All Cabins
        </Button>
        <Button
          filter="small"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          Upto 3 people
        </Button>
        <Button
          filter="medium"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          Upto 7 people
        </Button>
        <Button
          filter="large"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          8+ people
        </Button>
      </div>
    </div>
  );
}

function Button({ children, filter, handleFilter, activeFilter }) {
  return (
    <button
      className={`${
        filter === activeFilter ? "bg-primary-700" : ""
      } px-5 py-2 hover:bg-accent-700 ${
        filter === "all" ? "rounded-l-3xl hover:rounded-l-3xl" : ""
      }  ${filter === "large" ? "rounded-e-3xl hover:rounded-e-3xl" : ""}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
export default Filter;
