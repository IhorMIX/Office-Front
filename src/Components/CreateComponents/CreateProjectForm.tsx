import { SubmitHandler, useForm } from "react-hook-form";
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
    register,
    setValue,
    formState: { errors },
  } = useForm<CreateProject>();

  const onSubmit: SubmitHandler<CreateProject> = async (data: CreateProject) => {
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
            {/* Project Type */}
            <FormControl fullWidth error={!!errors.projectTypeId}>
              <InputLabel>Project Type</InputLabel>
              <Select
                {...register("projectTypeId", { required: "Project Type is required" })}
                label="Project Type"
                onChange={(e) => setValue("projectTypeId", e.target.value as number)}
              >
                {types?.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.projectTypeId && (
                <Typography variant="caption" color="error">
                  {errors.projectTypeId.message}
                </Typography>
              )}
            </FormControl>

            {/* Start Date */}
            <TextField
              {...register("startDate", { required: "Start Date is required" })}
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
              fullWidth
            />

            {/* End Date */}
            <TextField
              {...register("endDate", { required: "End Date is required" })}
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
              fullWidth
            />

            {/* Comment */}
            <TextField
              {...register("comment")}
              label="Comment"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            {/* Status */}
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select {...register("status")} label="Status">
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>

            {/* Submit */}
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
