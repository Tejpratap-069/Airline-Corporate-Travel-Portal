import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const TripRequests = () => {
  const [trips, setTrips] = useState([]);
  const user = JSON.parse(
  localStorage.getItem("user")
);

  const [form, setForm] = useState({
    employee: "",
    destination: "",
    purpose: "",
    budget: "",
    departureDate: "",
    returnDate: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
  try {
    const res = await api.get("/trips");

    if (user?.role === "Admin") {
      setTrips(res.data);
      return;
    }

    const companyTrips =
      res.data.filter(
        (trip) =>
          trip.company?.toLowerCase() ===
          user?.company?.toLowerCase()
      );

    setTrips(companyTrips);

  } catch (error) {
    console.log(error);
  }
};

  const addTrip = async () => {
    if (
      !form.employee ||
      !form.destination ||
      !form.purpose ||
      !form.budget ||
      !form.departureDate ||
      !form.returnDate
    ) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await api.post("/trips", {
  ...form,
  company: user.company,
});

      toast.success("Trip Request Created");

      setForm({
        employee: "",
        destination: "",
        purpose: "",
        budget: "",
        departureDate: "",
        returnDate: "",
        status: "Pending",
      });

      fetchTrips();
    } catch (error) {
      toast.error("Failed");
    }
  };

  const deleteTrip = async (id) => {
    try {
      await api.delete(`/trips/${id}`);

      toast.success("Trip Deleted");

      fetchTrips();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          Trip Requests
        </h1>

        <p className="mt-2">
          Create and manage travel requests
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Total Trips</h3>

          <h1 className="text-5xl font-bold text-blue-600 mt-3">
            {trips.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Approved</h3>

          <h1 className="text-5xl font-bold text-green-600 mt-3">
            {
              trips.filter(
                (t) => t.status === "Approved"
              ).length
            }
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Pending</h3>

          <h1 className="text-5xl font-bold text-orange-500 mt-3">
            {
              trips.filter(
                (t) => t.status === "Pending"
              ).length
            }
          </h1>

        </div>

      </div>

      {/* Create Trip */}

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Create Trip Request
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            placeholder="Employee Name"
            className="border p-3 rounded-xl"
            value={form.employee}
            onChange={(e) =>
              setForm({
                ...form,
                employee: e.target.value,
              })
            }
          />

          <input
            placeholder="Destination"
            className="border p-3 rounded-xl"
            value={form.destination}
            onChange={(e) =>
              setForm({
                ...form,
                destination: e.target.value,
              })
            }
          />

          <input
            placeholder="Purpose"
            className="border p-3 rounded-xl"
            value={form.purpose}
            onChange={(e) =>
              setForm({
                ...form,
                purpose: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Budget"
            className="border p-3 rounded-xl"
            value={form.budget}
            onChange={(e) =>
              setForm({
                ...form,
                budget: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="border p-3 rounded-xl"
            value={form.departureDate}
            onChange={(e) =>
              setForm({
                ...form,
                departureDate:
                  e.target.value,
              })
            }
          />

          <input
            type="date"
            className="border p-3 rounded-xl"
            value={form.returnDate}
            onChange={(e) =>
              setForm({
                ...form,
                returnDate:
                  e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={addTrip}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
        >
          Create Request
        </button>

      </div>

      {/* Trips Table */}

      <div className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          All Trip Requests
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Employee
                </th>

                <th className="text-left py-3">
                  Destination
                </th>

                <th className="text-left py-3">
                  Budget
                </th>

                <th className="text-left py-3">
                  Departure
                </th>

                <th className="text-left py-3">
                  Return
                </th>

                <th className="text-left py-3">
                  Status
                </th>

                <th className="text-left py-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {trips.map((trip) => (

                <tr
                  key={trip.id}
                  className="border-b"
                >

                  <td className="py-4">
                    {trip.employee}
                  </td>

                  <td>
                    {trip.destination}
                  </td>

                  <td>
                    ₹{trip.budget}
                  </td>

                  <td>
                    {trip.departureDate}
                  </td>

                  <td>
                    {trip.returnDate}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        trip.status ===
                        "Approved"
                          ? "bg-green-500"
                          : trip.status ===
                            "Rejected"
                          ? "bg-red-500"
                          : "bg-orange-500"
                      }`}
                    >
                      {trip.status}
                    </span>

                  </td>

                  <td>

                    <button
                      onClick={() =>
                        deleteTrip(
                          trip.id
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default TripRequests;