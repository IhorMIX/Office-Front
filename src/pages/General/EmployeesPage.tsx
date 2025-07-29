import React, { useEffect, useState } from "react";
import { useGetAllEmployeesQuery } from "../../services/employeeService";
import { Employee } from "../../types/Employee";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserType } from "../../types/User";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import EmployeeTable from "../../Components/Tables/EmployeeTable";

const EmployeesPage: React.FC = () => {
  const { data: employeesList } = useGetAllEmployeesQuery(null);
  const role = useSelector((state: RootState) => state.auth.role);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (employeesList) {
      setEmployees(employeesList);
    }
  }, [employeesList]);

  const handleEdit = (id: number) => {
    console.log(`Edit employee with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 3,
          backgroundColor: "#f9fbfc",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Employees
          </Typography>

          {(role === UserType.Admin || role === UserType.HrManager) && (
            <Button
              component={Link}
              to="/create-employee"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              + Create Employee
            </Button>
          )}
        </Box>

        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>
    </Container>
  );
};

export default EmployeesPage;
