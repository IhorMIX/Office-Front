import React, { useEffect } from "react";
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, Container, Box } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetProjectQuery, useUpdateProjectMutation } from "../../services/projectService";
import { UpdateProject } from "../../types/Project";
import { useGetProjectManagersQuery } from "../../services/managerService";
import { useGetProjectTypeQuery } from "../../services/selectionService";
import { formatDate } from "../../Helpers/DateHelper";

interface Props {
  id: string;
}

const UpdateProjectForm: React.FC<Props> = ({ id }) => {
  const { data: project, isLoading: isLoadingProject } = useGetProjectQuery(Number(id));
  const { data: projectManagers, isLoading: isLoadingManagers } = useGetProjectManagersQuery(null);
  const { data: types, isLoading: isLoadingTypes } = useGetProjectTypeQuery(null);
  const [updateProject] = useUpdateProjectMutation();

  const { handleSubmit, register, reset, setValue, watch } = useForm<UpdateProject>();

  useEffect(() => {
    if (project) {
      reset({
        id: project.id,
        projectManagerId: project.projectManager?.id ?? 0,
        projectTypeId: project.projectType?.id ?? 0,
        startDate: formatDate(project.startDate),
        endDate: formatDate(project.endDate),
        comment: project.comment || "",
        status: project.status,
      });
    }
  }, [project, reset]);

  const selectedManagerId = watch("projectManagerId");
  const selectedTypeId = watch("projectTypeId");
  const selectedStatus = watch("status");

  const onSubmit: SubmitHandler<UpdateProject> = async (data) => {
    try {
      await updateProject(data).unwrap();
      console.log("Project updated:", data);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  if (isLoadingProject || isLoadingManagers || isLoadingTypes) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 5, p: 4, borderRadius: 3, backgroundColor: "#f9fbfc" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Update Project
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="project-manager-label" shrink>
                Project Manager
              </InputLabel>
              <Select
                labelId="project-manager-label"
                value={selectedManagerId || ""}
                onChange={(e) => setValue("projectManagerId", Number(e.target.value))}
                label="Project Manager"
              >
                {projectManagers?.map((manager) => (
                  <MenuItem key={manager.id} value={manager.id}>
                    {manager.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel id="project-type-label" shrink>Project Type</InputLabel>
              <Select
                labelId="project-type-label"
                value={selectedTypeId || ""}
                onChange={(e) => setValue("projectTypeId", Number(e.target.value))}
                label="Project Type"
              >
                {types?.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              {...register("startDate")}
              label="Start Date"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              {...register("endDate")}
              label="End Date"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              {...register("comment")}
              label="Comment"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-label" shrink>Status</InputLabel>
              <Select
                labelId="status-label"
                value={selectedStatus ? "true" : "false"}
                onChange={(e) => setValue("status", e.target.value === "true")}
                label="Status"
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" size="large" variant="contained" fullWidth>
              Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateProjectForm;
