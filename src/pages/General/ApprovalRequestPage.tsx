import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import {
  useApproveRequestMutation,
  useRejectRequestMutation,
  useGetAllApprovalRequestQuery,
} from "../../services/requestsService";
import ApprovalRequestTable from "../../Components/Tables/ApprovalRequestTable";
import { ApprovalRequest, Status } from "../../types/Requests";

const ApprovalRequestsPage: React.FC = () => {
  const { data: fetchedRequests, isLoading } = useGetAllApprovalRequestQuery(null);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([]);
  const [approveRequest] = useApproveRequestMutation();
  const [rejectRequest] = useRejectRequestMutation();
  const [comments, setComments] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fetchedRequests) setApprovalRequests(fetchedRequests);
  }, [fetchedRequests]);

  const updateRequestStatus = (
    id: number,
    status: Status,
    comment: string
  ) => {
    setApprovalRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, approvalRequestStatus: status, comment } : req
      )
    );
    setComments((prev) => ({ ...prev, [id]: "" }));
  };

  const handleRequest = async (
    id: number,
    comment: string,
    action: "approve" | "reject"
  ) => {
    try {
      const mutation = action === "approve" ? approveRequest : rejectRequest;
      const newStatus =
        action === "approve"
          ? Status.Approved
          : Status.Rejected;

      await mutation({ id, comment }).unwrap();
      updateRequestStatus(id, newStatus, comment);
    } catch (err: any) {
      const message =
        err?.data?.startsWith?.("OutOfOffice.BLL.Exceptions.OutOfBalanceLimitException")
          ? "Employee doesn't have enough days on balance"
          : err?.data || err?.message || "Unknown error occurred";

      setError(message);
    }
  };

  const handleApprove = (id: number, comment: string) =>
    handleRequest(id, comment, "approve");

  const handleReject = (id: number, comment: string) =>
    handleRequest(id, comment, "reject");

  const handleCloseErrorModal = () => setError(null);

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg">
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
            Approval Requests
          </Typography>
        </Box>

        <ApprovalRequestTable
          approvalRequests={approvalRequests}
          onApprove={handleApprove}
          onReject={handleReject}
          comments={comments}
          setComments={setComments}
        />
      </Paper>

      <Dialog
        open={!!error}
        onClose={handleCloseErrorModal}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Error</DialogTitle>
        <DialogContent>
          <Typography>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorModal} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ApprovalRequestsPage;
