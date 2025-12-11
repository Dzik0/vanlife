import {
  NavLink,
  Link,
  useParams,
  Outlet,
  useOutletContext,
} from "react-router";
import type { Van } from "../../../types/types";
import { useOwnedVans } from "../../../components/HostLayout";

interface OutletContextProps {
  van: Van;
}

export default function RentedVanHost() {
  const { hostVans, loading, error } = useOwnedVans();

  if (error) console.log("Error:", error);
  const { id } = useParams();

  const van = hostVans.find((van) => van.id.toLocaleString() === id);

  const activeStyle = {
    fontWeight: "600",
    color: "black",
  };

  return (
    <div className="bg-my-beige flex flex-1 flex-col gap-8 p-4 py-8">
      <Link to=".." relative="path">
        🔙 Back to all vans
      </Link>

      {loading && <p className="py-5 text-center">Loading your van...🚐</p>}
      {!van && <p>Seems like this van doesn't exist!</p>}
      {!loading && van && (
        <div className="flex flex-col gap-5 rounded-md bg-white p-4">
          <div className="flex flex-row items-center gap-4">
            <div className="h-25 w-25">
              <img
                src={van?.imageUrl}
                alt=""
                className="h-full w-full rounded-md object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div>
                <span className="bg-my-orange rounded-md p-1 px-3 text-sm text-white capitalize">
                  {van.type}
                </span>
              </div>
              <h2 className="text-xl font-bold">{van?.name}</h2>
              <p>
                <span className="font-bold">${van?.price}</span>/day
              </p>
            </div>
          </div>
          <nav className="flex flex-row gap-5 text-gray-500">
            <NavLink
              to={`.`}
              end
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Details
            </NavLink>
            <NavLink
              to={`pricing`}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Pricing
            </NavLink>
            <NavLink
              to={`photos`}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Photos
            </NavLink>
          </nav>
          <Outlet context={{ van } satisfies OutletContextProps} />
        </div>
      )}
    </div>
  );
}

export function useVan() {
  return useOutletContext<OutletContextProps>();
}
