import graph from "/graph.jpg";

export default function Income() {
  return (
    <div className="bg-my-beige flex flex-1 flex-col gap-10 p-4 pb-15">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Income</h2>
        <p>Last 30 days</p>
        <h3 className="text-3xl font-bold">$2,260</h3>
      </div>
      <div>
        <img src={graph} alt="" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <h4>Your transactions (3)</h4>
          <p>Last 30 days</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center justify-between rounded-md bg-white p-4">
            <p className="text-xl font-bold">$720</p>
            <p>1/12/22</p>
          </div>
          <div className="flex flex-row items-center justify-between rounded-md bg-white p-4">
            <p className="text-xl font-bold">$720</p>
            <p>1/12/22</p>
          </div>
          <div className="flex flex-row items-center justify-between rounded-md bg-white p-4">
            <p className="text-xl font-bold">$720</p>
            <p>1/12/22</p>
          </div>
        </div>
      </div>
    </div>
  );
}
