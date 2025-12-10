import { useOwnedVans } from "../../components/HostLayout";
import SingleVan from "../../components/SingleVan";
import { Link } from "react-router";

export default function RentedVans() {
  const { myVans, loading, error } = useOwnedVans();

  if (error) console.log("Error:", error);
  return (
    <div className="bg-my-beige flex flex-1 flex-col gap-4 p-4 py-7 pb-15">
      <div className="flex flex-row items-center justify-between">
        <h3 className="font-bold">Your listed vans</h3>
      </div>
      {loading && <p className="py-5 text-center">Loading your vans...🚐</p>}

      {myVans.length === 0 && !loading && (
        <p className="py-5 text-center">
          You don't have any vans listed at this moment!
        </p>
      )}

      {myVans.length > 0 && (
        <div className="flex flex-col gap-5">
          {myVans.map((van) => (
            <Link to={`${van.id}`} key={van.id}>
              <SingleVan van={van} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
