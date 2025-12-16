import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range";
import { useState } from "react";
import { addDays, startOfToday } from "date-fns";
import type { Range } from "react-date-range"; // Add types if using TS
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../API/Api";
import { useAuthContext } from "../../providers/AuthProvider";

interface BookingCalendarProps {
  vanId: string | undefined;
}

export default function BookingCalendar({ vanId }: BookingCalendarProps) {
  const { profile } = useAuthContext();
  const today = startOfToday();
  const [range, setRange] = useState<Range[]>([
    { startDate: today, endDate: addDays(today, 3), key: "selection" },
  ]);

  async function handleBooking() {
    const dataRef = collection(db, "bookings");
    try {
      await addDoc(dataRef, {
        userId: profile.id,
        vanId: vanId,
        startDate: range[0].startDate,
        endDate: range[0].endDate,
        createdAt: Timestamp.now(),
        status: "pending",
      });
      console.log("Added!");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <DateRange
        ranges={range}
        onChange={(item: any) => setRange([item.selection])}
        moveRangeOnFirstSelection={false}
        minDate={today}
        rangeColors={["orange"]}
        showDateDisplay={false}
        className="rounded-md shadow-md"
      />
      <button
        className="bg-my-orange rounded-md p-1 px-3 font-bold text-white"
        onClick={handleBooking}
      >
        Book now!
      </button>
    </>
  );
}
