import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type VanWithPhotos } from "../types/types";
import { getAllImages, getHostVans, getVans } from "../API/Api";
import { useAuthContext } from "./AuthProvider";

interface VansProviderProps {
  children: ReactNode;
}

interface VansContextProps {
  vans: VanWithPhotos[];
  loading: boolean;
  error: string | null;
  hostVans: VanWithPhotos[];
  loadHostVans: (id: string) => Promise<void>;
  getData: () => void;
}

const VansContext = createContext<VansContextProps | undefined>(undefined);

export default function VansProvider({ children }: VansProviderProps) {
  const { loggedUser } = useAuthContext();
  const [vans, setVans] = useState<VanWithPhotos[]>([]);
  const [hostVans, setHostVans] = useState<VanWithPhotos[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getData() {
    try {
      setLoading(true);
      const [vani, images] = await Promise.all([getVans(), getAllImages()]);
      const allData = vani.map((van) => {
        const foundPhotos = images.find((photo) => photo.vanId === van.id);
        return { ...van, photos: foundPhotos?.vanPhotos ?? [] };
      });
      console.log(allData);
      setVans(allData);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function loadHostVans(id: string) {
    if (!loggedUser) return;

    const [allVans, allImages] = await Promise.all([
      getHostVans(id),
      getAllImages(),
    ]);
    const allData = allVans.map((van) => {
      const foundItem = allImages.find((image) => image.vanId === van.id);

      return { ...van, photos: foundItem?.vanPhotos ?? [] } as VanWithPhotos;
    });

    setHostVans(allData);
  }

  return (
    <VansContext.Provider
      value={{ getData, vans, loading, error, hostVans, loadHostVans }}
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
