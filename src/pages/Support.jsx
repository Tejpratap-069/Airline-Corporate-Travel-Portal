import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";

const Support = () => {
  const [issue, setIssue] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const submitTicket = async () => {
    if (!issue.trim()) {
      toast.error("Please describe your issue");
      return;
    }

    try {
      await api.post("/notifications", {
        message: `Support ticket from ${user?.name || "a user"}: ${issue.trim()}`,
        date: new Date().toLocaleDateString(),
      });

      toast.success("Ticket Submitted");
      setIssue("");
    } catch (error) {
      toast.error("Ticket Failed");
    }
  };

  return (
    <div className="space-y-8">

      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-sm">

        <h1 className="text-4xl font-bold">
          Support Center
        </h1>

        <p className="mt-2">
          Need help? Contact us.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">
            HR Support
          </h2>

          <p>
            hr@skycorp.com
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">
            Travel Team
          </h2>

          <p>
            travel@skycorp.com
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">
            Emergency
          </h2>

          <p>
            +1 800 123 4567
          </p>
        </div>

      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

        <h2 className="text-2xl font-bold mb-5">
          Raise Ticket
        </h2>

        <textarea
          className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
          rows="5"
          placeholder="Describe your issue..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />

        <button
          onClick={submitTicket}
          className="mt-5 bg-sky-600 text-white px-8 py-3 rounded-xl"
        >
          Submit Ticket
        </button>

      </div>

    </div>
  );
};

export default Support;