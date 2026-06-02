import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [head, setHead] = useState("");
  const [employees, setEmployees] = useState("");

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const res = await api.get("/departments");
    setDepartments(res.data);
  };

  const addDepartment = async () => {
    if (!name || !head) {
      toast.error("Fill all fields");
      return;
    }

    await api.post("/departments", {
      id: Date.now().toString(),
      name,
      head,
      employees,
    });

    toast.success("Department Added");

    setName("");
    setHead("");
    setEmployees("");

    loadDepartments();
  };

  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-8 rounded-3xl text-white">
        <h1 className="text-4xl font-bold">
          Departments Management
        </h1>
        <p className="mt-2">
          Manage company departments
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Total Departments</h3>
          <h1 className="text-4xl font-bold">
            {departments.length}
          </h1>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Department Heads</h3>
          <h1 className="text-4xl font-bold">
            {departments.length}
          </h1>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3>Total Employees</h3>
          <h1 className="text-4xl font-bold">
            {departments.reduce(
              (sum, dept) =>
                sum +
                Number(
                  dept.employees || 0
                ),
              0
            )}
          </h1>
        </div>

      </div>

      <div className="bg-white p-8 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-5">
          Add Department
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            className="border p-3 rounded-xl"
            placeholder="Department Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            className="border p-3 rounded-xl"
            placeholder="Department Head"
            value={head}
            onChange={(e) =>
              setHead(e.target.value)
            }
          />

          <input
            className="border p-3 rounded-xl"
            placeholder="Employee Count"
            value={employees}
            onChange={(e) =>
              setEmployees(
                e.target.value
              )
            }
          />

        </div>

        <button
          onClick={addDepartment}
          className="mt-5 bg-blue-600 text-white px-8 py-3 rounded-xl"
        >
          Add Department
        </button>

      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">
                Department
              </th>
              <th className="p-4 text-left">
                Head
              </th>
              <th className="p-4 text-left">
                Employees
              </th>
            </tr>

          </thead>

          <tbody>

            {departments.map(
              (dept) => (
                <tr
                  key={dept.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {dept.name}
                  </td>

                  <td className="p-4">
                    {dept.head}
                  </td>

                  <td className="p-4">
                    {dept.employees}
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

export default Departments;