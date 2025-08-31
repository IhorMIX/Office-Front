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
              sx={fieldStyle}
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
              sx={fieldStyle}
            />

            <TextField
              {...register("fullName", { required: "Full Name is required" })}
              label="Full Name"
              fullWidth
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              sx={fieldStyle}
            />

<FormControl fullWidth error={!!errors.subdivisionId} sx={fieldStyle}>
  <InputLabel id="subdivision-label">Subdivision</InputLabel>
  <Select
    labelId="subdivision-label"
    label="Subdivision"
    defaultValue=""
    onChange={(e) => setValue("subdivisionId", Number(e.target.value))}
    sx={{ color: "#fff" }}
  >
    <MenuItem value="">
      <em>Choose subdivision</em>
    </MenuItem>
    {subdivisions?.map((s) => (
      <MenuItem key={s.id} value={s.id}>
        {s.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

<FormControl fullWidth error={!!errors.positionId} sx={fieldStyle}>
  <InputLabel id="position-label">Position</InputLabel>
  <Select
    labelId="position-label"
    label="Position"
    defaultValue=""
    onChange={(e) => setValue("positionId", Number(e.target.value))}
    sx={{ color: "#fff" }}
  >
    <MenuItem value="">
      <em>Choose position</em>
    </MenuItem>
    {positions?.map((p) => (
      <MenuItem key={p.id} value={p.id}>
        {p.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

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



            <TextField
              {...register("outOfOfficeBalance")}
              label="Out of Office Balance"
              type="number"
              fullWidth
              error={!!errors.outOfOfficeBalance}
              helperText={errors.outOfOfficeBalance?.message}
              sx={fieldStyle}
            />

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
              Create Employee
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateUserForm;
