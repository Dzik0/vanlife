import { onAuthStateChanged, type User } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { auth, getUserDetails } from "../API/Api";
import type { UserFirebase } from "../types/types";

interface AuthProviderProps {
  children: ReactNode;
}

interface ContextProps {
  loggedUser: User | null;
  loading: boolean;
  profile: UserFirebase;
  setProfile: (p: UserFirebase | null) => void;
}

const AuthContext = createContext<ContextProps | undefined>(undefined);

export { AuthContext };

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    console.log("Running useEffect!");
    const authStateChange = onAuthStateChanged(auth, async (user) => {
      setLoggedUser(user);

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const data = await getUserDetails(user.uid);
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });

    return () => authStateChange();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedUser, loading, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("This component needs AuthContext Provider!");

  return context;
}
