import React from "react";
import { Paper, Typography, Card, CardContent, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetManagerInfoQuery } from "../../services/managerService";

interface Props {
  id: string;
}

const ManagerDetails: React.FC<Props> = ({ id }) => {
  const { data: manager, isLoading } = useGetManagerInfoQuery(Number(id));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!manager) return <Typography>Manager data not found</Typography>;

  return (
    <Paper
      elevation={3}
      sx={{ p: 3, mt: 3, backgroundColor: "#424242", color: "#fff", borderRadius: 3 }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#fff" }}
      >
        Manager Details — ID: {manager.id}
      </Typography>

      <Box mb={2}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Full name:</strong> {manager.fullName}
        </Typography>
        <Typography variant="body1">
          <strong>Role:</strong> {manager.role ?? "—"}
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: "#555" }} />

      {manager.workers && manager.workers.length > 0 && (
        <>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#fff" }}
          >
            Workers
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
            {manager.workers.map((worker) => (
              <Card
                key={worker.id}
                sx={{ width: 280, backgroundColor: "#3a3a3a", color: "#fff" }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component={Link}
                    to={`/employee/${worker.id}`}
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline", color: "#aaa" },
                    }}
                    gutterBottom
                  >
                    {worker.fullName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Position: {worker.position?.name ?? "—"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Status: {worker.status ? "Active" : "Inactive"}
                  </Typography>
                  <Typography variant="body2">
                    Out Of Office Balance: {worker.outOfOfficeBalance}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Divider sx={{ my: 2, borderColor: "#555" }} />
        </>
      )}

      {manager.projects && manager.projects.length > 0 && (
        <>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#fff" }}
          >
            Projects
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={2}>
            {manager.projects.map((project) => (
              <Card
                key={project.id}
                sx={{ width: 280, backgroundColor: "#3a3a3a", color: "#fff" }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component={Link}
                    to={`/project/${project.id}`}
                    sx={{
                      color: "#fff",
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
        </>
      )}
    </Paper>
  );
};

export default ManagerDetails;
