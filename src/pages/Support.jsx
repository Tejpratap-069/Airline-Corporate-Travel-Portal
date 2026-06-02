import toast from "react-hot-toast";

const Support = () => {
  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-slate-950 via-slate-800 to-cyan-600 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          Support Center
        </h1>

        <p className="mt-2">
          Need help? Contact us.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-2xl font-bold mb-3">
            HR Support
          </h2>

          <p>
            hr@skycorp.com
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-2xl font-bold mb-3">
            Travel Team
          </h2>

          <p>
            travel@skycorp.com
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-2xl font-bold mb-3">
            Emergency
          </h2>

          <p>
            +1 800 123 4567
          </p>
        </div>

      </div>

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-5">
          Raise Ticket
        </h2>

        <textarea
          className="w-full border p-4 rounded-xl"
          rows="5"
          placeholder="Describe your issue..."
        />

        <button
          onClick={() =>
            toast.success(
              "Ticket Submitted"
            )
          }
          className="mt-5 bg-cyan-600 text-white px-8 py-3 rounded-xl"
        >
          Submit Ticket
        </button>

      </div>

    </div>
  );
};

export default Support;