import React, { useEffect, useState } from "react";
import { useDeactivateEmployeeMutation, useGetAllEmployeesQuery } from "../../services/employeeService";
import { Employee } from "../../types/Employee";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserType } from "../../types/User";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import EmployeeTable from "../../Components/Tables/EmployeeTable";

const EmployeesPage: React.FC = () => {
  const { data: employeesList } = useGetAllEmployeesQuery(null);
  const [deactivateEmployee] = useDeactivateEmployeeMutation();
  const role = useSelector((state: RootState) => state.auth.role);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (employeesList) {
      setEmployees(employeesList);
    }
  }, [employeesList]);

  const handleDelete = async (id: number) => {
    try {
      await deactivateEmployee(id).unwrap();
    } catch (error: any) {
      console.error('Failed to approve request:', error.data || error.message);
    }
    window.location.reload();
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
          onDelete={handleDelete}
        />
      </Paper>
    </Container>
  );
};

export default EmployeesPage;
