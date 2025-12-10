import { Link } from "react-router";

export default function Home() {
  return (
    <div id="holder" className="relative flex-1">
      <div className="absolute top-0 bottom-0 z-0 w-full bg-black opacity-60"></div>
      <div className="relative flex flex-col gap-10 p-6 py-20 text-white">
        <h1 className="text-4xl font-bold">
          You got the travel plans, <br />
          we got the travel vans.
        </h1>
        <div className="text-gray-300">
          <p>Add adventure to your life by joining the #vanlife movement</p>
          <p>Rent the perfect van to make your perfect road trip.</p>
        </div>

        <Link
          to="vans"
          className="bg-my-orange cursor-pointer rounded-md p-4 text-center font-bold hover:opacity-90"
        >
          Find your van
        </Link>
      </div>
    </div>
  );
}

/* const vans = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("Vans from firestore:", vans); */
