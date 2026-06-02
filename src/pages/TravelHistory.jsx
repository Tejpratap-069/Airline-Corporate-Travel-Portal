import { useEffect, useState } from "react";
import api from "../api/api";

const TravelHistory = () => {
  const [history, setHistory] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const res = await api.get("/trips");

    const completedTrips =
      res.data.filter(
        (trip) =>
          trip.employee === user?.name &&
          trip.status === "Approved"
      );

    setHistory(completedTrips);
  };

  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-slate-950 via-slate-800 to-cyan-600 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          Travel History
        </h1>

        <p className="mt-2">
          Previous business trips
        </p>

      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">
                Destination
              </th>

              <th className="p-4 text-left">
                Departure
              </th>

              <th className="p-4 text-left">
                Return
              </th>

              <th className="p-4 text-left">
                Budget
              </th>
            </tr>

          </thead>

          <tbody>

            {history.map((trip) => (
              <tr
                key={trip.id}
                className="border-t"
              >
                <td className="p-4">
                  {trip.destination}
                </td>

                <td className="p-4">
                  {trip.departureDate}
                </td>

                <td className="p-4">
                  {trip.returnDate}
                </td>

                <td className="p-4">
                  ₹{trip.budget}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TravelHistory;