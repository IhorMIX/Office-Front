import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { formatDate } from "../../Helpers/DateHelper";
import { useGetAdminQuery } from "../../services/managerService";
import { useGetAbsenceReasonQuery } from "../../services/selectionService";
import { LeaveRequestStatus, UpdateLeaveRequest } from "../../types/Requests";
import {
  useGetLeaveRequestQuery,
  useUpdateLeaveRequestMutation,
} from "../../services/requestsService";

interface Props {
  id: string;
}

const UpdateLeaveRequestForm: React.FC<Props> = ({ id }) => {
  const { data: leaveRequest, isLoading: isLoadingRequests } =
    useGetLeaveRequestQuery(Number(id));
  const { data: admin, isLoading: isLoadingApprovers } = useGetAdminQuery(null);
  const { data: reasons, isLoading: isLoadingReasons } =
    useGetAbsenceReasonQuery(null);
  const [updateLeaveRequest] = useUpdateLeaveRequestMutation();

  const { handleSubmit, register, reset, setValue, watch } =
    useForm<UpdateLeaveRequest>();

  useEffect(() => {
    if (leaveRequest) {
      reset({
        id: leaveRequest.id,
        absenceReasonId: leaveRequest.absenceReason?.id ?? 0,
        approverId: leaveRequest.approvalRequest?.approver?.id ?? 0,
        startDate: formatDate(leaveRequest.startDate),
        endDate: formatDate(leaveRequest.endDate),
        status: leaveRequest.status,
        comment: leaveRequest.comment || "",
      });
    }
  }, [leaveRequest, reset]);

  const selectedReasonId = watch("absenceReasonId");
  const selectedApproverId = watch("approverId");
  const selectedStatus = watch("status");

  const onSubmit: SubmitHandler<UpdateLeaveRequest> = async (data) => {
    try {
      await updateLeaveRequest(data).unwrap();
      console.log("Leave request updated:", data);
    } catch (error) {
      console.error("Failed to update leave request:", error);
    }
  };

  if (isLoadingRequests || isLoadingApprovers || isLoadingReasons) {
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
            lineHeight: 1.3,
          }}
        >
          Update Leave Request
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3}>
            <FormControl fullWidth sx={fieldStyle}>
              <InputLabel id="reason-label">Absence Reason</InputLabel>
              <Select
                labelId="reason-label"
                label="Absence Reason"
                value={selectedReasonId || ""}
                onChange={(e) =>
                  setValue("absenceReasonId", Number(e.target.value))
                }
                sx={{ color: "#fff" }}
              >
                {reasons?.map((reason) => (
                  <MenuItem key={reason.id} value={reason.id}>
                    {reason.reasonDescription}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={fieldStyle}>
              <InputLabel id="approver-label">Approver</InputLabel>
              <Select
                labelId="approver-label"
                label="Approver"
                value={selectedApproverId || ""}
                onChange={(e) => setValue("approverId", Number(e.target.value))}
                sx={{ color: "#fff" }}
              >
                {admin && (
                  <MenuItem key={admin.id} value={admin.id}>
                    {admin.fullName}
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            <TextField
              {...register("startDate")}
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={fieldStyle}
            />

            <TextField
              {...register("endDate")}
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={fieldStyle}
            />

            <FormControl fullWidth sx={fieldStyle}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="status"
                value={selectedStatus || ""}
                onChange={(e) =>
                  setValue("status", e.target.value as LeaveRequestStatus)
                }
                sx={{ color: "#fff" }}
              >
                {Object.values(LeaveRequestStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              {...register("comment")}
              label="Comment"
              fullWidth
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
                textAlign: "center",
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                lineHeight: 1.3,
                p: 2,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderColor: "#aaa",
                },
              }}
            >
              Update Leave Request
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateLeaveRequestForm;
