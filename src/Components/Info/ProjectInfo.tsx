import React from "react";
import { Paper, Typography, Card, CardContent, Box, Divider } from "@mui/material";
import { useGetProjectQuery } from "../../services/projectService";
import { Link } from "react-router-dom";

interface Props {
  id: string;
}

const ProjectInfo: React.FC<Props> = ({ id }) => {
  const { data: project, isLoading } = useGetProjectQuery(Number(id));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!project) return <Typography>Project data not found</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
        Project Details — ID: {project.id}
      </Typography>

      <Box mb={2}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Project manager:</strong> {project.projectManager?.fullName ?? "—"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Project type:</strong> {project.projectType?.name ?? "—"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Start Date:</strong>{" "}
          {project.startDate ? new Date(project.startDate).toLocaleDateString() : "—"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>End Date:</strong>{" "}
          {project.endDate ? new Date(project.endDate).toLocaleDateString() : "—"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Status:</strong> {project.status ? "Active" : "Inactive"}
        </Typography>
        {project.comment && (
          <Typography variant="body1">
            <strong>Comment:</strong> {project.comment}
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      {project.employees && project.employees.length > 0 ? (
        <>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
            Employees
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={2}>
            {project.employees.map((employee) => (
              <Card key={employee.id} sx={{ width: 280 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component={Link}
                    to={`/employee/${employee.id}`}
                    sx={{
                      color: "black",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    gutterBottom
                  >
                    {employee.fullName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Status: {employee.status ? "Active" : "Inactive"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No employees assigned to this project.
        </Typography>
      )}
    </Paper>
  );
};

export default ProjectInfo;
