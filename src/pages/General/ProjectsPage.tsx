import React, { useEffect, useState } from "react";
import ProjectTable from "../../Components/Tables/ProjectTable";
import { Project } from "../../types/Project";
import { Link } from "react-router-dom";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { UserType } from "../../types/User";
import {
  useGetAllProjetsQuery,
  useDelProjectMutation,
  useDeactivateProjectMutation,
} from "../../services/projectService";

const ProjectsPage: React.FC = () => {
  const { data: projectsList } = useGetAllProjetsQuery(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const role = useSelector((state: RootState) => state.auth.role);

  const [delProject] = useDelProjectMutation();
  const [deactivateProject] = useDeactivateProjectMutation();

  useEffect(() => {
    if (projectsList) {
      setProjects(projectsList);
    }
  }, [projectsList]);

  const handleDelete = async (id: number) => {
    try {
      await delProject(id).unwrap();
      setProjects((prev) => prev.filter((p) => p.id !== id));
      console.log(`Project deleted successfully`);
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const handleDeactivate = async (id: number) => {
    try {
      await deactivateProject(id).unwrap();
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: false } : p))
      );
      console.log(`Project deactivated successfully`);
    } catch (err) {
      console.error("Failed to deactivate project:", err);
    }
  };

  const buttonStyle = {
    backgroundColor: "#424242",
    color: "#fff",
    minHeight: 36,
    borderRadius: 2,
    textTransform: "none",
    "&:hover": { backgroundColor: "#555", color: "#fff" },
    "&:active": { transform: "scale(0.97)" },
  };

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 3,
          backgroundColor: "#2F2F2F",
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
            sx={{
              fontWeight: "bold",
              color: "#fff",
              whiteSpace: "normal",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            Projects
          </Typography>


          {(role === UserType.Admin || role === UserType.ProjectManager) && (
            <Button
              component={Link}
              to="/create-project"
              variant="contained"
              sx={{
                ...buttonStyle,
                whiteSpace: "normal",
                overflowWrap: "break-word",
                wordBreak: "break-all",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              + Create Project
            </Button>
          )}

        </Box>

        <ProjectTable
          projects={projects}
          onDelete={handleDelete}
          onDeactivate={handleDeactivate}
        />
      </Paper>
    </Container>
  );
};

export default ProjectsPage;
