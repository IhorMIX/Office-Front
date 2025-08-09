import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useGetAbsenceReasonQuery } from "../../services/selectionService";
import { useCreateLeaveRequestMutation } from "../../services/requestsService";
import { CreateLeaveRequest } from "../../types/Requests";
import { useGetAdminQuery } from "../../services/managerService";

const CreateLeaveRequestForm: React.FC = () => {
  const { data: admin, isLoading: loadingApprovers } = useGetAdminQuery(null);
  const { data: reasons, isLoading: loadingReasons } = useGetAbsenceReasonQuery(null);
  const [createLeaveRequest] = useCreateLeaveRequestMutation();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CreateLeaveRequest>();

  const onSubmit: SubmitHandler<CreateLeaveRequest> = async (data) => {
    try {
      await createLeaveRequest(data).unwrap();
      console.log("Leave request created successfully:", data);
    } catch (error) {
      console.error("Failed to create leave request:", error);
    }
  };

  if (loadingApprovers || loadingReasons) {
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
          Create Leave Request
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3}>

            <FormControl fullWidth error={!!errors.absenceReasonId}>
              <InputLabel>Absence Reason</InputLabel>
              <Select
                defaultValue=""
                label="Absence Reason"
                onChange={(e) => {
                  setValue("absenceReasonId", Number(e.target.value));
                }}
              >
                {reasons?.map((reason) => (
                  <MenuItem key={reason.id} value={reason.id}>
                    {reason.reasonDescription}
                  </MenuItem>
                ))}
              </Select>
              {errors.absenceReasonId && (
                <Typography variant="caption" color="error">
                  {errors.absenceReasonId.message}
                </Typography>
              )}
            </FormControl>

            <FormControl fullWidth error={!!errors.approverId}>
              <InputLabel>Approver</InputLabel>
              <Select
                defaultValue=""
                label="Approver"
                onChange={(e) => {
                  setValue("approverId", Number(e.target.value));
                }}
              >
                {admin && (
                  <MenuItem key={admin.id} value={admin.id}>
                    {admin.fullName}
                  </MenuItem>
                )}
              </Select>
              {errors.approverId && (
                <Typography variant="caption" color="error">
                  {errors.approverId.message}
                </Typography>
              )}
            </FormControl>

            <TextField
              {...register("startDate", { required: "Start date is required" })}
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
            />

            <TextField
              {...register("endDate", { required: "End date is required" })}
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
            />

            <TextField
              {...register("comment")}
              label="Comment"
              fullWidth
              multiline
              minRows={2}
              InputLabelProps={{ shrink: true }}
            />

            <Button type="submit" variant="contained" size="large" fullWidth>
              Create Leave Request
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateLeaveRequestForm;
