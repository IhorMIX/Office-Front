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
    <Paper
      elevation={3}
      sx={{ p: 3, mt: 3, backgroundColor: "#424242", color: "#fff", borderRadius: 3 }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#fff" }}>
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

      <Divider sx={{ my: 2, borderColor: "#555" }} />

      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#fff" }}>
        Employees
      </Typography>

      {project.employees && project.employees.length > 0 ? (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {project.employees.map((employee) => (
            <Card
              key={employee.id}
              sx={{ width: 280, backgroundColor: "#3a3a3a", color: "#fff" }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/employee/${employee.id}`}
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline", color: "#aaa" },
                  }}
                  gutterBottom
                >
                  {employee.fullName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Status: {employee.status ? "Active" : "Inactive"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body2">No employees assigned to this project.</Typography>
      )}
    </Paper>
  );
};

export default ProjectInfo;
