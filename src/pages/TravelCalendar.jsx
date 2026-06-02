import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const TravelCalendar = () => {
  const [trips, setTrips] = useState([]);

  const [form, setForm] = useState({
    employee: "",
    destination: "",
    date: "",
  });

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const res = await api.get("/calendar");
      setTrips(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTrip = async () => {
    if (
      !form.employee ||
      !form.destination ||
      !form.date
    ) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await api.post("/calendar", {
        id: Date.now().toString(),
        ...form,
      });

      toast.success(
        "Trip Added To Calendar"
      );

      setForm({
        employee: "",
        destination: "",
        date: "",
      });

      loadTrips();
    } catch (error) {
      toast.error("Failed");
    }
  };

  const deleteTrip = async (id) => {
    try {
      await api.delete(`/calendar/${id}`);

      toast.success("Trip Removed");

      loadTrips();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-cyan-700 to-blue-500 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          Travel Calendar
        </h1>

        <p className="mt-2">
          Manage upcoming employee trips
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3 className="text-gray-500">
            Upcoming Trips
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {trips.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3 className="text-gray-500">
            Destinations
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {
              new Set(
                trips.map(
                  (trip) =>
                    trip.destination
                )
              ).size
            }
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3 className="text-gray-500">
            Travelers
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {
              new Set(
                trips.map(
                  (trip) =>
                    trip.employee
                )
              ).size
            }
          </h1>

        </div>

      </div>

      {/* Add Trip */}

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-5">
          Schedule New Trip
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

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

          <input
            type="date"
            className="border p-3 rounded-xl"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={addTrip}
          className="mt-5 bg-cyan-600 text-white px-8 py-3 rounded-xl"
        >
          Add Trip
        </button>

      </div>

      {/* Timeline */}

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Upcoming Schedule
        </h2>

        <div className="space-y-4">

          {trips.map((trip) => (

            <div
              key={trip.id}
              className="border rounded-2xl p-5 flex justify-between items-center"
            >

              <div>

                <h3 className="font-bold text-xl">
                  {trip.destination}
                </h3>

                <p className="text-gray-600">
                  {trip.employee}
                </p>

                <p className="text-blue-600">
                  {trip.date}
                </p>

              </div>

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

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default TravelCalendar;