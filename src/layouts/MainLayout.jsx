import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex-1 flex flex-col">

        {/* Header */}

        <header className="bg-white shadow-sm border-b px-8 py-5 flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              SkyCorp Travel
            </h1>

            <p className="text-gray-500">
              Corporate Travel Management System
            </p>

          </div>

          <div className="flex items-center gap-5">

            <div className="text-right">

              <h3 className="font-bold text-lg">
                {user?.name}
              </h3>

              <p className="text-gray-500">
                {user?.email}
              </p>

              <span className="text-blue-600 font-medium">
                {user?.role}
              </span>

            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
            >
              Logout
            </button>

          </div>

        </header>

        {/* Page Content */}

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
};

export default MainLayout;