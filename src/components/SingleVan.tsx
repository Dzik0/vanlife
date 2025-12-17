import { type VanWithPhotos } from "../types/types";

interface SingleVanProps {
  van: VanWithPhotos;
}

export default function SingleVan({ van }: SingleVanProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-20 rounded-md bg-white p-4">
      <div className="flex flex-row items-center gap-4">
        <div className="h-15 w-15">
          {!van.photos[0] && (
            <div className="flex h-full w-full items-center justify-center text-xl">
              <span>?</span>
            </div>
          )}
          {van.photos[0] && (
            <img
              src={van.photos[0]}
              alt=""
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </div>
        <div>
          <h4 className="font-bold">{van.name}</h4>
          <p className="text-sm text-gray-500">${van.price}/day</p>
        </div>
      </div>
      <p>Edit</p>
    </div>
  );
}
