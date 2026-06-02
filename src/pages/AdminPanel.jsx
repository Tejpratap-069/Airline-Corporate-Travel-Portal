import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] =
    useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const usersRes =
        await api.get("/users");

      const employeesRes =
        await api.get("/employees");

      const tripsRes =
        await api.get("/trips");

      setUsers(usersRes.data);
      setEmployees(
        employeesRes.data
      );
      setTrips(tripsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(
        `/users/${id}`
      );

      toast.success(
        "User Deleted"
      );

      loadData();
    } catch (error) {
      toast.error(
        "Delete Failed"
      );
    }
  };

  const deleteEmployee =
    async (id) => {
      try {
        await api.delete(
          `/employees/${id}`
        );

        toast.success(
          "Employee Deleted"
        );

        loadData();
      } catch (error) {
        toast.error(
          "Delete Failed"
        );
      }
    };

  const deleteTrip = async (id) => {
    try {
      await api.delete(
        `/trips/${id}`
      );

      toast.success(
        "Trip Deleted"
      );

      loadData();
    } catch (error) {
      toast.error(
        "Delete Failed"
      );
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-red-700 to-red-500 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          Admin Panel
        </h1>

        <p className="mt-2">
          System Administration &
          Management
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Total Users</h3>

          <h1 className="text-5xl font-bold text-blue-600 mt-3">
            {users.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Total Employees</h3>

          <h1 className="text-5xl font-bold text-green-600 mt-3">
            {employees.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Total Trips</h3>

          <h1 className="text-5xl font-bold text-purple-600 mt-3">
            {trips.length}
          </h1>

        </div>

      </div>

      {/* Users */}

      <div className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-5">
          User Management
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Name
              </th>

              <th className="text-left py-3">
                Email
              </th>

              <th className="text-left py-3">
                Role
              </th>

              <th className="text-left py-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b"
              >

                <td className="py-3">
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td>

                  <button
                    onClick={() =>
                      deleteUser(
                        user.id
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

      {/* Employees */}

      <div className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-5">
          Employee Management
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Name
              </th>

              <th className="text-left py-3">
                Email
              </th>

              <th className="text-left py-3">
                Department
              </th>

              <th className="text-left py-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {employees.map(
              (employee) => (

                <tr
                  key={employee.id}
                  className="border-b"
                >

                  <td className="py-3">
                    {employee.name}
                  </td>

                  <td>
                    {employee.email}
                  </td>

                  <td>
                    {
                      employee.department
                    }
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        deleteEmployee(
                          employee.id
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* Trips */}

      <div className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-5">
          Trip Management
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

                <td className="py-3">
                  {trip.employee}
                </td>

                <td>
                  {trip.destination}
                </td>

                <td>
                  {trip.status}
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
  );
};

export default AdminPanel;