import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const Approvals = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await api.get("/trips");

      const pendingTrips = res.data.filter(
        (trip) => trip.status === "Pending"
      );

      setTrips(pendingTrips);
    } catch (error) {
      console.log(error);
    }
  };

  const approveTrip = async (trip) => {
    try {
      await api.patch(`/trips/${trip.id}`, {
        status: "Approved",
      });

      await api.post("/notifications", {
        message: `${trip.employee}'s trip to ${trip.destination} was approved`,
        date: new Date().toLocaleDateString(),
      });

      toast.success("Trip Approved");

      fetchTrips();
    } catch (error) {
      toast.error("Approval Failed");
    }
  };

  const rejectTrip = async (trip) => {
    try {
      await api.patch(`/trips/${trip.id}`, {
        status: "Rejected",
      });

      await api.post("/notifications", {
        message: `${trip.employee}'s trip to ${trip.destination} was rejected`,
        date: new Date().toLocaleDateString(),
      });

      toast.success("Trip Rejected");

      fetchTrips();
    } catch (error) {
      toast.error("Reject Failed");
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          Trip Approvals
        </h1>

        <p className="mt-2">
          Review and approve travel requests
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3 className="text-gray-500">
            Pending Requests
          </h3>

          <h1 className="text-5xl font-bold text-orange-500 mt-3">
            {trips.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3 className="text-gray-500">
            Ready To Review
          </h3>

          <h1 className="text-5xl font-bold text-blue-600 mt-3">
            {trips.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3 className="text-gray-500">
            Approval Queue
          </h3>

          <h1 className="text-5xl font-bold text-purple-600 mt-3">
            {trips.length}
          </h1>

        </div>

      </div>

      {/* Pending Trips */}

      <div className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Pending Requests
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
                  Purpose
                </th>

                <th className="text-left py-3">
                  Budget
                </th>

                <th className="text-left py-3">
                  Status
                </th>

                <th className="text-left py-3">
                  Actions
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
                    {trip.purpose}
                  </td>

                  <td>
                    ₹{trip.budget}
                  </td>

                  <td>

                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full">

                      Pending

                    </span>

                  </td>

                  <td>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          approveTrip(trip)
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          rejectTrip(trip)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Reject
                      </button>

                    </div>

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

export default Approvals;