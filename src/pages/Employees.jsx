import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const user = JSON.parse(
  localStorage.getItem("user")
);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
  const res = await api.get("/employees");

  const companyEmployees =
    res.data.filter(
      (emp) =>
        emp.company?.toLowerCase() ===
        user?.company?.toLowerCase()
    );

  setEmployees(companyEmployees);
};

  const addEmployee = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.department
    ) {
      toast.error("Fill all fields");
      return;
    }

    await api.post("/employees", {
  ...form,
  company: user.company,
});

    toast.success("Employee Added");

    setForm({
      name: "",
      email: "",
      department: "",
    });

    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await api.delete(`/employees/${id}`);

    toast.success("Employee Deleted");

    fetchEmployees();
  };

  const filteredEmployees =
    employees.filter((emp) =>
      emp.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 rounded-3xl shadow">

        <h1 className="text-4xl font-bold">
          Employee Management
        </h1>

        <p className="mt-2">
          Manage all employees
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Total Employees</h3>

          <h1 className="text-5xl font-bold text-blue-600 mt-3">
            {employees.length}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Departments</h3>

          <h1 className="text-5xl font-bold text-green-600 mt-3">
            {
              new Set(
                employees.map(
                  (e) => e.department
                )
              ).size
            }
          </h1>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h3>Active Records</h3>

          <h1 className="text-5xl font-bold text-purple-600 mt-3">
            {employees.length}
          </h1>

        </div>

      </div>

      {/* Add Employee */}

      <div className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Add Employee
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            placeholder="Name"
            className="border p-4 rounded-xl"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            className="border p-4 rounded-xl"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            placeholder="Department"
            className="border p-4 rounded-xl"
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department:
                  e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={addEmployee}
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl"
        >
          Add Employee
        </button>

      </div>

      {/* Search */}

      <div className="bg-white p-6 rounded-3xl shadow">

        <input
          type="text"
          placeholder="Search Employee..."
          className="w-full border p-4 rounded-xl"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Employee Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        {filteredEmployees.map(
          (employee) => (
            <div
              key={employee.id}
              className="bg-white rounded-3xl shadow p-6"
            >

              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">

                {employee.name?.charAt(0)}

              </div>

              <h2 className="text-2xl font-bold mt-4">
                {employee.name}
              </h2>

              <p className="text-gray-500">
                {employee.email}
              </p>

              <p className="mt-2">
                Department:
                {" "}
                {employee.department}
              </p>

              <button
                onClick={() =>
                  deleteEmployee(
                    employee.id
                  )
                }
                className="mt-5 bg-red-500 text-white px-5 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default Employees;