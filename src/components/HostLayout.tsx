import { NavLink, Outlet, useOutletContext } from "react-router";
import { useVans } from "../providers/VansProvider";
import { type Van } from "../types/types";
import { useAuthContext } from "../providers/AuthProvider";
import { useEffect } from "react";

interface StyleProps {
  isActive: boolean;
}

interface OutletContextProps {
  hostVans: Van[];
  loading: boolean;
  error: string | null;
}

export default function HostLayout() {
  const activeLink = {
    fontWeight: "600",
    color: "black",
  };

  const { loading, error, hostVans, loadHostVans } = useVans();
  const { profile, loading: authLoading } = useAuthContext();

  useEffect(() => {
    if (profile?.id) loadHostVans(profile.id);
  }, [profile?.id]);

  if (authLoading) return <p>Loading...</p>;

  return (
    <>
      <nav className="bg-my-beige flex flex-row gap-5 p-4 text-gray-400">
        <NavLink
          to="."
          end
          className="hover:text-black hover:underline"
          style={({ isActive }: StyleProps) =>
            isActive ? activeLink : undefined
          }
        >
          Dashboard
        </NavLink>
        {/*  <NavLink
          to="income"
          className="hover:text-black hover:underline"
          style={({ isActive }: StyleProps) =>
            isActive ? activeLink : undefined
          }
        >
          Income
        </NavLink> */}
        <NavLink
          to="vans"
          className="hover:text-black hover:underline"
          style={({ isActive }: StyleProps) =>
            isActive ? activeLink : undefined
          }
        >
          Vans
        </NavLink>
        {/*   <NavLink
          to="reviews"
          className="hover:text-black hover:underline"
          style={({ isActive }: StyleProps) =>
            isActive ? activeLink : undefined
          }
        >
          Reviews
        </NavLink> */}
        <NavLink
          to="details"
          className="hover:text-black hover:underline"
          style={({ isActive }: StyleProps) =>
            isActive ? activeLink : undefined
          }
        >
          Details
        </NavLink>
        <NavLink
          to="bookings"
          className="hover:text-black hover:underline"
          style={({ isActive }: StyleProps) =>
            isActive ? activeLink : undefined
          }
        >
          Bookings
        </NavLink>
      </nav>
      <Outlet
        context={{ hostVans, loading, error } satisfies OutletContextProps}
      />
    </>
  );
}

export function useOwnedVans() {
  const context = useOutletContext<OutletContextProps>();

  return context;
}
