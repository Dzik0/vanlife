import { useEffect, useState } from "react";
import { useVan } from "./RentedVanHost";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { storage, getSingleVanImages } from "../../../API/Api";

export default function RentedVanPhotos() {
  const { van } = useVan();
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  async function handleUpload() {
    if (!file) return;

    const fileRef = ref(
      storage,
      `vansphotos/van-${van.id}/${crypto.randomUUID()}`,
    );
    try {
      setSending(true);
      await uploadBytes(fileRef, file);
      await loadImages();
      console.log("Uploaded!");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }

    console.log("sent)");
    setFile(null);
  }

  async function deleteImage(url: string) {
    const imageRef = ref(storage, url);
    try {
      await deleteObject(imageRef);
      await loadImages();
    } catch (err) {
      console.error(err);
    }
  }

  async function loadImages() {
    const imageList = await getSingleVanImages(van.id);
    setImages(imageList);
  }

  useEffect(() => {
    loadImages();
  }, [van.id]);

  return (
    <div className="relative flex flex-1 flex-col gap-5">
      {confirmDelete && (
        <div className="bg-my-orange absolute left-1/2 z-20 flex -translate-x-1/2 flex-col gap-2 rounded-md border p-5 font-bold text-white shadow-xl shadow-slate-300">
          <p>Are you sure?</p>
          <p>This action cannot be undone.</p>
          <button
            className="text-my-orange cursor-pointer rounded-md bg-white p-1 px-3"
            onClick={async () => {
              await deleteImage(confirmDelete);
              setConfirmDelete(null);
            }}
          >
            Confirm
          </button>
          <button
            className="text-my-orange cursor-pointer rounded-md bg-white p-1 px-3"
            onClick={() => {
              setConfirmDelete(null);
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <div className="flex flex-row gap-4">
        {images.length === 0 && <p>Loading images...</p>}
        {images.map((img, i) => (
          <div className="relative h-20 w-20" key={i}>
            <img
              src={img}
              alt=""
              className="h-full w-full rounded-md object-cover"
            />
            <button
              className="text-my-orange absolute -top-2 -right-2 flex h-2 w-2 cursor-pointer items-center justify-center rounded-[50%] border-2 bg-white p-2 text-sm font-bold"
              onClick={() => {
                setConfirmDelete(img);
              }}
            >
              <span>X</span>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-10">
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
          </div>
        </div>
        {file && (
          <div>
            <button
              className="bg-my-orange cursor-pointer rounded-md p-1 px-3 text-white"
              onClick={handleUpload}
            >
              {sending ? "Uploading..." : "Upload photo"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
