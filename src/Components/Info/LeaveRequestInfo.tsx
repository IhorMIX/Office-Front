import React from "react";
import { Paper, Typography, Box, Divider } from "@mui/material";
import { useGetLeaveRequestQuery } from "../../services/requestsService";

interface Props {
  id: string;
}

const LeaveRequestInfo: React.FC<Props> = ({ id }) => {
  const { data: request, isLoading } = useGetLeaveRequestQuery(Number(id));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!request) return <Typography>Leave request not found</Typography>;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mt: 3,
        backgroundColor: "#424242",
        color: "#fff",
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#fff" }}
      >
        Leave Request Details — ID: {request.id}
      </Typography>

      <Box mb={2}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Employee:</strong> {request.employee.fullName}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Absence Reason:</strong>{" "}
          {request.absenceReason.reasonDescription}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Start Date:</strong>{" "}
          {new Date(request.startDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>End Date:</strong>{" "}
          {new Date(request.endDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Status:</strong> {request.status}
        </Typography>
        <Typography variant="body1">
          <strong>Comment:</strong> {request.comment || "—"}
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: "#555" }} />
    </Paper>
  );
};

export default LeaveRequestInfo;
