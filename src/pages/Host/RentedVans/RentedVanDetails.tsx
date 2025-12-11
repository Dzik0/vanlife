import { useState } from "react";
import { useVan } from "./RentedVanHost";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../API/Api";
import { useVans } from "../../../providers/VansProvider";
import { useAuthContext } from "../../../providers/AuthProvider";

export default function RentedVanDetails() {
  const { van } = useVan();
  const { loadHostVans } = useVans();
  const { profile } = useAuthContext();
  const [editing, setEditing] = useState(false);
  const [details, setDetails] = useState({
    name: van.name,
    type: van.type,
    description: van.description,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setDetails((pS) => ({ ...pS, [name]: value }));
  }

  async function handleUpdate(obj: any) {
    const ref = doc(db, "vans", van.id);

    await updateDoc(ref, obj);

    setEditing(false);
    loadHostVans(profile.id);
  }

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    await handleUpdate(data);
  }

  return (
    <div>
      {!editing ? (
        <div className="flex flex-col gap-4 text-sm">
          <h3>
            <span className="font-bold">Name:</span> {van?.name}
          </h3>
          <p className="capitalize">
            <span className="font-bold">Category:</span> {van?.type}
          </p>
          <p>
            <span className="font-bold">Description:</span> {van?.description}
          </p>
          <div>
            <button
              className="bg-my-orange cursor-pointer rounded-md p-2 px-10 text-white"
              onClick={() => {
                setEditing(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 text-sm">
          <form onSubmit={handleForm} className="flex flex-col gap-2">
            <label htmlFor="name">
              Name:
              <input
                type="text"
                name="name"
                id="name"
                className="ml-5 border"
                onChange={handleChange}
                value={details.name}
              />
            </label>
            <label htmlFor="type">
              Category:
              <input
                type="text"
                name="type"
                id="type"
                className="ml-5 border"
                onChange={handleChange}
                value={details.type}
              />
            </label>
            <label htmlFor="description">
              Description:
              <input
                name="description"
                id="description"
                className="ml-5 h-30 w-100 border"
                onChange={handleChange}
                value={details.description}
              />
            </label>

            <div>
              <button className="bg-my-orange mt-5 cursor-pointer rounded-md p-2 px-10 text-white">
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
