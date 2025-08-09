import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { CreateProject } from "../../types/Project";
import React from "react";
import { useGetProjectTypeQuery } from "../../services/selectionService";
import { useCreateProjectMutation } from "../../services/projectService";

const CreateProjectForm: React.FC = () => {
  const { data: types, isLoading: isLoadingTypes } = useGetProjectTypeQuery(null);
  const [createProject] = useCreateProjectMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProject>({
    defaultValues: {
      projectTypeId: 0,
      startDate: "",
      endDate: "",
      comment: "",
      status: true,
    },
  });

  const onSubmit: SubmitHandler<CreateProject> = async (data) => {
    try {
      await createProject(data).unwrap();
      console.log(data);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  if (isLoadingTypes) return <div>Loading...</div>;

  return (
    <Box maxWidth="sm" mx="auto" mt={4}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" mb={3} fontWeight={600}>
          Create Project
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>

            <FormControl fullWidth error={!!errors.projectTypeId}>
              <InputLabel id="project-type-label">Project Type</InputLabel>
              <Controller
                name="projectTypeId"
                control={control}
                rules={{ required: "Project Type is required" }}
                render={({ field }) => (
                  <Select
                    labelId="project-type-label"
                    label="Project Type"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    <MenuItem value="">
                      <em>Select project type</em>
                    </MenuItem>
                    {types?.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.projectTypeId && (
                <Typography variant="caption" color="error">
                  {errors.projectTypeId.message}
                </Typography>
              )}
            </FormControl>

            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Start Date is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="endDate"
              control={control}
              rules={{ required: "End Date is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Comment"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />

            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="status-label"
                    label="Status"
                    {...field}
                    value={field.value ? "true" : "false"}
                    onChange={(e) => field.onChange(e.target.value === "true")}
                  >
                    <MenuItem value="true">Active</MenuItem>
                    <MenuItem value="false">Inactive</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <Button type="submit" variant="contained" size="large" fullWidth>
              Create
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateProjectForm;
