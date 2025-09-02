import { SubmitHandler, useForm } from "react-hook-form";
import {
  useAddEmployeesMutation,
  useGetProjectQuery,
} from "../../services/projectService";
import { AddEmployees } from "../../types/Project";
import { Employee } from "../../types/Employee";
import { useEffect } from "react";
import React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Paper,
  Container,
  Box,
} from "@mui/material";
import { useGetAllEmployeesQuery } from "../../services/employeeService";
import { Link } from "react-router-dom";

interface Props {
  id: string;
}

const AddEmployeesForm: React.FC<Props> = ({ id }) => {
  const { data: project, isLoading: isLoadingProject } = useGetProjectQuery(Number(id));
  const { data: employees, isLoading: isLoadingEmployees } = useGetAllEmployeesQuery(null);
  const [updateProject] = useAddEmployeesMutation();

  const { handleSubmit, setValue, watch, reset } = useForm<AddEmployees>({
    defaultValues: {
      projectId: Number(id),
      employeesIds: project?.employees.map((e: Employee) => e.id) || [],
    },
  });

  useEffect(() => {
    if (project) {
      reset({
        projectId: Number(id),
        employeesIds: project.employees.map((e: Employee) => e.id),
      });
    }
  }, [project, reset, id]);

  const employeesIds = watch("employeesIds");

  const handleEmployeeChange = (employeeId: number) => {
    setValue(
      "employeesIds",
      employeesIds.includes(employeeId)
        ? employeesIds.filter((id) => id !== employeeId)
        : [...employeesIds, employeeId]
    );
  };

  const onSubmit: SubmitHandler<AddEmployees> = async (data) => {
    try {
      await updateProject(data).unwrap();
      console.log("Project employees updated:", data);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  if (isLoadingProject || isLoadingEmployees) {
    return <Typography sx={{ color: "#fff" }}>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#424242",
          color: "#fff",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#fff" }}>
          Edit Employees for Project:
          <Link
            to={`/projects/${project?.id}`}
            style={{
              color: "#fff",
              textDecoration: "none",
              marginLeft: "6px",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            {project?.projectType.name}
          </Link>
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3}>
            <FormGroup>
              {employees?.map((employee: Employee) => (
                <FormControlLabel
                  key={employee.id}
                  control={
                    <Checkbox
                      checked={employeesIds.includes(employee.id)}
                      onChange={() => handleEmployeeChange(employee.id)}
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": { color: "#fff" },
                      }}
                    />
                  }
                  label={employee.fullName}
                  sx={{ color: "#fff" }}
                />
              ))}
            </FormGroup>

            <Button
              variant="outlined"
              size="large"
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#424242",
                color: "#fff",
                borderColor: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#505050",
                  borderColor: "#fff",
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddEmployeesForm;
