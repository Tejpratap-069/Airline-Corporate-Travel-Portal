import { Link } from "react-router-dom";
import {
  Plane,
  Users,
  BarChart3,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">

      {/* Navbar */}

      <nav className="bg-gradient-to-r from-slate-950 via-slate-800 to-cyan-600 text-white px-10 py-6 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <Plane size={40} />
          <h1 className="text-4xl font-bold">
            SkyCorp Travel
          </h1>
        </div>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="bg-white text-cyan-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-cyan-700 transition"
          >
            Sign Up
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <section className="bg-gradient-to-r from-slate-950 via-slate-800 to-cyan-600 text-white py-28 text-center px-6">

        <h1 className="text-7xl font-extrabold">
          Corporate Travel
          <br />
          Management Platform
        </h1>

        <p className="text-xl mt-8 max-w-4xl mx-auto">

          Streamline business travel,
          automate approvals,
          manage employees,
          and gain actionable insights
          through a single enterprise platform.

        </p>

        <div className="flex justify-center gap-5 mt-10">

          <Link
            to="/signup"
            className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-white px-8 py-4 rounded-2xl text-lg"
          >
            Login
          </Link>

        </div>

      </section>

      {/* Statistics */}

      <section className="grid md:grid-cols-4 gap-6 px-10 py-20 bg-slate-100">

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

          <h2 className="text-5xl font-bold text-blue-600">
            500+
          </h2>

          <p className="mt-3 text-gray-600">
            Companies
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

          <h2 className="text-5xl font-bold text-green-600">
            50K+
          </h2>

          <p className="mt-3 text-gray-600">
            Trips Managed
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

          <h2 className="text-5xl font-bold text-purple-600">
            99%
          </h2>

          <p className="mt-3 text-gray-600">
            Approval Accuracy
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

          <h2 className="text-5xl font-bold text-orange-500">
            24/7
          </h2>

          <p className="mt-3 text-gray-600">
            Support
          </p>

        </div>

      </section>

      {/* Features */}

      <section className="py-24 px-10 bg-white">

        <h2 className="text-center text-5xl font-bold mb-16">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-slate-50 rounded-3xl shadow p-8">

            <Plane
              size={45}
              className="text-blue-600"
            />

            <h3 className="text-2xl font-bold mt-5">
              Travel Requests
            </h3>

            <p className="mt-3 text-gray-600">
              Submit and manage travel requests easily.
            </p>

          </div>

          <div className="bg-slate-50 rounded-3xl shadow p-8">

            <CheckCircle
              size={45}
              className="text-green-600"
            />

            <h3 className="text-2xl font-bold mt-5">
              Approvals
            </h3>

            <p className="mt-3 text-gray-600">
              Quick manager approval workflow.
            </p>

          </div>

          <div className="bg-slate-50 rounded-3xl shadow p-8">

            <BarChart3
              size={45}
              className="text-purple-600"
            />

            <h3 className="text-2xl font-bold mt-5">
              Analytics
            </h3>

            <p className="mt-3 text-gray-600">
              Travel insights and reports.
            </p>

          </div>

          <div className="bg-slate-50 rounded-3xl shadow p-8">

            <Users
              size={45}
              className="text-orange-500"
            />

            <h3 className="text-2xl font-bold mt-5">
              Employee Management
            </h3>

            <p className="mt-3 text-gray-600">
              Manage employees efficiently.
            </p>

          </div>

        </div>

      </section>

      {/* How It Works */}

      <section className="bg-slate-100 py-24 px-10">

        <h2 className="text-5xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white rounded-3xl p-8 shadow text-center">

            <h3 className="text-4xl font-bold text-blue-600">
              1
            </h3>

            <h4 className="text-2xl font-bold mt-4">
              Submit Request
            </h4>

            <p className="mt-3 text-gray-600">
              Employees submit travel requests.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow text-center">

            <h3 className="text-4xl font-bold text-green-600">
              2
            </h3>

            <h4 className="text-2xl font-bold mt-4">
              Manager Approval
            </h4>

            <p className="mt-3 text-gray-600">
              Managers review and approve requests.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow text-center">

            <h3 className="text-4xl font-bold text-purple-600">
              3
            </h3>

            <h4 className="text-2xl font-bold mt-4">
              Analytics
            </h4>

            <p className="mt-3 text-gray-600">
              Track spending and travel performance.
            </p>

          </div>

        </div>

      </section>

      {/* Testimonials */}

      <section className="bg-white py-24 px-10">

        <h2 className="text-5xl font-bold text-center mb-16">
          Trusted By Businesses
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-50 p-8 rounded-3xl shadow">

            <p>
              "SkyCorp Travel transformed our travel operations."
            </p>

            <h3 className="font-bold mt-6">
              Microsoft Partner
            </h3>

          </div>

          <div className="bg-slate-50 p-8 rounded-3xl shadow">

            <p>
              "Amazing analytics and approval process."
            </p>

            <h3 className="font-bold mt-6">
              Global Tech Ltd
            </h3>

          </div>

          <div className="bg-slate-50 p-8 rounded-3xl shadow">

            <p>
              "Best travel management platform."
            </p>

            <h3 className="font-bold mt-6">
              Sky Airlines
            </h3>

          </div>

        </div>

      </section>

      {/* Contact */}

      <section className="bg-slate-100 py-24 px-10">

        <h2 className="text-5xl font-bold text-center mb-16">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

          <div>

  <div className="bg-white p-8 rounded-3xl shadow">

    <h3 className="text-4xl font-bold text-blue-700">
      SkyCorp Travel Support
    </h3>

    <p className="mt-5 text-lg">
      📧 support@skycorp.com
    </p>

    <p className="text-lg">
      📞 +91 98765 43210
    </p>

    <p className="text-lg">
      📍 Hyderabad, Telangana, India
    </p>

    <p className="mt-5 text-gray-600">
      Contact our support team for trip requests,
      approvals, bookings, expense claims and
      travel assistance.
    </p>

  </div>

  <div className="grid grid-cols-1 gap-4 mt-6">

    <div className="bg-white p-5 rounded-2xl shadow">
      <h4 className="font-bold text-blue-600">
        Customer Support
      </h4>
      <p>+91 98765 43210</p>
    </div>

    <div className="bg-white p-5 rounded-2xl shadow">
      <h4 className="font-bold text-green-600">
        Email Support
      </h4>
      <p>support@skycorp.com</p>
    </div>

    <div className="bg-white p-5 rounded-2xl shadow">
      <h4 className="font-bold text-purple-600">
        Office Location
      </h4>
      <p>Hyderabad, India</p>
    </div>

  </div>

</div>

          <div className="bg-white rounded-3xl shadow p-8">
            <h3 className="text-3xl font-bold mb-6">
  Send Us A Message
</h3>

            <input
              type="text"
              placeholder="Name"
              className="w-full border p-4 rounded-xl mb-4"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-4 rounded-xl mb-4"
            />

            <textarea
              rows="5"
              placeholder="Message"
              className="w-full border p-4 rounded-xl mb-4"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold w-full">
              Send Message
            </button>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-slate-900 text-white py-12">

        <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-4 gap-10">

          <div>

            <h3 className="text-2xl font-bold">
              SkyCorp Travel
            </h3>

            <p className="mt-3 text-slate-400">
              Corporate Travel Management Platform
            </p>

          </div>

          <div>

            <h4 className="font-bold mb-3">
              Company
            </h4>

            <p>About</p>
            <p>Careers</p>
            <p>Blog</p>

          </div>

          <div>

            <h4 className="font-bold mb-3">
              Support
            </h4>

            <p>Help Center</p>
            <p>Privacy Policy</p>
            <p>Terms</p>

          </div>

          <div>

            <h4 className="font-bold mb-3">
              Contact
            </h4>

            <p>support@skycorp.com</p>
            <p>+1 800 555 1000</p>

          </div>

        </div>

        <div className="text-center mt-10 text-slate-500">
          © 2026 SkyCorp Travel. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
};

export default Home;