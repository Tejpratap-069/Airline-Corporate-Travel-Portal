import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(
  localStorage.getItem("user")
);

  const [form, setForm] = useState({
    employee: "",
    airline: "",
    destination: "",
    status: "Confirmed",
  });

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
  try {
    const res = await api.get("/bookings");

    if (user?.role === "Admin") {
      setBookings(res.data);
      return;
    }

    const companyBookings =
      res.data.filter(
        (booking) =>
          booking.company?.toLowerCase() ===
          user?.company?.toLowerCase()
      );

    setBookings(companyBookings);

  } catch (error) {
    console.log(error);
  }
};

  const addBooking = async () => {
    if (
      !form.employee ||
      !form.airline ||
      !form.destination
    ) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await api.post("/bookings", {
  id: Date.now().toString(),
  ...form,
  company: user.company,
});

      toast.success("Booking Added");

      setForm({
        employee: "",
        airline: "",
        destination: "",
        status: "Confirmed",
      });

      loadBookings();
    } catch (error) {
      toast.error("Failed");
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);

      toast.success("Booking Deleted");

      loadBookings();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          Flight Bookings
        </h1>

        <p className="mt-2">
          Manage airline reservations and travel bookings
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3 className="text-gray-500">
            Total Bookings
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {bookings.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3 className="text-gray-500">
            Confirmed
          </h3>

          <h1 className="text-4xl font-bold mt-2 text-green-600">
            {
              bookings.filter(
                (b) =>
                  b.status ===
                  "Confirmed"
              ).length
            }
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3 className="text-gray-500">
            Pending
          </h3>

          <h1 className="text-4xl font-bold mt-2 text-orange-500">
            {
              bookings.filter(
                (b) =>
                  b.status ===
                  "Pending"
              ).length
            }
          </h1>

        </div>

      </div>

      {/* Add Booking */}

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-5">
          New Booking
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <input
            placeholder="Employee Name"
            className="border p-3 rounded-xl"
            value={form.employee}
            onChange={(e) =>
              setForm({
                ...form,
                employee:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Airline"
            className="border p-3 rounded-xl"
            value={form.airline}
            onChange={(e) =>
              setForm({
                ...form,
                airline:
                  e.target.value,
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
                destination:
                  e.target.value,
              })
            }
          />

          <select
            className="border p-3 rounded-xl"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target.value,
              })
            }
          >
            <option>
              Confirmed
            </option>
            <option>
              Pending
            </option>
            <option>
              Cancelled
            </option>
          </select>

        </div>

        <button
          onClick={addBooking}
          className="mt-5 bg-purple-600 text-white px-8 py-3 rounded-xl"
        >
          Add Booking
        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Airline
              </th>

              <th className="p-4 text-left">
                Destination
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {bookings.map(
              (booking) => (
                <tr
                  key={booking.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {booking.employee}
                  </td>

                  <td className="p-4">
                    {booking.airline}
                  </td>

                  <td className="p-4">
                    {booking.destination}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        booking.status ===
                        "Confirmed"
                          ? "bg-green-500"
                          : booking.status ===
                            "Pending"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        deleteBooking(
                          booking.id
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

    </div>
  );
};

export default Bookings;