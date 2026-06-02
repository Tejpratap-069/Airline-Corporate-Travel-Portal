import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import HomeDashboard from "../pages/HomeDashboard";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import Departments from "../pages/Departments";
import Companies from "../pages/Companies";
import TripRequests from "../pages/TripRequests";
import Bookings from "../pages/Bookings";
import TravelCalendar from "../pages/TravelCalendar";
import ExpenseClaims from "../pages/ExpenseClaims";
import Approvals from "../pages/Approvals";
import Reports from "../pages/Reports";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import AdminPanel from "../pages/AdminPanel";

/* NEW PAGES */

import MyTrips from "../pages/MyTrips";
import TravelHistory from "../pages/TravelHistory";
import Support from "../pages/Support";

import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Home */}

      <Route
        path="/home"
        element={
          <MainLayout>
            <HomeDashboard />
          </MainLayout>
        }
      />

      {/* Dashboard */}

      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      {/* Employees */}

      <Route
        path="/employees"
        element={
          <MainLayout>
            <Employees />
          </MainLayout>
        }
      />

      {/* Departments */}

      <Route
        path="/departments"
        element={
          <MainLayout>
            <Departments />
          </MainLayout>
        }
      />

      {/* Companies */}

      <Route
        path="/companies"
        element={
          <MainLayout>
            <Companies />
          </MainLayout>
        }
      />

      {/* Trip Requests */}

      <Route
        path="/trips"
        element={
          <MainLayout>
            <TripRequests />
          </MainLayout>
        }
      />

      {/* My Trips */}

      <Route
        path="/my-trips"
        element={
          <MainLayout>
            <MyTrips />
          </MainLayout>
        }
      />

      {/* Travel History */}

      <Route
        path="/travel-history"
        element={
          <MainLayout>
            <TravelHistory />
          </MainLayout>
        }
      />

      {/* Support */}

      <Route
        path="/support"
        element={
          <MainLayout>
            <Support />
          </MainLayout>
        }
      />

      {/* Bookings */}

      <Route
        path="/bookings"
        element={
          <MainLayout>
            <Bookings />
          </MainLayout>
        }
      />

      {/* Travel Calendar */}

      <Route
        path="/calendar"
        element={
          <MainLayout>
            <TravelCalendar />
          </MainLayout>
        }
      />

      {/* Expense Claims */}

      <Route
        path="/expenses"
        element={
          <MainLayout>
            <ExpenseClaims />
          </MainLayout>
        }
      />

      {/* Approvals */}

      <Route
        path="/approvals"
        element={
          <MainLayout>
            <Approvals />
          </MainLayout>
        }
      />

      {/* Reports */}

      <Route
        path="/reports"
        element={
          <MainLayout>
            <Reports />
          </MainLayout>
        }
      />

      {/* Notifications */}

      <Route
        path="/notifications"
        element={
          <MainLayout>
            <Notifications />
          </MainLayout>
        }
      />

      {/* Profile */}

      <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />

      {/* Settings */}

      <Route
        path="/settings"
        element={
          <MainLayout>
            <Settings />
          </MainLayout>
        }
      />

      {/* Admin Panel */}

      <Route
        path="/admin"
        element={
          <MainLayout>
            <AdminPanel />
          </MainLayout>
        }
      />

    </Routes>
  );
};

export default AppRoutes;