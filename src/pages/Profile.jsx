import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";

const Profile = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [profile, setProfile] =
    useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get(
        `/users/${currentUser.id}`
      );

      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      await api.put(
        `/users/${profile.id}`,
        profile
      );

      localStorage.setItem(
        "user",
        JSON.stringify(profile)
      );

      toast.success(
        "Profile Updated"
      );
    } catch (error) {
      toast.error(
        "Update Failed"
      );
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          My Profile
        </h1>

        <p className="mt-2">
          Manage your account
          information
        </p>

      </div>

      {/* Profile Card */}

      <div className="bg-white rounded-3xl shadow p-10">

        <div className="flex flex-col items-center">

          <div className="w-32 h-32 rounded-full bg-blue-600 text-white text-5xl font-bold flex items-center justify-center">

            {profile?.name?.charAt(0)}

          </div>

          <h2 className="text-3xl font-bold mt-5">
            {profile.name}
          </h2>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full mt-3">

            {profile.role}

          </span>

        </div>

      </div>

      {/* Details */}

      <div className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Name"
            value={profile.name || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
            className="border p-4 rounded-xl"
          />

          <input
            type="email"
            placeholder="Email"
            value={profile.email || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
            className="border p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Phone"
            value={profile.phone || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value,
              })
            }
            className="border p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Company"
            value={profile.company || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                company:
                  e.target.value,
              })
            }
            className="border p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Department"
            value={
              profile.department || ""
            }
            onChange={(e) =>
              setProfile({
                ...profile,
                department:
                  e.target.value,
              })
            }
            className="border p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Designation"
            value={
              profile.designation || ""
            }
            onChange={(e) =>
              setProfile({
                ...profile,
                designation:
                  e.target.value,
              })
            }
            className="border p-4 rounded-xl"
          />

        </div>

        <button
          onClick={updateProfile}
          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
};

export default Profile;