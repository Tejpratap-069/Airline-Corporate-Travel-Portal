import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaPlane,
  FaBuilding,
  FaMoneyBillWave,
  FaBell,
  FaCheckCircle,
} from "react-icons/fa";
import api from "../api/api";

const HomeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [trips, setTrips] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(
  localStorage.getItem("user")
);
const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
  try {
    const empRes = await api.get("/employees");
    const tripRes = await api.get("/trips");
    const companyRes = await api.get("/companies");
    const expenseRes = await api.get("/expenses");
    const notificationRes = await api.get("/notifications");

    if (user?.role === "Admin") {
      setEmployees(empRes.data);
      setTrips(tripRes.data);
      setCompanies(companyRes.data);
      setExpenses(expenseRes.data);
      setNotifications(notificationRes.data);
      return;
    }

    setEmployees(
      empRes.data.filter(
        (emp) =>
          emp.company?.toLowerCase() ===
          user?.company?.toLowerCase()
      )
    );

    setTrips(
      tripRes.data.filter(
        (trip) =>
          trip.company?.toLowerCase() ===
          user?.company?.toLowerCase()
      )
    );

    setCompanies(
      companyRes.data.filter(
        (company) =>
          company.name?.toLowerCase() ===
          user?.company?.toLowerCase()
      )
    );

    setExpenses(
      expenseRes.data.filter(
        (expense) =>
          expense.company?.toLowerCase() ===
          user?.company?.toLowerCase()
      )
    );

    setNotifications(notificationRes.data);

  } catch (error) {
    console.log(error);
  }
};

  const totalExpense = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount || 0),
    0
  );

  return (
    <div className="space-y-8">

      {/* Welcome */}

      <div className="bg-gradient-to-r from-black to-cyan-700 text-white p-10 rounded-3xl shadow">

       <h1 className="text-5xl font-bold">
  Welcome Back, {user?.name}
</h1>

<p className="mt-4 text-xl">
  Company: {user?.company}
</p>

<p className="text-lg">
  Role: {user?.role}
</p>

      </div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow">

          <FaUsers
            className="text-blue-600"
            size={35}
          />

          <h3 className="mt-4 text-gray-500">
            Employees
          </h3>

          <h1 className="text-4xl font-bold">
            {employees.length}
          </h1>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <FaPlane
            className="text-green-600"
            size={35}
          />

          <h3 className="mt-4 text-gray-500">
            Trips
          </h3>

          <h1 className="text-4xl font-bold">
            {trips.length}
          </h1>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <FaBuilding
            className="text-purple-600"
            size={35}
          />

          <h3 className="mt-4 text-gray-500">
            Companies
          </h3>

          <h1 className="text-4xl font-bold">
            {companies.length}
          </h1>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <FaMoneyBillWave
            className="text-orange-600"
            size={35}
          />

          <h3 className="mt-4 text-gray-500">
            Expenses
          </h3>

          <h1 className="text-4xl font-bold">
            ₹{totalExpense}
          </h1>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-3xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-4 gap-5">

        <button
  onClick={() => navigate("/trips")}
  className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700"
>
  New Trip Request
</button>

<button
  onClick={() => navigate("/employees")}
  className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700"
>
  Add Employee
</button>

<button
  onClick={() => navigate("/bookings")}
  className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700"
>
  Create Booking
</button>

<button
  onClick={() => navigate("/expenses")}
  className="bg-orange-600 text-white p-4 rounded-xl hover:bg-orange-700"
>
  Submit Expense
</button>

        </div>

      </div>

      {/* Recent Trips */}

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-3xl font-bold">
            Recent Trips
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Destination
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
                  {trip.employee}
                </td>

                <td className="p-4">
                  {trip.destination}
                </td>

                <td className="p-4">
                  ₹{trip.budget}
                </td>

                <td className="p-4">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                    {trip.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Notifications */}

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-3xl font-bold mb-5">
          Notifications
        </h2>

        <div className="space-y-4">

          {notifications.map(
            (notification) => (

              <div
                key={notification.id}
                className="flex items-center gap-4 border p-4 rounded-xl"
              >

                <FaBell className="text-blue-600" />

                <div>

                  <p className="font-semibold">
                    {notification.message}
                  </p>

                  <p className="text-sm text-gray-500">
                    {notification.date}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* Analytics */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-8 rounded-3xl shadow">

          <FaCheckCircle
            size={40}
            className="text-green-600"
          />

          <h2 className="text-2xl font-bold mt-4">
            Approved Trips
          </h2>

          <h1 className="text-5xl font-bold mt-2">
            {
              trips.filter(
                (trip) =>
                  trip.status ===
                  "Approved"
              ).length
            }
          </h1>

        </div>

        <div className="bg-white p-8 rounded-3xl shadow">

          <FaPlane
            size={40}
            className="text-blue-600"
          />

          <h2 className="text-2xl font-bold mt-4">
            Active Travel
          </h2>

          <h1 className="text-5xl font-bold mt-2">
            {trips.length}
          </h1>

        </div>

        <div className="bg-white p-8 rounded-3xl shadow">

          <FaMoneyBillWave
            size={40}
            className="text-orange-600"
          />

          <h2 className="text-2xl font-bold mt-4">
            Travel Budget
          </h2>

          <h1 className="text-5xl font-bold mt-2">
            ₹{totalExpense}
          </h1>

        </div>

      </div>

    </div>
  );
};

export default HomeDashboard;