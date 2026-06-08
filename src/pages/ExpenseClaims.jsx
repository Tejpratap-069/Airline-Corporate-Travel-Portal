import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const ExpenseClaims = () => {
  const [expenses, setExpenses] = useState([]);
  const user = JSON.parse(
  localStorage.getItem("user")
);

  const [form, setForm] = useState({
    employee: "",
    amount: "",
    status: "Pending",
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
  try {
    const res = await api.get("/expenses");

    if (user?.role === "Admin") {
      setExpenses(res.data);
      return;
    }

    const companyExpenses =
      res.data.filter(
        (expense) =>
          expense.company?.toLowerCase() ===
          user?.company?.toLowerCase()
      );

    setExpenses(companyExpenses);

  } catch (error) {
    console.log(error);
  }
};  

  const addExpense = async () => {
    if (!form.employee || !form.amount) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await api.post("/expenses", {
  id: Date.now().toString(),
  ...form,
  company: user.company,
});

      toast.success("Expense Added");

      setForm({
        employee: "",
        amount: "",
        status: "Pending",
      });

      loadExpenses();
    } catch (error) {
      toast.error("Failed");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);

      toast.success("Expense Deleted");

      loadExpenses();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-emerald-700 to-green-500 text-white p-8 rounded-3xl shadow">
        <h1 className="text-4xl font-bold">
          Expense Claims
        </h1>

        <p className="mt-2">
          Manage employee travel expenses
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Total Claims</h3>

          <h1 className="text-4xl font-bold mt-2">
            {expenses.length}
          </h1>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Approved</h3>

          <h1 className="text-4xl font-bold mt-2 text-green-600">
            {
              expenses.filter(
                (e) =>
                  e.status ===
                  "Approved"
              ).length
            }
          </h1>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Pending</h3>

          <h1 className="text-4xl font-bold mt-2 text-orange-500">
            {
              expenses.filter(
                (e) =>
                  e.status ===
                  "Pending"
              ).length
            }
          </h1>
        </div>

      </div>

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-5">
          Add Expense Claim
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            placeholder="Employee Name"
            className="border p-3 rounded-xl"
            value={form.employee}
            onChange={(e) =>
              setForm({
                ...form,
                employee:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Amount"
            className="border p-3 rounded-xl"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount:
                  e.target.value,
              })
            }
          />

          <select
            className="border p-3 rounded-xl"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target.value,
              })
            }
          >
            <option>
              Pending
            </option>
            <option>
              Approved
            </option>
            <option>
              Rejected
            </option>
          </select>

        </div>

        <button
          onClick={addExpense}
          className="mt-5 bg-green-600 text-white px-8 py-3 rounded-xl"
        >
          Add Expense
        </button>

      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>

          </thead>

          <tbody>

            {expenses.map(
              (expense) => (
                <tr
                  key={expense.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {expense.employee}
                  </td>

                  <td className="p-4">
                    ₹ {expense.amount}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        expense.status ===
                        "Approved"
                          ? "bg-green-500"
                          : expense.status ===
                            "Pending"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                    >
                      {expense.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        deleteExpense(
                          expense.id
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ExpenseClaims;