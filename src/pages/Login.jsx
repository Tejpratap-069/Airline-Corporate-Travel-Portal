import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Plane } from "lucide-react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await api.get("/users");

      const user = res.data.find(
        (u) =>
          u.email?.trim().toLowerCase() ===
            email.trim().toLowerCase() &&
          u.password === password
      );

      if (!user) {
        toast.error("Invalid Credentials");
        return;
      }

      login(user);

      toast.success("Login Successful");

      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-sky-800 relative overflow-hidden">

      {/* Decorative glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-24 w-[28rem] h-[28rem] bg-cyan-400/10 rounded-full blur-3xl" />

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

      <div className="min-h-screen flex justify-center items-center px-4 relative">

        <form
          onSubmit={loginUser}
          className="bg-white p-10 rounded-3xl shadow-2xl w-[440px] max-w-full"
        >

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 text-center">
            Welcome back
          </h1>

          <p className="text-center text-slate-500 mt-2 mb-8">
            Login to your SkyCorp account
          </p>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-slate-300 p-3.5 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-slate-300 p-3.5 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3.5 rounded-xl font-semibold transition"
          >
            Login
          </button>

          <p className="text-center mt-6 text-slate-500">
            Don't have an account?

            <Link
              to="/signup"
              className="text-sky-600 ml-2 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;