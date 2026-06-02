import { useEffect, useState } from "react";
import api from "../api/api";

const MyTrips = () => {
  const [trips, setTrips] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    const res = await api.get("/trips");

    const userTrips = res.data.filter(
      (trip) =>
        trip.employee === user?.name
    );

    setTrips(userTrips);
  };

  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-slate-950 via-slate-800 to-cyan-600 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          My Trips
        </h1>

        <p className="mt-2">
          View all your travel requests
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Total Trips</h3>
          <h1 className="text-4xl font-bold">
            {trips.length}
          </h1>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Approved</h3>
          <h1 className="text-4xl font-bold text-green-600">
            {
              trips.filter(
                (t) =>
                  t.status === "Approved"
              ).length
            }
          </h1>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Pending</h3>
          <h1 className="text-4xl font-bold text-orange-500">
            {
              trips.filter(
                (t) =>
                  t.status === "Pending"
              ).length
            }
          </h1>
        </div>

      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">
                Destination
              </th>

              <th className="p-4 text-left">
                Purpose
              </th>

              <th className="p-4 text-left">
                Budget
              </th>

              <th className="p-4 text-left">
                Status
              </th>
            </tr>

          </thead>

          <tbody>

            {trips.map((trip) => (
              <tr
                key={trip.id}
                className="border-t"
              >
                <td className="p-4">
                  {trip.destination}
                </td>

                <td className="p-4">
                  {trip.purpose}
                </td>

                <td className="p-4">
                  ₹{trip.budget}
                </td>

                <td className="p-4">
                  {trip.status}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MyTrips;