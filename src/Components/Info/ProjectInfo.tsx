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
          Project Details — ID: {project.id}
        </Typography>

        <Box mb={3}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Project manager:</strong>{" "}
            {project.projectManager?.fullName ?? "—"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Project type:</strong> {project.projectType?.name ?? "—"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Start Date:</strong>{" "}
            {project.startDate
              ? new Date(project.startDate).toLocaleDateString()
              : "—"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>End Date:</strong>{" "}
            {project.endDate
              ? new Date(project.endDate).toLocaleDateString()
              : "—"}
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
          Employees
        </Typography>

        {project.employees && project.employees.length > 0 ? (
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            justifyContent="center"
            mb={3}
          >
            {project.employees.map((employee) => (
              <Card
                key={employee.id}
                sx={{
                  width: 230,
                  backgroundColor: "#3a3a3a",
                  color: "#fff",
                  wordBreak: "break-word",
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
                    to={`/employee/${employee.id}`}
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#aaa",
                      },
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
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "#fff", wordBreak: "break-word", mt: 2 }}
          >
            No employees assigned to this project.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ProjectInfo;
