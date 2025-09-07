import React from "react";
import {
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetEmployeeQuery } from "../../services/employeeService";

interface Props {
  id: string;
}

const EmployeeInfo: React.FC<Props> = ({ id }) => {
  const { data: employee, isLoading } = useGetEmployeeQuery(Number(id));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!employee) return <Typography>Employee data not found</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#424242",
          color: "#fff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#fff",
            textAlign: "normal",
            wordBreak: "break-word",
            lineHeight: 1.3,
          }}
        >
          Employee Details — ID: {employee.id}
        </Typography>

        <Box mb={3}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Full name:</strong> {employee.fullName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Subdivision:</strong> {employee.subdivision?.name ?? "—"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Position:</strong> {employee.position?.name ?? "—"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Status:</strong> {employee.status ? "Active" : "Inactive"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Out Of Office Balance:</strong> {employee.outOfOfficeBalance}
          </Typography>
          <Typography variant="body1">
            <strong>HR Manager:</strong> {employee.hrManager?.fullName ?? "—"}
          </Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: "#555" }} />

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#fff",
            wordBreak: "break-word",
            textAlign: "center",
          }}
        >
          Projects
        </Typography>

        {employee.projects && employee.projects.length > 0 ? (
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
            {employee.projects.map((project) => (
              <Card
                key={project.id}
                sx={{
                  width: 230,
                  backgroundColor: "#3a3a3a",
                  color: "#fff",
                  borderRadius: 2,
                  boxShadow: 3,
                  "&:hover": {
                    boxShadow: 6,
                    backgroundColor: "#444",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component={Link}
                    to={`/project/${project.id}`}
                    sx={{
                      color: "#fff",
                      wordBreak: "break-word",
                      fontWeight: "bold",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline", color: "#aaa" },
                    }}
                    gutterBottom
                  >
                    {project.projectType?.name ?? "Unknown Project"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Manager: {project.projectManager?.fullName ?? "—"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Start Date:{" "}
                    {project.startDate
                      ? new Date(project.startDate).toLocaleDateString()
                      : "—"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    End Date:{" "}
                    {project.endDate
                      ? new Date(project.endDate).toLocaleDateString()
                      : "—"}
                  </Typography>
                  {project.comment && (
                    <Typography variant="body2" gutterBottom>
                      Comment: {project.comment}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    Status: {project.status ? "Active" : "Inactive"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "#fff", wordBreak: "break-word", mt: 2 }}
          >r
            No Projects assigned to this Employee.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default EmployeeInfo;
