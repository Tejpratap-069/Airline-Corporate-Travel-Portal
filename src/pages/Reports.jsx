import { useEffect, useState } from "react";
import api from "../api/api";

const Reports = () => {
  const [employees, setEmployees] =
    useState([]);

  const [trips, setTrips] =
    useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const empRes = await api.get(
        "/employees"
      );

      const tripRes = await api.get(
        "/trips"
      );

      setEmployees(empRes.data);
      setTrips(tripRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approvedTrips =
    trips.filter(
      (trip) =>
        trip.status === "Approved"
    ).length;

  const rejectedTrips =
    trips.filter(
      (trip) =>
        trip.status === "Rejected"
    ).length;

  const pendingTrips =
    trips.filter(
      (trip) =>
        trip.status === "Pending"
    ).length;

  const totalBudget =
    trips.reduce(
      (sum, trip) =>
        sum +
        Number(trip.budget || 0),
      0
    );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          Reports & Analytics
        </h1>

        <p className="mt-2">
          Company travel insights
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Total Employees</h3>

          <h1 className="text-5xl font-bold text-blue-600 mt-3">
            {employees.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Total Trips</h3>

          <h1 className="text-5xl font-bold text-green-600 mt-3">
            {trips.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Total Budget</h3>

          <h1 className="text-4xl font-bold text-purple-600 mt-3">
            ₹{totalBudget}
          </h1>

        </div>

      </div>

      {/* Status Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-green-100 p-6 rounded-3xl shadow">

          <h3>Approved Trips</h3>

          <h1 className="text-5xl font-bold text-green-700 mt-3">
            {approvedTrips}
          </h1>

        </div>

        <div className="bg-red-100 p-6 rounded-3xl shadow">

          <h3>Rejected Trips</h3>

          <h1 className="text-5xl font-bold text-red-700 mt-3">
            {rejectedTrips}
          </h1>

        </div>

        <div className="bg-orange-100 p-6 rounded-3xl shadow">

          <h3>Pending Trips</h3>

          <h1 className="text-5xl font-bold text-orange-700 mt-3">
            {pendingTrips}
          </h1>

        </div>

      </div>

      {/* Report Table */}

      <div className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Trip Summary
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
                  Status
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

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Reports;