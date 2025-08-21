import React, { useEffect, useState } from "react";
import ProjectTable from "../../Components/Tables/ProjectTable";
import { Project } from "../../types/Project";
import { Link } from "react-router-dom";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { UserType } from "../../types/User";
import { useGetAllProjetsQuery } from "../../services/projectService";

const ProjectsPage: React.FC = () => {

  const { data: projectsList } = useGetAllProjetsQuery(null);
  const [projects, setProjects] = useState<Project[]>([])
  const role = useSelector((state: RootState) => state.auth.role);

  useEffect(() => {
    if (projectsList) {
      setProjects(projectsList);
    }
  }, [projectsList]);

  const handleEdit = (id: number) => {
    console.log(`Edit project with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
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
            Projects
          </Typography>

          {(role === UserType.Admin || role === UserType.ProjectManager) && (
            <Button
              component={Link}
              to="/create-project"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              + Create Project
            </Button>
          )}
        </Box>

        <ProjectTable
          projects={projects}
          onDelete={handleDelete}
        />
      </Paper>
    </Container>
  );
};

export default ProjectsPage;