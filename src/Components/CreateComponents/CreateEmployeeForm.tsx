import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { CreateEmployee } from "../../types/Employee";
import { useCreateEmployeeMutation } from "../../services/employeeService";
import {
  useGetPositionsQuery,
  useGetSubdivisionsQuery,
} from "../../services/selectionService";

const CreateUserForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CreateEmployee>();

  const [createUser] = useCreateEmployeeMutation();
  const { data: subdivisions, isLoading: isLoadingSubdivisions } = useGetSubdivisionsQuery(null);
  const { data: positions, isLoading: isLoadingPositions } = useGetPositionsQuery(null);

  const onSubmit: SubmitHandler<CreateEmployee> = async (data) => {
    try {
      await createUser(data).unwrap();
      console.log("User created successfully");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  if (isLoadingSubdivisions || isLoadingPositions) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#f9fbfc",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Create Employee
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              {...register("login", { required: "Login is required" })}
              label="Login"
              fullWidth
              error={!!errors.login}
              helperText={errors.login?.message}
            />

            <TextField
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
              label="Password"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              {...register("fullName", { required: "Full Name is required" })}
              label="Full Name"
              fullWidth
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />

            <FormControl fullWidth error={!!errors.subdivisionId}>
              <InputLabel>Subdivision</InputLabel>
              <Select
                label="Subdivision"
                defaultValue=""
                onChange={(e) => setValue("subdivisionId", Number(e.target.value))}
              >
                {subdivisions?.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.subdivisionId && (
                <Typography variant="caption" color="error">
                  {errors.subdivisionId.message}
                </Typography>
              )}
            </FormControl>

            <FormControl fullWidth error={!!errors.positionId}>
              <InputLabel>Position</InputLabel>
              <Select
                label="Position"
                defaultValue=""
                onChange={(e) => setValue("positionId", Number(e.target.value))}
              >
                {positions?.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.positionId && (
                <Typography variant="caption" color="error">
                  {errors.positionId.message}
                </Typography>
              )}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                defaultValue="true"
                onChange={(e) => setValue("status", e.target.value === "true")}
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>

            <TextField
              {...register("outOfOfficeBalance", {
                required: "Out of Office Balance is required",
              })}
              label="Out of Office Balance"
              type="number"
              fullWidth
              error={!!errors.outOfOfficeBalance}
              helperText={errors.outOfOfficeBalance?.message}
            />

            <Button type="submit" variant="contained" size="large" fullWidth>
              Create Employee
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateUserForm;
