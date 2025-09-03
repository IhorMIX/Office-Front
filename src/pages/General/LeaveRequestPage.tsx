import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useDelLeaveRequestMutation, useGetAllLeaveRequestsQuery } from "../../services/requestsService";
import { RootState } from "../../redux/store";
import { LeaveRequest } from "../../types/Requests";
import { UserType } from "../../types/User";
import LeaveRequestTable from "../../Components/Tables/LeaveRequestTable";

const LeaveRequestsPage: React.FC = () => {
  const { data: leaveRequestList } = useGetAllLeaveRequestsQuery(null);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [deleteLeaveRequest] = useDelLeaveRequestMutation();
  const role = useSelector((state: RootState) => state.auth.role);

  useEffect(() => {
    if (leaveRequestList) {
      setLeaveRequests(leaveRequestList);
    }
  }, [leaveRequestList]);

  const handleDelete = async (id: number) => {
    try {
      await deleteLeaveRequest(id).unwrap();
      setLeaveRequests((prev) => prev.filter((req) => req.id !== id));
      console.log(`Leave Request deleted successfully`);
    } catch (error: any) {
      console.error("Delete failed:", error?.data || error?.message);
    }
  };

  const buttonStyle = {
    backgroundColor: "#424242",
    color: "#fff",
    minHeight: 36,
    borderRadius: 2,
    textTransform: "none",
    "&:hover": { backgroundColor: "#555", color: "#fff" },
    "&:active": { transform: "scale(0.97)" },
  };

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 3,
          backgroundColor: "#2F2F2F",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              whiteSpace: "normal",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            Leave Requests
          </Typography>

          {role === UserType.Employee && (
            <Button
              component={Link}
              to="/create-leave-request"
              variant="contained"
              sx={{
                ...buttonStyle,
                whiteSpace: "normal",
                overflowWrap: "break-word",
                wordBreak: "break-all",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              + Create Leave Request
            </Button>
          )}
        </Box>

        <LeaveRequestTable leaveRequests={leaveRequests} onDelete={handleDelete} />
      </Paper>
    </Container>
  );
};

export default LeaveRequestsPage;
