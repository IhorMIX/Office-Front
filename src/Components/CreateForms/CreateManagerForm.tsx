import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  useCreateHrManagerMutation,
  useCreateProjectManagerMutation,
} from "../../services/managerService";
import { CreateManager } from "../../types/Employee";
import { UserType } from "../../types/User";

interface FormModel {
  manager: CreateManager;
  role: UserType;
}

const CreateManagerForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormModel>();

  const [createProjectManager] = useCreateProjectManagerMutation();
  const [createHrManager] = useCreateHrManagerMutation();

  const onSubmit: SubmitHandler<FormModel> = async (data) => {
    try {
      if (data.role === UserType.HrManager) {
        await createHrManager(data.manager).unwrap();
      }
      if (data.role === UserType.ProjectManager) {
        await createProjectManager(data.manager).unwrap();
      }
      console.log("Manager created successfully");
    } catch (error) {
      console.error("Failed to create manager:", error);
    }
  };

  const fieldStyle = {
    backgroundColor: "#424242",
    color: "#fff",
    "& .MuiInputBase-input": { color: "#fff" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#aaa" },
    "& .MuiInputLabel-root": { color: "#fff" },
    "& .MuiSelect-icon": { color: "#fff" },
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
          Create Manager
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              {...register("manager.login", { required: "Login is required" })}
              label="Login"
              fullWidth
              error={!!errors.manager?.login}
              helperText={errors.manager?.login?.message}
              sx={fieldStyle}
            />

            <TextField
              {...register("manager.password", { required: "Password is required" })}
              label="Password"
              type="password"
              fullWidth
              error={!!errors.manager?.password}
              helperText={errors.manager?.password?.message}
              sx={fieldStyle}
            />

            <TextField
              {...register("manager.fullName", { required: "Full Name is required" })}
              label="Full Name"
              fullWidth
              error={!!errors.manager?.fullName}
              helperText={errors.manager?.fullName?.message}
              sx={fieldStyle}
            />

            <FormControl fullWidth error={!!errors.role} sx={fieldStyle}>
              <InputLabel>Role</InputLabel>
              <Select
                defaultValue=""
                label="Role"
                onChange={(e) => setValue("role", e.target.value as UserType)}
                sx={{ color: "#fff" }}
              >
                <MenuItem value={UserType.HrManager}>HR Manager</MenuItem>
                <MenuItem value={UserType.ProjectManager}>Project Manager</MenuItem>
              </Select>
              {errors.role && (
                <Typography variant="caption" color="error">
                  {errors.role.message}
                </Typography>
              )}
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
              Create Manager
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateManagerForm;
