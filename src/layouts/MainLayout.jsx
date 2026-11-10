import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const initials = (user?.name || "?")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-[#edf1f6]">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}

        <header className="bg-white/90 backdrop-blur border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-20">

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              SkyCorp Travel
            </h1>

            <p className="text-sm text-slate-500">
              Corporate Travel Management System
            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="w-11 h-11 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">
              {initials}
            </div>

            <div className="text-right">

              <h3 className="font-semibold text-slate-900 leading-tight">
                {user?.name}
              </h3>

              <p className="text-sm text-slate-500 leading-tight">
                {user?.email}
              </p>

              <span className="inline-block mt-1 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 rounded-full px-2.5 py-0.5">
                {user?.role}
              </span>

            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>

        </header>

        {/* Page Content */}

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-[1440px] mx-auto w-full">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
};

export default MainLayout;
