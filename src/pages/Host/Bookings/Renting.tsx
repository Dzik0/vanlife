import { useEffect } from "react";
import { useBookingsContext } from "../../../providers/BookingsProvider";
import { useAuthContext } from "../../../providers/AuthProvider";
import SingleBookedVan from "../../../components/Bookings/SingleBookedVan";

export default function Renting() {
  const { getData, rentedVans } = useBookingsContext();
  const { profile } = useAuthContext();

  useEffect(() => {
    if (profile.id) {
      getData(profile.id);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">RENTING</h2>
        <p className="text-sm text-slate-500">Vans that you've booked</p>
        <div className="border border-black opacity-10"></div>
      </div>
      <div className="flex flex-col gap-5">
        {rentedVans.map((van, i) => (
          <SingleBookedVan bookedVan={van} key={i} />
        ))}
      </div>
    </div>
  );
}
