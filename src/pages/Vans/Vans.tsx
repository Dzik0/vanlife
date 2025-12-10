import SingleVanItem from "../../components/SingleVanItem";
import { Link, useSearchParams } from "react-router";
import { useVans } from "../../providers/VansProvider";

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();

  //
  const { vans, loading, error } = useVans();

  if (error) console.log("THIS IS THE ERROR WITH FETCHING DATA:", error);

  const type = searchParams.get("type");

  const filteredVans = type ? vans.filter((item) => item.type === type) : vans;
  const vanTypes = getAllTypes();

  //OLD FUNCTION WITH BUTTONS
  /*   function handleFilter(name: "simple" | "luxury" | "rugged") {
    setSearchParams({ type: name });
  }
 */

  /*   function getAllTypes() {
    const myTypes = [];
    vans.forEach((van) => {
      if (myTypes.includes(van.type)) {
        return;
      }

      myTypes.push(van.type);
    });
    return myTypes;
  } */

  //Nice function to get some values from object in the array of objects and dont duplicate them
  function getAllTypes() {
    const types = new Set(vans.map((van) => van.type));
    return Array.from(types);
  }

  if (error) {
    return (
      <p className="p-5 text-center">
        ERROR: Cannot fetch the data, please try again later. Sorry!
      </p>
    );
  }

  return (
    <div className="bg-my-beige flex h-full flex-1 flex-col gap-8 px-5 py-10">
      <h1 className="text-xl font-bold">Explore our van options</h1>
      <div className="flex items-center justify-between">
        <div className="flex flex-row flex-wrap gap-4">
          {/* CLASSIC BUTTONS WITH HARDCODED VALUES */}
          {/*  <button
            className="bg-my-dark-beige cursor-pointer rounded-md px-7 py-2"
            onClick={() => {
              handleFilter("simple");
            }}
          >
            Simple
          </button>
          <button
            className="bg-my-dark-beige cursor-pointer rounded-md px-7 py-2"
            onClick={() => {
              handleFilter("luxury");
            }}
          >
            Luxury
          </button>
          <button
            className="bg-my-dark-beige cursor-pointer rounded-md px-7 py-2"
            onClick={() => {
              handleFilter("rugged");
            }}
          >
            Rugged
          </button> */}

          {/* DYNAMIC BUTTONS BASED ON THE DATA PROVIDED */}
          {/*          {vanTypes.map((type) => (
            <button
              key={type}
              className="bg-my-dark-beige cursor-pointer rounded-md px-7 py-2 capitalize"
              onClick={() => {
                handleFilter(type);
              }}
            >
              {type}
            </button>
          ))} */}

          {/* LINKS FOR PROPER SEMANTICS AND SCREEN READERS */}
          {vanTypes.map((type) => (
            <Link
              key={type}
              className={`${searchParams.get("type") === type ? "font-bold" : "font-medium"} bg-my-dark-beige cursor-pointer rounded-md px-7 py-2 capitalize`}
              to={`?type=${type}`}
            >
              {type}
            </Link>
          ))}
        </div>

        {type && (
          <Link to="." className="cursor-pointer text-sm">
            Clear filters
          </Link>
        )}
      </div>

      {loading && <p className="text-center">Loading vans... 🚐</p>}

      {filteredVans.length === 0 && !loading && (
        <p className="p-2 text-center">Sorry, there are no vans like this :(</p>
      )}

      {filteredVans.length > 0 && (
        <div className="grid grid-cols-1 gap-15">
          {filteredVans.map((van) => (
            <Link
              to={van.id.toLocaleString()}
              key={van.id}
              state={{ search: searchParams.toString(), type: type }}
            >
              <SingleVanItem
                name={van.name}
                imageUrl={van.imageUrl}
                price={van.price}
                type={van.type}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
