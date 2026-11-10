import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: "SkyCorp Travel",
    email: "admin@skycorp.com",
    phone: "+1 9876543210",
    address: "New York, USA",

    darkMode: false,
    emailNotifications: true,
    smsNotifications: false,

    domesticLimit: 5000,
    internationalLimit: 20000,
    approvalLimit: 10000,
  });

  const [settingsId, setSettingsId] = useState(null);
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await api.get("/settings");
        const saved = res.data?.[0];
        if (saved) {
          setSettingsId(saved.id);
          setSettings((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(saved).filter(
                ([key]) => key in prev
              )
            ),
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      if (settingsId) {
        await api.put(`/settings/${settingsId}`, settings);
      } else {
        const res = await api.post("/settings", settings);
        setSettingsId(res.data.id);
      }

      toast.success("Settings Saved");
    } catch (error) {
      toast.error("Save Failed");
    }
  };

  const updatePassword = async () => {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (
      !passwords.current ||
      !passwords.next ||
      !passwords.confirm
    ) {
      toast.error("Fill all password fields");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const res = await api.get(`/users/${user.id}`);
      const account = res.data;

      if (account.password !== passwords.current) {
        toast.error("Current password is incorrect");
        return;
      }

      await api.patch(`/users/${user.id}`, {
        password: passwords.next,
      });

      setPasswords({ current: "", next: "", confirm: "" });
      toast.success("Password Updated");
    } catch (error) {
      toast.error("Password Update Failed");
    }
  };

  const clearCollection = async (resource) => {
    const res = await api.get(`/${resource}`);
    for (const item of res.data) {
      await api.delete(`/${resource}/${item.id}`);
    }
  };

  const deleteAllTrips = async () => {
    if (!window.confirm("Delete ALL trips? This cannot be undone.")) {
      return;
    }

    try {
      await clearCollection("trips");
      toast.success("All Trips Deleted");
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const deleteNotifications = async () => {
    if (
      !window.confirm(
        "Delete ALL notifications? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      await clearCollection("notifications");
      toast.success("Notifications Deleted");
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const resetSystem = async () => {
    if (
      !window.confirm(
        "Reset the system? This deletes all trips, bookings, expenses, calendar events and notifications. Users, employees, companies and settings are kept."
      )
    ) {
      return;
    }

    try {
      for (const resource of [
        "trips",
        "bookings",
        "expenses",
        "calendar",
        "notifications",
      ]) {
        await clearCollection(resource);
      }

      toast.success("System Reset");
    } catch (error) {
      toast.error("Reset Failed");
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-sm">

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2">
          Manage system preferences and configurations
        </p>

      </div>

      {/* Company Settings */}

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

        <h2 className="text-2xl font-bold mb-6">
          Company Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
            placeholder="Company Name"
            value={settings.companyName}
            onChange={(e) =>
              setSettings({
                ...settings,
                companyName:
                  e.target.value,
              })
            }
          />

          <input
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
            placeholder="Company Email"
            value={settings.email}
            onChange={(e) =>
              setSettings({
                ...settings,
                email:
                  e.target.value,
              })
            }
          />

          <input
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
            placeholder="Phone Number"
            value={settings.phone}
            onChange={(e) =>
              setSettings({
                ...settings,
                phone:
                  e.target.value,
              })
            }
          />

          <input
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
            placeholder="Address"
            value={settings.address}
            onChange={(e) =>
              setSettings({
                ...settings,
                address:
                  e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={saveSettings}
          className="mt-6 bg-sky-600 text-white px-8 py-3 rounded-xl"
        >
          Save Company Settings
        </button>

      </div>

      {/* User Preferences */}

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

        <h2 className="text-2xl font-bold mb-6">
          User Preferences
        </h2>

        <div className="space-y-5">

          <label className="flex justify-between items-center">

            <span className="font-medium">
              Dark Mode
            </span>

            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() =>
                setSettings({
                  ...settings,
                  darkMode:
                    !settings.darkMode,
                })
              }
            />

          </label>

          <label className="flex justify-between items-center">

            <span className="font-medium">
              Email Notifications
            </span>

            <input
              type="checkbox"
              checked={
                settings.emailNotifications
              }
              onChange={() =>
                setSettings({
                  ...settings,
                  emailNotifications:
                    !settings.emailNotifications,
                })
              }
            />

          </label>

          <label className="flex justify-between items-center">

            <span className="font-medium">
              SMS Notifications
            </span>

            <input
              type="checkbox"
              checked={
                settings.smsNotifications
              }
              onChange={() =>
                setSettings({
                  ...settings,
                  smsNotifications:
                    !settings.smsNotifications,
                })
              }
            />

          </label>

        </div>

      </div>

      {/* Travel Policy */}

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

        <h2 className="text-2xl font-bold mb-6">
          Travel Policy
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <input
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
            type="number"
            placeholder="Domestic Limit"
            value={
              settings.domesticLimit
            }
            onChange={(e) =>
              setSettings({
                ...settings,
                domesticLimit:
                  e.target.value,
              })
            }
          />

          <input
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
            type="number"
            placeholder="International Limit"
            value={
              settings.internationalLimit
            }
            onChange={(e) =>
              setSettings({
                ...settings,
                internationalLimit:
                  e.target.value,
              })
            }
          />

          <input
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
            type="number"
            placeholder="Approval Limit"
            value={
              settings.approvalLimit
            }
            onChange={(e) =>
              setSettings({
                ...settings,
                approvalLimit:
                  e.target.value,
              })
            }
          />

        </div>

      </div>

      {/* Security */}

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

        <h2 className="text-2xl font-bold mb-6">
          Security
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <input
            type="password"
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
            placeholder="Current Password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                current: e.target.value,
              })
            }
          />

          <input
            type="password"
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
            placeholder="New Password"
            value={passwords.next}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                next: e.target.value,
              })
            }
          />

          <input
            type="password"
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
            placeholder="Confirm Password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                confirm: e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={updatePassword}
          className="mt-6 bg-emerald-600 text-white px-8 py-3 rounded-xl"
        >
          Update Password
        </button>

      </div>

      {/* System Info */}

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

        <h2 className="text-2xl font-bold mb-6">
          System Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition">
            <strong>Version:</strong>
            <br />
            1.0.0
          </div>

          <div className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition">
            <strong>Environment:</strong>
            <br />
            Production
          </div>

          <div className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition">
            <strong>Database:</strong>
            <br />
            Express REST API
          </div>

          <div className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition">
            <strong>Last Backup:</strong>
            <br />
            Today
          </div>

        </div>

      </div>

      {/* Danger Zone */}

      <div className="bg-red-50 border border-red-300 p-8 rounded-2xl">

        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Danger Zone
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={deleteAllTrips}
            className="bg-red-500 text-white px-6 py-3 rounded-xl"
          >
            Delete All Trips
          </button>

          <button
            onClick={deleteNotifications}
            className="bg-red-500 text-white px-6 py-3 rounded-xl"
          >
            Delete Notifications
          </button>

          <button
            onClick={resetSystem}
            className="bg-red-700 text-white px-6 py-3 rounded-xl"
          >
            Reset System
          </button>

        </div>

      </div>

    </div>
  );
};

export default Settings;