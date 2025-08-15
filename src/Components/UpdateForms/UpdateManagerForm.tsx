import { useEffect } from "react";
import { Button, Paper, TextField, Typography, Container, Box } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { UpdateManager } from "../../types/Employee";
import { useGetManagerInfoQuery, useUpdateManagerMutation } from "../../services/managerService";

interface Props {
  id: string;
}

const UpdateManagerForm: React.FC<Props> = ({ id }) => {
  const { data: manager, isLoading: isLoadingManager } = useGetManagerInfoQuery(Number(id));
  const [updateManager] = useUpdateManagerMutation();
  const { handleSubmit, register, reset } = useForm<UpdateManager>();

  useEffect(() => {
    if (manager) {
      reset({
        id: manager.id,
        fullName: manager.fullName,
        password: "",
      });
    }
  }, [manager, reset]);

  const onSubmit: SubmitHandler<UpdateManager> = async (data) => {
    if (!data.login) delete (data as any).login;
    if (!data.password) delete (data as any).password;

    try {
      const result = await updateManager(data).unwrap();
      console.log("Manager updated successfully:", result);
    } catch (error) {
      console.error("Failed to update manager:", error);
    }
  };

  if (isLoadingManager) {
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
          Update Manager
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
            <TextField {...register("fullName")} label="Full Name" fullWidth />

            <Button type="submit" variant="contained" size="large" fullWidth>
              Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateManagerForm;
