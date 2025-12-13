import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db, storage } from "../../API/Api";
import { useAuthContext } from "../../providers/AuthProvider";
import { ref, uploadBytes } from "firebase/storage";
import { useVans } from "../../providers/VansProvider";
import { useNavigate } from "react-router";

interface ErrorProps {
  name?: boolean;
  price?: boolean;
  description?: boolean;
  file?: string;
}

export default function NewVan() {
  const navigate = useNavigate();
  const { loadHostVans } = useVans();
  const [errors, setErrors] = useState<ErrorProps | null>(null);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { profile } = useAuthContext();
  const [details, setDetails] = useState({
    name: "",
    price: "",
    type: "simple",
    description: "",
    hostId: profile.id,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.currentTarget;
    setDetails((pS) => ({ ...pS, [name]: value }));
  }

  console.log(details);

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(details, "img:", file);
    const vanId = crypto.randomUUID();
    const vansRef = doc(db, "vans", vanId);
    const fileRef = ref(
      storage,
      `vansphotos/van-${vanId}/${crypto.randomUUID()}`,
    );

    const newErrors: ErrorProps = {};

    if (details.name === "") {
      newErrors.name = true;
    }

    if (details.price === "") {
      newErrors.price = true;
    }

    if (details.description === "") {
      newErrors.description = true;
    }

    if (!file) {
      newErrors.file = "At least one photo is required";
    }

    const hasErrors = Object.values(newErrors).length > 0;

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    if (!file) return;

    setErrors(null);

    try {
      setUploading(true);
      await setDoc(vansRef, { ...details, createdAt: new Date() });
      await uploadBytes(fileRef, file);
      await loadHostVans(profile.id);

      navigate(`/host/vans/${vanId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-15 p-5">
      <h1 className="text-my-orange text-3xl font-bold">
        Fill out the form to add your new van
      </h1>
      <form onSubmit={handleForm} className="flex flex-col gap-5">
        {/* NAME */}
        <div>
          <label htmlFor="name">
            <span className="mr-5 font-bold">Van name:</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border-my-orange rounded-md border bg-white p-1 pl-3"
            onChange={handleChange}
          />
          {errors?.name && (
            <p className="mt-2 text-sm text-red-500">This field is required</p>
          )}
        </div>
        {/* PRICE */}
        <div>
          <label htmlFor="price">
            <span className="mr-5 font-bold">Price (USD):</span>
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="border-my-orange rounded-md border bg-white p-1 pl-3"
            onChange={handleChange}
          />
          {errors?.price && (
            <p className="mt-2 text-sm text-red-500">This field is required</p>
          )}
        </div>
        {/* TYPE */}
        <div className="w-[50%]">
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

              <label htmlFor="simple" className="cursor-pointer">
                Simple
              </label>
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

              <label htmlFor="luxury" className="cursor-pointer">
                Luxury
              </label>
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

              <label htmlFor="rugged" className="cursor-pointer">
                Rugged
              </label>
            </div>
          </fieldset>
        </div>
        {/* DESC */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description">
            <span className="mr-5 font-bold">Description:</span>
          </label>
          <textarea
            name="description"
            id="description"
            className="border-my-orange h-30 w-100 rounded-md border bg-white p-2 text-black"
            onChange={handleChange}
            value={details.description}
          />
          {errors?.description && (
            <p className="mt-2 text-sm text-red-500">This field is required</p>
          )}
        </div>
        {/* IMAGE */}
        <div className="mt-5 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <div>
              <label
                htmlFor="file"
                className="bg-my-orange cursor-pointer rounded-md p-2 font-bold text-white"
              >
                {file ? "Choose a different photo" : "Upload a new photo"}
              </label>
            </div>
            {file && (
              <div className="mt-3 text-sm text-slate-600">
                Selected: {file?.name}
              </div>
            )}
            <div>
              <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] ?? null;
                  setFile(selectedFile);
                }}
              />
              {errors?.file && (
                <p className="mt-2 text-sm text-red-500">{errors.file}</p>
              )}
            </div>
          </div>
          {/* {file && (
          <div>
            <button
              className="bg-my-orange cursor-pointer rounded-md p-1 px-3 text-white"
              onClick={handleUpload}
            >
              {sending ? "Uploading..." : "Upload photo"}
            </button>
          </div>
        )} */}
        </div>
        {/* SUBMIT */}
        <div>
          <button className="bg-my-orange cursor-pointer rounded-md p-1 px-3 font-bold text-white uppercase">
            {uploading ? "Listing..." : "List your van"}
          </button>
        </div>
      </form>
    </div>
  );
}

//NEED:
// - desc
// - hostId
// -price:
// -name
//type
