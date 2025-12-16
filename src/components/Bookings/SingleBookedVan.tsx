import { useEffect, useState } from "react";
import { useVans } from "../../providers/VansProvider";
import type { BookingFirebase } from "../../types/types";
import { showImages } from "../../API/Api";
import { format } from "date-fns";

interface SingleBookedVanProps {
  bookedVan: BookingFirebase;
}

export default function SingleBookedVan({ bookedVan }: SingleBookedVanProps) {
  const { vans } = useVans();
  const [images, setImages] = useState([]);
  const foundVan = vans.find((van) => van.id === bookedVan.vanId);
  const start = bookedVan.startDate.toDate();
  const end = bookedVan.endDate.toDate();
  console.log(start);

  useEffect(() => {
    async function getImages() {
      try {
        const data = await showImages(bookedVan.id);
        console.log("IMAGES:", data);
      } catch (err) {
        console.error(err);
      }
    }

    getImages();
  }, []);

  return (
    <div className="flex flex-row justify-between rounded-md bg-white p-4 shadow-sm">
      {/*    <div>
        <img src={foundVan?.imageUrl} alt="Van image" />
      </div> */}
      <h3>{foundVan?.name}</h3>
      <div>
        {format(start, "dd.MM.yyyy")} - {format(end, "dd.MM.yyyy")}
      </div>
      <div>STATUS: {bookedVan.status}</div>
    </div>
  );
}
