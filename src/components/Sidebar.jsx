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

  { name: "Expense Claims", path: "/expenses", icon: <FaMoneyBill /> },

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
    <div className="w-64 shrink-0 bg-gradient-to-b from-navy-950 to-navy-900 text-white h-screen sticky top-0 overflow-y-auto flex flex-col">

      <div className="p-5 border-b border-white/10">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-sky-500 flex items-center justify-center text-xl shadow-lg shadow-sky-500/30">
            <FaPlane />
          </div>

          <div>

            <h1 className="text-xl font-bold tracking-tight leading-tight">
              SkyCorp
            </h1>

            <p className="text-slate-400 text-xs tracking-wide uppercase">
              Travel Platform
            </p>

          </div>

        </div>

        <span className="inline-block mt-4 text-xs font-semibold bg-white/10 border border-white/10 rounded-full px-3 py-1 text-slate-200">
          {role} Account
        </span>

      </div>

      <nav className="p-3 space-y-1 flex-1">

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-all ${
                isActive
                  ? "bg-sky-600 text-white shadow-md shadow-sky-950/40"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >

            <span className="text-lg opacity-90">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>

      <div className="p-4 border-t border-white/10 text-xs text-slate-500">
        SkyCorp Travel &bull; v2.0
      </div>

    </div>
  );
};

export default Sidebar;