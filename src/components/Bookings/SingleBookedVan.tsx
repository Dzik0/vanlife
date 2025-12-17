import { useVans } from "../../providers/VansProvider";
import type { BookingFirebase } from "../../types/types";
import { format } from "date-fns";

interface SingleBookedVanProps {
  bookedVan: BookingFirebase;
}

export default function SingleBookedVan({ bookedVan }: SingleBookedVanProps) {
  const { vans } = useVans();
  const foundVan = vans.find((van) => van.id === bookedVan.vanId);
  const start = bookedVan.startDate.toDate();
  const end = bookedVan.endDate.toDate();

  if (!foundVan?.photos)
    return <div className="w-full rounded-md bg-white p-8">Loading...</div>;

  return (
    <div className="flex flex-row items-center justify-between gap-5 rounded-md border bg-white p-4 shadow-sm">
      <div className="max-h-20 min-h-full max-w-30 overflow-hidden rounded-md">
        <img
          src={foundVan?.photos[0]}
          alt="Van image"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <h3 className="font-bold">{foundVan?.name}</h3>
      <div>
        {format(start, "dd.MM.yyyy")} - {format(end, "dd.MM.yyyy")}
      </div>
      <div>STATUS: {bookedVan.status}</div>
      <button className="rounded-md bg-red-500 p-1 text-white">Cancel</button>
    </div>
  );
}
