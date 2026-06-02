const Policies = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-5">
        Travel Policies
      </h1>

      <div className="bg-white p-6 rounded shadow">

        <ul className="space-y-3">

          <li>
            Employees must submit travel requests at least 7 days before departure.
          </li>

          <li>
            International travel requires manager approval.
          </li>

          <li>
            Hotel expenses above company limits require justification.
          </li>

          <li>
            All travel receipts must be submitted within 5 working days.
          </li>

        </ul>

      </div>

    </div>
  );
};

export default Policies;