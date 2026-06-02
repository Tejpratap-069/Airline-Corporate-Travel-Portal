import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  const [form, setForm] = useState({
    name: "",
    location: "",
    employees: "",
  });

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const res = await api.get("/companies");
      setCompanies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCompany = async () => {
    if (!form.name || !form.location) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await api.post("/companies", {
        id: Date.now().toString(),
        ...form,
      });

      toast.success("Company Added");

      setForm({
        name: "",
        location: "",
        employees: "",
      });

      loadCompanies();
    } catch (error) {
      toast.error("Failed");
    }
  };

  const deleteCompany = async (id) => {
    try {
      await api.delete(`/companies/${id}`);

      toast.success("Deleted");

      loadCompanies();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          Companies Management
        </h1>

        <p className="mt-2">
          Manage all registered companies
        </p>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3 className="text-gray-500">
            Total Companies
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {companies.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3 className="text-gray-500">
            Active Locations
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {
              new Set(
                companies.map(
                  (c) => c.location
                )
              ).size
            }
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3 className="text-gray-500">
            Total Employees
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {companies.reduce(
              (sum, company) =>
                sum +
                Number(
                  company.employees || 0
                ),
              0
            )}
          </h1>

        </div>

      </div>

      {/* Add Company */}

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-5">
          Add Company
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            placeholder="Company Name"
            className="border p-3 rounded-xl"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Location"
            className="border p-3 rounded-xl"
            value={form.location}
            onChange={(e) =>
              setForm({
                ...form,
                location: e.target.value,
              })
            }
          />

          <input
            placeholder="Employees Count"
            className="border p-3 rounded-xl"
            value={form.employees}
            onChange={(e) =>
              setForm({
                ...form,
                employees:
                  e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={addCompany}
          className="mt-5 bg-green-600 text-white px-8 py-3 rounded-xl"
        >
          Add Company
        </button>

      </div>

      {/* Companies Table */}

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                Location
              </th>

              <th className="p-4 text-left">
                Employees
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {companies.map(
              (company) => (
                <tr
                  key={company.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {company.name}
                  </td>

                  <td className="p-4">
                    {company.location}
                  </td>

                  <td className="p-4">
                    {company.employees}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        deleteCompany(
                          company.id
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

export default Companies;