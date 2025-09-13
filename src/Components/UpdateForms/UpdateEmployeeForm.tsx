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
  const { data: employee, isLoading: isLoadingEmployee } = useGetEmployeeQuery(Number(id));
  const { data: subdivisions, isLoading: isLoadingSubdivisions } = useGetSubdivisionsQuery(null);
  const { data: positions, isLoading: isLoadingPositions } = useGetPositionsQuery(null);
  const { data: hrManagers, isLoading: isLoadingHrManagers } = useGetHrManagersQuery(null);

  const [updateEmployee] = useUpdateEmployeeMutation();

  const { handleSubmit, register, setValue, reset, watch, formState: { errors } } =
    useForm<UpdateEmployee>();

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
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#fff",
            textAlign: "center",
            whiteSpace: "normal",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          Update Employee
        </Typography>


        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField {...register("login")} label="Login" fullWidth sx={fieldStyle} />
            <TextField
              {...register("password")}
              label="Password"
              type="password"
              fullWidth
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

            <FormControl fullWidth error={!!errors.hrManagerId} sx={fieldStyle}>
              <InputLabel id="hr-manager-label">HR Manager</InputLabel>
              <Select
                labelId="hr-manager-label"
                label="HR Manager"
                value={selectedHrManagerId ?? ""}
                onChange={(e) => setValue("hrManagerId", Number(e.target.value))}
                sx={{ color: "#fff" }}
              >
                {hrManagers?.map((hr) => (
                  <MenuItem key={hr.id} value={hr.id}>
                    {hr.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth error={!!errors.subdivisionId} sx={fieldStyle}>
              <InputLabel id="subdivision-label">Subdivision</InputLabel>
              <Select
                labelId="subdivision-label"
                label="Subdivision"
                value={selectedSubdivisionId || ""}
                onChange={(e) => setValue("subdivisionId", Number(e.target.value))}
                sx={{ color: "#fff" }}
              >
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
                value={selectedPositionId || ""}
                onChange={(e) => setValue("positionId", Number(e.target.value))}
                sx={{ color: "#fff" }}
              >
                {positions?.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth error={!!errors.status} sx={fieldStyle}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                value={selectedStatus !== undefined ? String(selectedStatus) : ""}
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
                textAlign: "center",
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                lineHeight: 1.3,
                p: 2,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderColor: "#aaa"
                },
              }}
            >
              Update Employee
            </Button>

          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateEmployeeForm;
