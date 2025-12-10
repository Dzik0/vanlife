import { Link, useLocation, useParams } from "react-router";
import { type Van } from "../../types/types";
import { useVans } from "../../providers/VansProvider";

export default function Van() {
  const location = useLocation();
  const search = `?${location.state?.search}` || "";
  /*   const searchName = search
    .split("&")
    .splice(0, 1)
    .toString()
    .split("")
    .splice(6)
    .join(""); */

  const searchName: "simple" | "rugged" | "luxury" | "all" =
    location.state?.type || "all";

  const { vans, loading, error } = useVans();
  if (error) console.log("Error:", error);

  const { id } = useParams();

  const van = vans.find((item) => item.id.toLocaleString() === id);

  if (loading) {
    return <p className="bg-my-beige py-10 text-center">LOADING....🚐</p>;
  }

  if (!van) {
    return <p className="p-5 text-center">Sorry, this van doesnt exist :(</p>;
  }

  if (error) {
    return (
      <p className="p-5 text-center">
        Problem with fetching data, please try again later
      </p>
    );
  }

  return (
    van && (
      <div className="bg-my-beige flex flex-col gap-10 px-5 py-10">
        <div className="flex flex-row items-center gap-2">
          <div className="text-2xl text-gray-300">←</div>
          <button className="text-sm">
            <Link to={`..${search}`} relative="path">
              Go back to {searchName} vans
            </Link>
          </button>
        </div>
        <div className="flex flex-col gap-8">
          <div className="overflow-hidden rounded-md">
            <img
              src={van.imageUrl}
              alt="Van image"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <button className="bg-my-orange rounded-md p-1 px-3 text-sm text-white capitalize">
                {van.type}
              </button>
            </div>
            <h1 className="text-2xl font-bold">{van.name}</h1>
            <p>
              <span className="text-xl font-bold">${van.price}</span>
              <span className="text-sm">/day</span>
            </p>
            <p className="text-sm">{van.description}</p>
            <button className="bg-my-orange mt-5 rounded-md p-3 text-white">
              Rent this van
            </button>
          </div>
        </div>
      </div>
    )
  );
}
