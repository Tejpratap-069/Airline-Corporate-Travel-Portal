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
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-sky-800 relative overflow-hidden">

      <div className="absolute -top-32 -right-32 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-24 w-[28rem] h-[28rem] bg-cyan-400/10 rounded-full blur-3xl" />

      {/* Logo */}

      <div className="absolute top-7 left-8 z-10">

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <span className="w-11 h-11 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-950/40">
            <Plane
              size={22}
              className="text-white"
            />
          </span>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            SkyCorp Travel
          </h1>

        </Link>

      </div>

      {/* Signup Form */}

      <div className="min-h-screen flex justify-center items-center px-4 relative py-24">

        <form
          onSubmit={signupUser}
          className="bg-white p-10 rounded-3xl shadow-2xl w-[750px] max-w-full"
        >

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 text-center">
            Create Account
          </h1>

          <p className="text-center text-slate-500 mt-2 mb-8">
            Join SkyCorp Travel in a minute
          </p>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Full Name"
              className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
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
              className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
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
              className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
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
              className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
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
              className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
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
              className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
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
              className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
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
              className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
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
            className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white py-3.5 rounded-xl font-semibold transition"
          >
            Create Account
          </button>

          <p className="text-center mt-5">

            Already have an account?

            <Link
              to="/login"
              className="text-sky-600 ml-2 font-semibold hover:underline"
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