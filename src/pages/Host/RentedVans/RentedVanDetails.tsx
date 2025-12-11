import { useState } from "react";
import { useVan } from "./RentedVanHost";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../API/Api";
import { useVans } from "../../../providers/VansProvider";
import { useAuthContext } from "../../../providers/AuthProvider";

interface DetailProps {
  name: string;
  type: string;
  description: string;
}

interface ErrorProps {
  name?: string;
}

export default function RentedVanDetails() {
  const { van } = useVan();
  const { loadHostVans } = useVans();
  const { profile } = useAuthContext();
  const [editing, setEditing] = useState<boolean>(false);
  const [details, setDetails] = useState<DetailProps>({
    name: van.name,
    type: van.type,
    description: van.description,
  });
  const [errors, setErrors] = useState<ErrorProps>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
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
    const newErrors: ErrorProps = {};

    if (details.name === "") {
      newErrors.name = "Name is required";
    }

    const hasErrors = Object.values(newErrors).length > 0;
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
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
          <form
            onSubmit={handleForm}
            className="flex max-w-[40%] flex-col gap-2"
          >
            <label htmlFor="name">
              <span className="mr-5 font-bold">Name:</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border-my-orange rounded-md border bg-white p-1 pl-3"
              onChange={handleChange}
              value={details.name}
            />
            {errors?.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}

            <fieldset className="border-my-orange flex flex-col gap-2 border p-2">
              <legend className="px-4">
                <span className="font-bold">Category:</span>
              </legend>
              <div className="relative flex flex-row items-center gap-2">
                <div
                  onClick={() => {
                    setDetails((pS) => ({ ...pS, type: "simple" }));
                  }}
                  className="border-my-orange absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-[50%] border-2 bg-white"
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <div
                      className={`h-2 w-2 rounded-[50%] ${details.type === "simple" ? "bg-my-orange" : ""}`}
                    ></div>
                  </div>
                </div>

                <input
                  type="radio"
                  name="type"
                  id="simple"
                  value="simple"
                  checked={details.type === "simple"}
                  onChange={() => {
                    setDetails((pS) => ({ ...pS, type: "simple" }));
                  }}
                />

                <label htmlFor="simple">Simple</label>
              </div>

              <div className="relative flex flex-row items-center gap-2">
                <div
                  onClick={() => {
                    setDetails((pS) => ({ ...pS, type: "luxury" }));
                  }}
                  className="border-my-orange absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-[50%] border-2 bg-white"
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <div
                      className={`h-2 w-2 rounded-[50%] ${details.type === "luxury" ? "bg-my-orange" : ""}`}
                    ></div>
                  </div>
                </div>

                <input
                  type="radio"
                  name="type"
                  id="luxury"
                  value="luxury"
                  checked={details.type === "luxury"}
                  onChange={() => {
                    setDetails((pS) => ({ ...pS, type: "luxury" }));
                  }}
                />

                <label htmlFor="luxury">Luxury</label>
              </div>

              <div className="relative flex flex-row items-center gap-2">
                <div
                  onClick={() => {
                    setDetails((pS) => ({ ...pS, type: "rugged" }));
                  }}
                  className="border-my-orange absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-[50%] border-2 bg-white"
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <div
                      className={`h-2 w-2 rounded-[50%] ${details.type === "rugged" ? "bg-my-orange" : ""}`}
                    ></div>
                  </div>
                </div>

                <input
                  type="radio"
                  name="type"
                  id="rugged"
                  value="rugged"
                  checked={details.type === "rugged"}
                  onChange={() => {
                    setDetails((pS) => ({ ...pS, type: "rugged" }));
                  }}
                />

                <label htmlFor="rugged">Rugged</label>
              </div>
            </fieldset>

            <label htmlFor="description">
              <span className="mr-5 font-bold">Description:</span>
            </label>
            <textarea
              name="description"
              id="description"
              className="border-my-orange h-30 w-100 rounded-md border p-2"
              onChange={handleChange}
              value={details.description}
            />

            <div className="flex justify-between">
              <button className="bg-my-orange mt-5 cursor-pointer rounded-md p-2 px-10 text-white">
                Save changes
              </button>
              <button
                className="bg-my-orange mt-5 cursor-pointer rounded-md p-2 px-10 text-white"
                onClick={() => {
                  setEditing(false);
                  setErrors({});
                  setDetails({
                    name: van.name,
                    type: van.type,
                    description: van.description,
                  });
                }}
              >
                Go back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
