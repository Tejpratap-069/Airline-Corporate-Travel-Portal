import { useEffect, useState } from "react";
import api from "../api/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [trips, setTrips] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const empRes = await api.get("/employees");
    const tripRes = await api.get("/trips");

    setEmployees(empRes.data);
    setTrips(tripRes.data);
  };

  const approvedTrips = trips.filter(
    (t) => t.status === "Approved"
  ).length;

  const pendingTrips = trips.filter(
    (t) => t.status === "Pending"
  ).length;

  const chartData = [
    {
      name: "Employees",
      value: employees.length,
    },
    {
      name: "Trips",
      value: trips.length,
    },
  ];

  const pieData = [
    {
      name: "Approved",
      value: approvedTrips,
    },
    {
      name: "Pending",
      value: pendingTrips,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
  ];

  return (
    <div className="space-y-8">

      {/* Welcome Card */}

      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold">
          Welcome Back, {user?.name}
        </h1>

        <p className="mt-3 text-lg">
          Role: {user?.role}
        </p>

        <p>
          Company: {user?.company}
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl shadow p-6">

          <h3 className="text-gray-500">
            Employees
          </h3>

          <h1 className="text-5xl font-bold text-blue-600 mt-3">
            {employees.length}
          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <h3 className="text-gray-500">
            Total Trips
          </h3>

          <h1 className="text-5xl font-bold text-green-600 mt-3">
            {trips.length}
          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <h3 className="text-gray-500">
            Approved
          </h3>

          <h1 className="text-5xl font-bold text-purple-600 mt-3">
            {approvedTrips}
          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <h3 className="text-gray-500">
            Pending
          </h3>

          <h1 className="text-5xl font-bold text-orange-500 mt-3">
            {pendingTrips}
          </h1>

        </div>

      </div>

      {/* Charts */}

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4">
            Company Overview
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4">
            Approval Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >

                {pieData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-3xl shadow p-6">

        <h2 className="text-2xl font-bold mb-5">
          Recent Trips
        </h2>

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

                <td className="py-3">
                  {trip.employee}
                </td>

                <td>
                  {trip.destination}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      trip.status === "Approved"
                        ? "bg-green-500"
                        : trip.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
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
  );
};

export default Dashboard;