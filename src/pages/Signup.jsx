import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/api";
import { Plane } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    department: "",
    designation: "",
    role: "Employee",
    password: "",
  });

  const signupUser = async (e) => {
    e.preventDefault();

    try {
      // CHECK EXISTING USERS

      const existingUsers = await api.get("/users");

      const emailExists = existingUsers.data.some(
        (user) =>
          user.email?.toLowerCase().trim() ===
          form.email.toLowerCase().trim()
      );

      if (emailExists) {
        toast.error("Email already exists");
        return;
      }

      // CHECK IF COMPANY EXISTS

      const companiesRes = await api.get("/companies");

      const companyExists =
        companiesRes.data.some(
          (company) =>
            company.name
              ?.toLowerCase()
              .trim() ===
            form.company
              .toLowerCase()
              .trim()
        );

      // CREATE COMPANY IF NOT EXISTS

      if (!companyExists) {
        await api.post("/companies", {
          id: Date.now().toString(),
          name: form.company,
          location: "Not Set",
          employees: 0,
        });
      }

      // CREATE USER

      await api.post("/users", form);

      toast.success(
        "Account Created Successfully"
      );

      navigate("/login");

    } catch (error) {
      console.log(error);
      toast.error("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Logo */}

      <div className="absolute top-8 left-10">

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <Plane
            size={40}
            className="text-black-700"
          />

          <h1 className="text-4xl font-bold text-black-700">
            SkyCorp Travel
          </h1>

        </Link>

      </div>

      {/* Signup Form */}

      <div className="min-h-screen flex justify-center items-center">

        <form
          onSubmit={signupUser}
          className="bg-white p-8 rounded-3xl shadow-xl w-[750px]"
        >

          <h1 className="text-5xl font-bold text-center mb-8">
            Create Account
          </h1>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Full Name"
              className="border p-3 rounded-xl"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-xl"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
            />

            <input
              placeholder="Phone Number"
              className="border p-3 rounded-xl"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              required
            />

            <input
              placeholder="Company Name"
              className="border p-3 rounded-xl"
              value={form.company}
              onChange={(e) =>
                setForm({
                  ...form,
                  company: e.target.value,
                })
              }
              required
            />

            <input
              placeholder="Department"
              className="border p-3 rounded-xl"
              value={form.department}
              onChange={(e) =>
                setForm({
                  ...form,
                  department: e.target.value,
                })
              }
              required
            />

            <input
              placeholder="Designation"
              className="border p-3 rounded-xl"
              value={form.designation}
              onChange={(e) =>
                setForm({
                  ...form,
                  designation: e.target.value,
                })
              }
              required
            />

            <select
              className="border p-3 rounded-xl"
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
            >
              <option value="Employee">
                Employee
              </option>

              <option value="Manager">
                Manager
              </option>

            </select>

            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-xl"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              required
            />

          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white py-4 rounded-xl text-xl font-bold"
          >
            Create Account
          </button>

          <p className="text-center mt-5">

            Already have an account?

            <Link
              to="/login"
              className="text-black-600 ml-2 font-semibold"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Signup;