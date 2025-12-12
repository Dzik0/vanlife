import { useState } from "react";
import { useVan } from "./RentedVanHost";

export default function RentedVanPhotos() {
  const { van } = useVan();
  const [file, setFile] = useState();

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="flex flex-row gap-4">
        <div className="h-20 w-20">
          <img
            src={van?.imageUrl}
            alt=""
            className="h-full w-full rounded-md object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="file">Choose photo</label>

          <div>
            <input
              type="file"
              name="file"
              id="file"
              className="border-my-orange rounded-md border p-1"
              value={file}
            />
          </div>
        </div>
        <div>
          <button className="bg-my-orange rounded-md p-1 px-3 text-white">
            Add photos
          </button>
        </div>
      </div>
    </div>
  );
}
