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

  const employeeFields = [
    { label: "Employee", value: employee.fullName },
    { label: "Subdivision", value: employee.subdivision?.name },
    { label: "Position", value: employee.position?.name },
    { label: "Status", value: employee.status ? "Active" : "Inactive" },
    { label: "Out Of Office Balance", value: employee.outOfOfficeBalance },
    { label: "HR Manager", value: employee.hrManager?.fullName }
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography
      variant="h5"
      gutterBottom
      sx={{ fontWeight: "bold", color: "black" }}
    >
      Employee Details — ID: {employee.id}
      </Typography>

      {employeeFields.map((field, idx) => (
        <Box key={idx} mb={1}>
          <Typography variant="body1">
            <strong>{field.label}:</strong> {field.value ?? "—"}
          </Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Projects
      </Typography>

      {employee.projects?.length ? (
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
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  {project.projectType?.name ?? "Unknown Project"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Manager: {project.projectManager?.fullName ?? "—"}
                </Typography>
                <Typography variant="body2">
                  Start Date: {project.startDate ? new Date(project.startDate).toLocaleDateString() : "—"}
                </Typography>
                <Typography variant="body2">
                  End Date: {project.endDate ? new Date(project.endDate).toLocaleDateString() : "—"}
                </Typography>
                {project.comment && (
                  <Typography variant="body2">Comment: {project.comment}</Typography>
                )}
                <Typography variant="body2">
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
