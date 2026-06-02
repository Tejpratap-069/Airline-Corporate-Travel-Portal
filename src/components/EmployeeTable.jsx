const EmployeeTable = ({
  employees,
  deleteEmployee,
  editEmployee,
}) => {
  return (
    <table className="w-full">

      <thead className="bg-slate-100">

        <tr>
          <th className="p-3 text-left">
            Name
          </th>

          <th>Email</th>

          <th>Department</th>

          <th>Actions</th>
        </tr>

      </thead>

      <tbody>

        {employees.map((emp) => (

          <tr
            key={emp.id}
            className="border-t"
          >

            <td className="p-3">
              {emp.name}
            </td>

            <td>{emp.email}</td>

            <td>
              {emp.department}
            </td>

            <td className="space-x-2">

              <button
                onClick={() =>
                  editEmployee(emp)
                }
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteEmployee(
                    emp.id
                  )
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
};

export default EmployeeTable;