import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CreateProject } from "../../types/Project";
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
      console.log("Project created:", data);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  if (isLoadingTypes) return <Typography>Loading...</Typography>;

  const fieldStyle = {
    backgroundColor: "#424242",
    color: "#fff",
    "& .MuiInputBase-input": { color: "#fff" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#aaa" },
    "& .MuiInputLabel-root": { color: "#fff" },
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#424242",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#fff" }}>
          Create Project
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3}>
            <FormControl fullWidth error={!!errors.projectTypeId} sx={fieldStyle}>
              <InputLabel id="project-type-label">Project Type</InputLabel>
              <Select
                labelId="project-type-label"
                label="ProjectType"
                defaultValue=""
                onChange={(e) => setValue("projectTypeId", Number(e.target.value))}
                sx={{ color: "#fff" }}
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
            </FormControl>
            {errors.projectTypeId && (
              <Typography variant="caption" color="error">
                {errors.projectTypeId.message}
              </Typography>
            )}

            <TextField
              {...register("startDate", { required: "Start Date is required" })}
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
              fullWidth
              sx={fieldStyle}
            />

            <TextField
              {...register("endDate", { required: "End Date is required" })}
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
              fullWidth
              sx={fieldStyle}
            />

            <TextField
              {...register("comment")}
              label="Comment"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={fieldStyle}
            />

            <FormControl fullWidth sx={fieldStyle}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                defaultValue="true"
                onChange={(e) => setValue("status", e.target.value === "true")}
                sx={{ color: "#fff" }}
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="outlined"
              size="large"
              fullWidth
              sx={{
                color: "#fff",
                borderColor: "#fff",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)", borderColor: "#aaa" },
              }}
            >
              Create Project
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateProjectForm;
