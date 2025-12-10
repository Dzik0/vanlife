import { Link } from "react-router";
import nightVan from "/nightVan.png";

export default function About() {
  return (
    <div className="bg-my-beige h-full flex-1">
      <div className="h-75">
        <img
          src={nightVan}
          alt="Picture of old T3 Volkswagen"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-10 px-5 py-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold">
            Don't squeeze in a sedan when you could relax in a van.
          </h1>
          <p className="leading-5">
            Our mission is to enliven your road trip with the perfect travel van
            rental. <br />
            Our vans are recertified before each trip to ensure your travel
            plans can go off without a hitch. <br />
            (Hitch costs extra 😉)
          </p>
          <p className="leading-5">
            Our team is full of vanlife enthusiasts who know firsthand the magic
            of touring the world on 4 wheels.
          </p>
        </div>
        <div className="bg-my-yellow flex flex-col gap-5 rounded-md p-7">
          <h2 className="text-2xl font-semibold">
            Your destination is waiting.
            <br />
            Your van is ready.
          </h2>
          <div>
            <Link
              to="/vans"
              className="cursor-pointer rounded-md bg-black p-2 px-6 text-sm text-white hover:opacity-80"
            >
              Explore our vans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
