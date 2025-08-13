import React, { useEffect } from "react";
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
import { UpdateEmployee } from "../../types/Employee";
import {
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../../services/employeeService";
import {
  useGetPositionsQuery,
  useGetSubdivisionsQuery,
} from "../../services/selectionService";
import { useGetHrManagersQuery } from "../../services/managerService";

interface Props {
  id: string;
}

const UpdateEmployeeForm: React.FC<Props> = ({ id }) => {
  const { data: employee, isLoading: isLoadingEmployee } = useGetEmployeeQuery(
    Number(id)
  );
  const { data: subdivisions, isLoading: isLoadingSubdivisions } =
    useGetSubdivisionsQuery(null);
  const { data: positions, isLoading: isLoadingPositions } =
    useGetPositionsQuery(null);
  const { data: hrManagers, isLoading: isLoadingHrManagers } =
    useGetHrManagersQuery(null);

  const [updateEmployee] = useUpdateEmployeeMutation();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<UpdateEmployee>();

  useEffect(() => {
    if (employee) {
      reset({
        id: employee.id,
        fullName: employee.fullName,
        subdivisionId: employee.subdivision.id,
        positionId: employee.position.id,
        status: employee.status,
        outOfOfficeBalance: employee.outOfOfficeBalance,
        password: "",
        hrManagerId: employee.hrManager?.id,
      });
    }
  }, [employee, reset]);

  const onSubmit: SubmitHandler<UpdateEmployee> = async (data) => {
    if (!data.login) delete (data as any).login;
    if (!data.password) delete (data as any).password;

    try {
      await updateEmployee(data).unwrap();
      console.log("Employee updated successfully", data);
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  const selectedSubdivisionId = watch("subdivisionId");
  const selectedPositionId = watch("positionId");
  const selectedHrManagerId = watch("hrManagerId");
  const selectedStatus = watch("status");

  if (
    isLoadingEmployee ||
    isLoadingSubdivisions ||
    isLoadingPositions ||
    isLoadingHrManagers
  ) {
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
          Update Employee
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField {...register("login")} label="Login" fullWidth />
            <TextField
              {...register("password")}
              label="Password"
              type="password"
              fullWidth
            />
            <TextField
              {...register("fullName", { required: "Full Name is required" })}
              label="Full Name"
              fullWidth
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />

            <FormControl fullWidth error={!!errors.hrManagerId}>
              <InputLabel id="hr-manager-label">HR Manager</InputLabel>
              <Select
                labelId="hr-manager-label"
                label="HR Manager"
                value={selectedHrManagerId ?? ""}
                onChange={(e) => setValue("hrManagerId", Number(e.target.value))}
              >
                {hrManagers?.map((hr) => (
                  <MenuItem key={hr.id} value={hr.id}>
                    {hr.fullName}
                  </MenuItem>
                ))}
              </Select>
              {errors.hrManagerId && (
                <Typography variant="caption" color="error">
                  {errors.hrManagerId.message}
                </Typography>
              )}
            </FormControl>

            <FormControl fullWidth error={!!errors.subdivisionId}>
              <InputLabel>Subdivision</InputLabel>
              <Select
                label="Subdivision"
                value={selectedSubdivisionId || ""}
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
                value={selectedPositionId || ""}
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

            <FormControl fullWidth error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={selectedStatus !== undefined ? String(selectedStatus) : ""}
                onChange={(e) => setValue("status", e.target.value === "true")}
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
              {errors.status && (
                <Typography variant="caption" color="error">
                  {errors.status.message}
                </Typography>
              )}
            </FormControl>

            <TextField
              {...register("outOfOfficeBalance")}
              label="Out of Office Balance"
              type="number"
              fullWidth
              error={!!errors.outOfOfficeBalance}
              helperText={errors.outOfOfficeBalance?.message}
            />

            <Button type="submit" variant="contained" size="large" fullWidth>
              Update Employee
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateEmployeeForm;
