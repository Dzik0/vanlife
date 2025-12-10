import { type Van } from "../types/types";

type SingleVanProps = Omit<Van, "id" | "description" | "hostId">;

export default function SingleVanItem({
  name,
  imageUrl,
  price,
  type,
}: SingleVanProps) {
  return (
    <div className="flex flex-col">
      <div className="h-70">
        <img
          src={imageUrl}
          alt="Van image"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div className="pt-3">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">{name}</h2>
            <div>
              <button className="bg-my-orange rounded-md px-4 py-1 text-xs text-white capitalize">
                {type}
              </button>
            </div>
          </div>
          <div className="">
            <p className="font-semibold">${price}</p>
            <p className="text-sm">/day</p>
          </div>
        </div>
      </div>
    </div>
  );
}
