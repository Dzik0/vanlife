import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type Van } from "../types/types";
import { getHostVans, getVans } from "../API/Api";
import { useAuthContext } from "./AuthProvider";

interface VansProviderProps {
  children: ReactNode;
}

interface VansContextProps {
  vans: Van[];
  loading: boolean;
  error: string | null;
  hostVans: Van[];
  loadHostVans: (id: string) => Promise<void>;
}

const VansContext = createContext<VansContextProps | undefined>(undefined);

export default function VansProvider({ children }: VansProviderProps) {
  const { loggedUser } = useAuthContext();
  const [vans, setVans] = useState<Van[]>([]);
  const [hostVans, setHostVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        /* const res = await fetch(url);
        if (!res.ok) throw new Error("Cannot fetch the data");
        const data = await res.json(); */
        const data = await getVans();
        setVans(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  async function loadHostVans(id: string) {
    if (!loggedUser) return;
    const vans = await getHostVans(id);

    setHostVans(vans);
  }

  return (
    <VansContext.Provider
      value={{ vans, loading, error, hostVans, loadHostVans }}
    >
      {children}
    </VansContext.Provider>
  );
}

export function useVans() {
  const context = useContext(VansContext);
  if (!context) throw new Error("useVans must be used within a VansProvider!");
  return context;
}
