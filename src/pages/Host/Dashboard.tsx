import SingleVan from "../../components/SingleVan";
import { Link } from "react-router";
import { useOwnedVans } from "../../components/HostLayout";
import { useAuthContext } from "../../providers/AuthProvider";

export default function Dashboard() {
  const { hostVans, loading, error } = useOwnedVans();
  const { profile } = useAuthContext();
  if (error) console.log("Error:", error);

  return (
    <div className="bg-my-beige flex-1">
      <h2 className="mt-5 mb-5 p-4 text-2xl font-bold">
        Welcome {profile?.name}!
      </h2>
      {/* <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm text-gray-500">
            Income last{" "}
            <span className="text-base font-semibold text-black">30 days</span>
          </p>
          <p className="text-sm">Details</p>
        </div>
        <h3 className="text-3xl font-bold">$2,260</h3>
      </div> */}
      {/*    <div className="bg-my-darker-beige p-4 py-8">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3">
            <p className="font-bold">Review score</p>
            <div>
              <p>
                <span>+</span> 5.0/5
              </p>
            </div>
          </div>
          <p>Details</p>
        </div>
      </div> */}
      <div className="bg-my-beige flex flex-col gap-4 p-4 py-7">
        <div className="flex flex-row items-center justify-between">
          <h3 className="font-bold">Your listed vans</h3>
          <Link className="text-sm" to="/host/vans">
            {" "}
            View all
          </Link>
        </div>

        {loading && <p className="py-5 text-center">Loading your vans...🚐</p>}

        {hostVans.length === 0 && !loading && (
          <p className="py-5 text-center">
            You don't have any vans listed at this moment!
          </p>
        )}

        {hostVans.length > 0 && (
          <div className="flex flex-col gap-5">
            {hostVans.map((van) => (
              <Link key={van.id} to={`/host/vans/${van.id}`}>
                <SingleVan van={van} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
