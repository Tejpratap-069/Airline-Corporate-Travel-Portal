import { FaBell } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          SkyCorp Travel Dashboard
        </h1>

        <p className="text-slate-500">
          Corporate Travel Management System
        </p>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <FaBell
            size={22}
            className="text-slate-600"
          />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
            3
          </span>

        </button>

        <div className="text-right">

          <h3 className="font-bold text-lg">
            {user?.name}
          </h3>

          <p className="text-slate-500">
            {user?.role}
          </p>

        </div>

        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

          {user?.name?.charAt(0)}

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;