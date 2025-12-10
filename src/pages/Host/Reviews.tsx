import stars from "/stars.jpg";

export default function Reviews() {
  return (
    <div className="bg-my-beige flex flex-1 flex-col gap-5 p-4 pb-15">
      <div className="flex flex-row items-end gap-2">
        <h2 className="text-2xl font-bold">Your reviews</h2>
        <p className="text-sm">last 30 days</p>
      </div>
      <p>
        <span className="text-xl font-bold">5.0</span> <span>+</span> overall
        rating
      </p>
      <div>
        <img src={stars} alt="" />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-bold">Reviews (2)</h3>
        <div className="flex flex-col gap-2 border-b border-b-gray-400 pb-5">
          <div className="text-my-orange text-xl font-bold">+ + + + +</div>
          <p className="text-sm">
            <span className="font-bold">Elliot</span>{" "}
            <span className="text-gray-500">December 1, 2022</span>
          </p>
          <p className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
            reiciendis, quam facere velit eius fugit exercitationem quis
            repellat soluta magni atque cupiditate ut. Iusto maiores, saepe
            quasi adipisci quam aut!
          </p>
        </div>
        <div className="flex flex-col gap-2 border-b border-b-gray-400 pb-5">
          <div className="text-my-orange text-xl font-bold">+ + + + +</div>
          <p className="text-sm">
            <span className="font-bold">Elliot</span>{" "}
            <span className="text-gray-500">December 1, 2022</span>
          </p>
          <p className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
            reiciendis, quam facere velit eius fugit exercitationem quis
            repellat soluta magni atque cupiditate ut. Iusto maiores, saepe
            quasi adipisci quam aut!
          </p>
        </div>
      </div>
    </div>
  );
}
