import { useState } from "react";
import toast from "react-hot-toast";

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

  const saveSettings = () => {
    toast.success("Settings Saved");
  };

  const updatePassword = () => {
    toast.success("Password Updated");
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2">
          Manage system preferences and configurations
        </p>

      </div>

      {/* Company Settings */}

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Company Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            className="border p-4 rounded-xl"
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
            className="border p-4 rounded-xl"
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
            className="border p-4 rounded-xl"
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
            className="border p-4 rounded-xl"
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
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl"
        >
          Save Company Settings
        </button>

      </div>

      {/* User Preferences */}

      <div className="bg-white p-8 rounded-3xl shadow">

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

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Travel Policy
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <input
            className="border p-4 rounded-xl"
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
            className="border p-4 rounded-xl"
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
            className="border p-4 rounded-xl"
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

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Security
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <input
            type="password"
            className="border p-4 rounded-xl"
            placeholder="Current Password"
          />

          <input
            type="password"
            className="border p-4 rounded-xl"
            placeholder="New Password"
          />

          <input
            type="password"
            className="border p-4 rounded-xl"
            placeholder="Confirm Password"
          />

        </div>

        <button
          onClick={updatePassword}
          className="mt-6 bg-green-600 text-white px-8 py-3 rounded-xl"
        >
          Update Password
        </button>

      </div>

      {/* System Info */}

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          System Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="border p-4 rounded-xl">
            <strong>Version:</strong>
            <br />
            1.0.0
          </div>

          <div className="border p-4 rounded-xl">
            <strong>Environment:</strong>
            <br />
            Production
          </div>

          <div className="border p-4 rounded-xl">
            <strong>Database:</strong>
            <br />
            JSON Server
          </div>

          <div className="border p-4 rounded-xl">
            <strong>Last Backup:</strong>
            <br />
            Today
          </div>

        </div>

      </div>

      {/* Danger Zone */}

      <div className="bg-red-50 border border-red-300 p-8 rounded-3xl">

        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Danger Zone
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            className="bg-red-500 text-white px-6 py-3 rounded-xl"
          >
            Delete All Trips
          </button>

          <button
            className="bg-red-500 text-white px-6 py-3 rounded-xl"
          >
            Delete Notifications
          </button>

          <button
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