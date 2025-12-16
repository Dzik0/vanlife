export default function Hosting() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">HOSTING</h2>
        <p className="text-sm text-slate-500">Vans that you've rented out</p>
        <div className="border border-black opacity-10"></div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between rounded-md bg-white p-4 shadow-sm">
          <div>Van Img</div>
          <h3>Van name</h3>
          <div>DATES</div>
          <div>STATUS</div>
        </div>
      </div>
    </div>
  );
}
