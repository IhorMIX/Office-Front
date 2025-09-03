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
import { useGetAdminQuery, useGetApproversQuery } from "../../services/managerService";

const CreateLeaveRequestForm: React.FC = () => {
  const { data: approvers, isLoading: loadingApprovers } = useGetApproversQuery(null);
  const { data: admin, isLoading: loadingAdmin } = useGetAdminQuery(null);
  const { data: reasons, isLoading: loadingReasons } = useGetAbsenceReasonQuery(null);
  const [createLeaveRequest] = useCreateLeaveRequestMutation();

  const combinedApprovers = React.useMemo(() => {
    if (!approvers) return admin ? [admin] : [];
    return admin ? [...approvers, admin] : approvers;
  }, [approvers, admin]);

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

  if (loadingApprovers || loadingReasons || loadingAdmin) {
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
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#fff" }}>
          Create Leave Request
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3}>
            <FormControl fullWidth error={!!errors.absenceReasonId} sx={fieldStyle}>
              <InputLabel id="absence-reason-label">Absence Reason</InputLabel>
              <Select
                labelId="absence-reason-label"
                label="Absence Reason"
                defaultValue=""
                onChange={(e) => setValue("absenceReasonId", Number(e.target.value))}
                sx={{ color: "#fff" }}
              >
                <MenuItem value="">
                  <em>Select reason</em>
                </MenuItem>
                {reasons?.map((reason) => (
                  <MenuItem key={reason.id} value={reason.id}>
                    {reason.reasonDescription}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.absenceReasonId && (
              <Typography variant="caption" color="error">
                {errors.absenceReasonId.message}
              </Typography>
            )}

            <FormControl fullWidth error={!!errors.approverId} sx={fieldStyle}>
              <InputLabel id="approver-label">Approver</InputLabel>
              <Select
                labelId="approver-label"
                label="Approver"
                defaultValue=""
                onChange={(e) => setValue("approverId", Number(e.target.value))}
                sx={{ color: "#fff" }}
              >
                <MenuItem value="">
                  <em>Select approver</em>
                </MenuItem>
                {combinedApprovers.map((approver) => (
                  <MenuItem key={approver.id} value={approver.id}>
                    {approver.fullName} - {approver.role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.approverId && (
              <Typography variant="caption" color="error">
                {errors.approverId.message}
              </Typography>
            )}

            <TextField
              {...register("startDate", { required: "Start date is required" })}
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
              sx={fieldStyle}
            />

            <TextField
              {...register("endDate", { required: "End date is required" })}
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
              sx={fieldStyle}
            />

            <TextField
              {...register("comment")}
              label="Comment"
              fullWidth
              multiline
              minRows={2}
              InputLabelProps={{ shrink: true }}
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
              Create Leave Request
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateLeaveRequestForm;
