import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTachometerAlt,
  FaUsers,
  FaPlane,
  FaCheckCircle,
  FaChartBar,
  FaBell,
  FaUser,
  FaCog,
  FaBuilding,
  FaBriefcase,
  FaTicketAlt,
  FaCalendarAlt,
  FaMoneyBill,
  FaUserShield,
  FaHistory,
  FaLifeRing,
} from "react-icons/fa";

const Sidebar = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role;

  const adminMenu = [
    { name: "Home", path: "/home", icon: <FaHome /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Employees", path: "/employees", icon: <FaUsers /> },
    { name: "Departments", path: "/departments", icon: <FaBuilding /> },
    { name: "Companies", path: "/companies", icon: <FaBriefcase /> },
    { name: "Trip Requests", path: "/trips", icon: <FaPlane /> },
    { name: "Bookings", path: "/bookings", icon: <FaTicketAlt /> },
    { name: "Travel Calendar", path: "/calendar", icon: <FaCalendarAlt /> },
    { name: "Approvals", path: "/approvals", icon: <FaCheckCircle /> },
    { name: "Expense Claims", path: "/expenses", icon: <FaMoneyBill /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
    { name: "Admin Panel", path: "/admin", icon: <FaUserShield /> },
  ];

  const managerMenu = [
    { name: "Home", path: "/home", icon: <FaHome /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Employees", path: "/employees", icon: <FaUsers /> },
    { name: "Companies", path: "/companies", icon: <FaBriefcase /> },
    { name: "Trip Requests", path: "/trips", icon: <FaPlane /> },
    { name: "Bookings", path: "/bookings", icon: <FaTicketAlt /> },
    { name: "Travel Calendar", path: "/calendar", icon: <FaCalendarAlt /> },
    { name: "Approvals", path: "/approvals", icon: <FaCheckCircle /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  const employeeMenu = [
    { name: "Home", path: "/home", icon: <FaHome /> },
    { name: "Trip Requests", path: "/trips", icon: <FaPlane /> },
    { name: "My Trips", path: "/my-trips", icon: <FaTicketAlt /> },
    { name: "Travel History", path: "/travel-history", icon: <FaHistory /> },
    { name: "Expense Claims", path: "/expenses", icon: <FaMoneyBill /> },
    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Support", path: "/support", icon: <FaLifeRing /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  const menu =
    role === "Admin"
      ? adminMenu
      : role === "Manager"
      ? managerMenu
      : employeeMenu;

  return (
    <div className="w-72 bg-slate-950 text-white min-h-screen overflow-y-auto">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-4xl font-bold">
          ✈ SkyCorp
        </h1>

        <p className="text-slate-400 text-lg">
          {role}
        </p>

      </div>

      <div className="p-4 space-y-2">

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl text-lg transition-all ${
                isActive
                  ? "bg-cyan-600 shadow-lg"
                  : "hover:bg-slate-800"
              }`
            }
          >

            <span className="text-xl">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </NavLink>

        ))}

      </div>

    </div>
  );
};

export default Sidebar;