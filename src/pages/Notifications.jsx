import { useEffect, useState } from "react";
import api from "../api/api";

const Notifications = () => {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get(
        "/notifications"
      );

      setNotifications(
        res.data.reverse()
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          Notifications
        </h1>

        <p className="mt-2">
          Recent system activities
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Total Notifications</h3>

          <h1 className="text-5xl font-bold text-purple-600 mt-3">
            {notifications.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Recent Activities</h3>

          <h1 className="text-5xl font-bold text-blue-600 mt-3">
            {notifications.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>System Alerts</h3>

          <h1 className="text-5xl font-bold text-green-600 mt-3">
            {notifications.length}
          </h1>

        </div>

      </div>

      {/* Notification Feed */}

      <div className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Recent Notifications
        </h2>

        <div className="space-y-4">

          {notifications.length === 0 ? (
            <p>
              No notifications found
            </p>
          ) : (
            notifications.map(
              (item) => (
                <div
                  key={item.id}
                  className="border rounded-2xl p-5 hover:bg-slate-50"
                >

                  <h3 className="font-semibold text-lg">
                    {item.message}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {item.date}
                  </p>

                </div>
              )
            )
          )}

        </div>

      </div>

    </div>
  );
};

export default Notifications;