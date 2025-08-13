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
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
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

      <Divider sx={{ my: 2 }} />

      {manager.workers && manager.workers.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
            Workers
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
            {manager.workers.map((workers) => (
              <Card key={workers.id} sx={{ width: 280 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component={Link}
                    to={`/employee/${workers.id}`}
                    sx={{
                      color: "black",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    gutterBottom
                  >
                    {workers.fullName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Position: {workers.position?.name ?? "—"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Status: {workers.status ? "Active" : "Inactive"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Out Of Office Balance: {workers.outOfOfficeBalance}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />
        </>
      )}

      {manager.projects && manager.projects.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
            Projects
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={2}>
            {manager.projects.map((project) => (
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
                  <Typography variant="body2" color="textSecondary">
                    Start Date: {project.startDate ? new Date(project.startDate).toLocaleDateString() : "—"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    End Date: {project.endDate ? new Date(project.endDate).toLocaleDateString() : "—"}
                  </Typography>
                  {project.comment && (
                    <Typography variant="body2" color="textSecondary">
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
        </>
      )}
    </Paper>
  );
};

export default ManagerDetails;
