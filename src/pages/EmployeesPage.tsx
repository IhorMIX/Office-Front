import React, { useEffect, useState } from "react";
import EmployeeTable from "../Components/Tables/EmployeeTable";
import { useGetAllEmployeesQuery } from "../services/employeeService";
import { Employee } from "../types/Employee";

const EmployeesPage = () => {

  const {data: employeesList } = useGetAllEmployeesQuery(null);

  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    if (employeesList) {
      setEmployees(employeesList);
    }
  }, [employeesList]);

  const handleEdit = (id: number) => {
    // Реализация редактирования
    console.log(`Edit employee with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Реализация удаления
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <>
      <div>
        <h1>Employees Page</h1>
      </div>     
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};

export default EmployeesPage;