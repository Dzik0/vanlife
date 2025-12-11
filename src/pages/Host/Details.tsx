import { useState } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../API/Api";

export default function Details() {
  const { profile, setProfile } = useAuthContext();
  const [editing, setEditing] = useState(false);
  const [details, setDetails] = useState({
    name: profile.name,
    phone: profile.phone,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setDetails((pS) => ({ ...pS, [name]: value }));
  }

  async function handleUpdate() {
    const ref = doc(db, "users", profile.id);

    await updateDoc(ref, {
      name: details.name,
      phone: details.phone,
    });

    setEditing(false);
    setProfile(
      profile
        ? { ...profile, name: details.name, phone: details.phone }
        : profile,
    );
  }

  if (editing) {
    return (
      <div className="bg-my-beige flex-1 p-5">
        <h1 className="mb-10 text-xl font-bold">Edit your details</h1>
        <div className="flex flex-col gap-5">
          <label htmlFor="">
            <span className="mr-5 font-bold">Name:</span>
            <input
              type="text"
              name="name"
              className="border-my-orange rounded-md border bg-white p-1 pl-3"
              onChange={handleChange}
              value={details.name}
            />
          </label>
          <label htmlFor="">
            <span className="mr-5 font-bold">Phone:</span>
            <input
              type="number"
              name="phone"
              className="border-my-orange rounded-md border bg-white p-1 pl-3"
              onChange={handleChange}
              value={details.phone}
            />
          </label>
        </div>
        <button
          className="bg-my-orange mt-10 cursor-pointer rounded-md p-1 px-4 font-bold text-white"
          onClick={handleUpdate}
        >
          Save details
        </button>
      </div>
    );
  }

  return (
    <div className="bg-my-beige flex-1 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Your details:</h1>
        <p>
          <span className="font-bold">Id:</span> {profile.id}
        </p>
        <p>
          <span className="font-bold">Name:</span> {profile.name}
        </p>
        <p>
          <span className="font-bold">Phone:</span> {profile.phone}
        </p>
      </div>

      <button
        className="bg-my-orange mt-5 cursor-pointer rounded-md p-1 px-3 font-bold text-white"
        onClick={() => {
          setEditing((pS) => !pS);
        }}
      >
        Edit details
      </button>
    </div>
  );
}
