import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
} from "@mui/material";
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
    setLeaveRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 3,
          backgroundColor: "#f9fbfc",
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
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Leave Requests
          </Typography>

          {role === UserType.Employee && (
            <Button
              component={Link}
              to="/create-leave-request"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              + Create Leave Request
            </Button>
          )}
        </Box>

        <LeaveRequestTable
          leaveRequests={leaveRequests}
          onDelete={handleDelete}
        />
      </Paper>
    </Container>
  );
};

export default LeaveRequestsPage;
