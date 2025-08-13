import React from "react";
import { Paper, Typography, Card, CardContent, Box, Divider } from "@mui/material";
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
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
        Employee Details — ID: {employee.id}
      </Typography>

      <Box mb={2}>
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

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
        Projects
      </Typography>

      {employee.projects && employee.projects.length > 0 ? (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {employee.projects.map((project) => (
            <Card key={project.id} sx={{ width: 280 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/project/${project.id}`}
                  sx={{
                    color: "black",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  gutterBottom
                >
                  {project.projectType?.name ?? "Unknown Project"}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Manager: {project.projectManager?.fullName ?? "—"}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Start Date: {project.startDate ? new Date(project.startDate).toLocaleDateString() : "—"}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  End Date: {project.endDate ? new Date(project.endDate).toLocaleDateString() : "—"}
                </Typography>
                {project.comment && (
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Comment: {project.comment}
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary">
                  Status: {project.status ? "Active" : "Inactive"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body2">No Projects assigned to this Employee.</Typography>
      )}
    </Paper>
  );
};

export default EmployeeInfo;
