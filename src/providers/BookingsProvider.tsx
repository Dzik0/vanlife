import { createContext, useContext, useState, type ReactNode } from "react";
import { getRentedVans } from "../API/Api";
import type { BookingFirebase } from "../types/types";

interface BookingsProviderProps {
  children: ReactNode;
}

interface ContextProps {
  getData: (id: string) => void;
  rentedVans: BookingFirebase[];
}

const BookingsContext = createContext<ContextProps | undefined>(undefined);

export { BookingsContext };

export default function BookingsProvider({ children }: BookingsProviderProps) {
  const [rentedVans, setRentedVans] = useState<BookingFirebase[]>([]);

  async function getData(id: string) {
    try {
      const data = await getRentedVans(id);
      setRentedVans(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <BookingsContext.Provider value={{ getData, rentedVans }}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookingsContext() {
  const context = useContext(BookingsContext);
  if (!context)
    throw new Error("THis component needs Bookings Context Provider");
  return context;
}
