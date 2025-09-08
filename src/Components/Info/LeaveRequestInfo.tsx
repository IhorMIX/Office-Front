import React from "react";
import { Paper, Typography, Box, Divider, Container } from "@mui/material";
import { useGetLeaveRequestQuery } from "../../services/requestsService";

interface Props {
  id: string;
}

const LeaveRequestInfo: React.FC<Props> = ({ id }) => {
  const { data: request, isLoading } = useGetLeaveRequestQuery(Number(id));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!request) return <Typography>Leave request not found</Typography>;

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
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#fff",
            textAlign: "normal",
            wordBreak: "break-word",
            lineHeight: 1.3,
          }}
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
      </Paper>
    </Container>
  );
};

export default LeaveRequestInfo;
