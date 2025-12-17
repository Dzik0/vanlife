import { useEffect } from "react";
import { useBookingsContext } from "../../../providers/BookingsProvider";
import { useAuthContext } from "../../../providers/AuthProvider";
import SingleBookedVan from "../../../components/Bookings/SingleBookedVan";
import { cancelBooking } from "../../../API/Api";

export default function Renting() {
  const { getRentedVansData, rentedVans } = useBookingsContext();
  const { profile } = useAuthContext();

  async function handleCancelAction(vanId: string) {
    try {
      await cancelBooking(vanId);
      getRentedVansData(profile.id);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (profile.id) {
      getRentedVansData(profile.id);
    }
  }, []);

  if (rentedVans.length === 0) return;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">RENTING</h2>
        <p className="text-sm text-slate-500">Vans that you've booked</p>
        <div className="border border-black opacity-10"></div>
      </div>
      <div className="flex flex-col gap-5">
        {rentedVans.map((van, i) => (
          <SingleBookedVan
            bookedVan={van}
            key={i}
            handleCancelAction={handleCancelAction}
          />
        ))}
      </div>
    </div>
  );
}
