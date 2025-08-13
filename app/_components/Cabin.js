import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "@/app/_components/TextExpander";

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  return (
    <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
      <div className="scale-[1.15] -translate-x-3 relative flex-1">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover rounded-md flex-1 "
        />
      </div>

      <div>
        <h3 className="pl-2 flex flex-row justify-start items-start text-accent-100 font-black text-5xl mb-5 translate-x-[-254px] bg-primary-950 bg-opacity-55 backdrop-blur-[2px]  py-2 pb-3 w-[150%] rounded-md">
          Cabin {name}
        </h3>

        <p className="text-[15px] text-primary-200 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-[15px]">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-[15px]">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-[15px]">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
