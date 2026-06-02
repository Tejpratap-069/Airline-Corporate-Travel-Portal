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
    <div className="min-h-screen bg-slate-100">

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

      <div className="min-h-screen flex justify-center items-center">

        <form
          onSubmit={loginUser}
          className="bg-white p-8 rounded-3xl shadow-xl w-[550px]"
        >

          <h1 className="text-5xl font-bold text-center mb-8">
            Login
          </h1>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-4 rounded-xl mb-4"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl mb-4"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-4 rounded-xl text-xl font-bold"
          >
            Login
          </button>

          <p className="text-center mt-6">
            Don't have an account?

            <Link
              to="/signup"
              className="text-cyan-600 ml-2 font-semibold"
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