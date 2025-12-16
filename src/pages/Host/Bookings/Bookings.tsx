import Hosting from "./Hosting";
import Renting from "./Renting";

export default function Bookings() {
  return (
    <div className="flex flex-col gap-10 p-4">
      <Hosting />
      <Renting />
    </div>
  );
}
