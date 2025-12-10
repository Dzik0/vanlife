import SingleVan from "../../components/SingleVan";
import { Link } from "react-router";
import { useOwnedVans } from "../../components/HostLayout";

export default function Dashboard() {
  const { myVans, loading, error } = useOwnedVans();
  if (error) console.log("Error:", error);

  return (
    <>
      <div className="bg-my-dark-beige flex flex-1 flex-col gap-4 p-4">
        <h2 className="text-2xl font-bold">Welcome!</h2>
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm text-gray-500">
            Income last{" "}
            <span className="text-base font-semibold text-black">30 days</span>
          </p>
          <p className="text-sm">Details</p>
        </div>
        <h3 className="text-3xl font-bold">$2,260</h3>
      </div>
      <div className="bg-my-darker-beige p-4 py-8">
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
      </div>
      <div className="bg-my-beige flex flex-col gap-4 p-4 py-7">
        <div className="flex flex-row items-center justify-between">
          <h3 className="font-bold">Your listed vans</h3>
          <Link className="text-sm" to="/host/vans">
            {" "}
            View all
          </Link>
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
              <Link key={van.id} to={`/host/vans/${van.id}`}>
                <SingleVan van={van} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
