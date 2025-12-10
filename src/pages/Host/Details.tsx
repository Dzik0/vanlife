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

  return (
    <div className="bg-my-beige flex-1">
      {!editing ? (
        <div>
          <h1>Your details:</h1>
          <p>Id: {profile.id}</p>
          <p>Name: {profile.name}</p>
          <p>Phone: {profile.phone}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <label htmlFor="">
            Name:
            <input
              type="text"
              name="name"
              className="border"
              onChange={handleChange}
              value={details.name}
            />
          </label>
          <label htmlFor="">
            Phone:
            <input
              type="text"
              name="phone"
              className="border"
              onChange={handleChange}
              value={details.phone}
            />
          </label>
        </div>
      )}
      {!editing ? (
        <button
          className="bg-my-orange p-1 font-bold text-white"
          onClick={() => {
            setEditing((pS) => !pS);
          }}
        >
          Edit details
        </button>
      ) : (
        <button
          className="bg-my-orange p-1 font-bold text-white"
          onClick={handleUpdate}
        >
          Save details
        </button>
      )}
    </div>
  );
}
