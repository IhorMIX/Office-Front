import { useState } from "react";
import { ApprovalRequest, Status } from "../../types/Requests";
import { UserType } from "../../types/User";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Box,
  Paper,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../services/userService";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface TableProps {
  approvalRequests: ApprovalRequest[];
  onApprove: (id: number, comment: string) => void;
  onReject: (id: number, comment: string) => void;
  comments: { [key: number]: string };
  setComments: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
}

enum SortField {
  ID = "id",
  STATUS = "approvalRequestStatus",
  COMMENT = "comment",
  APPROVER_NAME = "approver.fullName",
  LEAVE_REQUEST_ID = "leaveRequest.id",
}

const ApprovalRequestTable: React.FC<TableProps> = ({
  approvalRequests,
  onApprove,
  onReject,
  comments,
  setComments,
}) => {
  const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const role = useSelector((state: RootState) => state.auth.role);
  const { data: user } = useGetCurrentUserQuery(null);

  const getFieldByPath = (obj: any, path: string): any => {
    return path.split(".").reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
      obj
    );
  };

  const sortedApprovalRequests = [...approvalRequests].sort((a, b) => {
    const aValue = getFieldByPath(a, sortBy);
    const bValue = getFieldByPath(b, sortBy);

    if (aValue === undefined || bValue === undefined) return 0;

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  const handleSort = (field: SortField) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const handleCommentChange = (id: number, comment: string) => {
    setComments((prev) => ({ ...prev, [id]: comment }));
  };

  const canEditOrDelete = (approvalRequest: ApprovalRequest): boolean => {
    if (!user) return false;
    return [UserType.Admin, UserType.HrManager, UserType.ProjectManager].includes(role as UserType);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        overflowX: "auto",
        width: "100%", 
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#424242", height: 48 }}>
            {[
              { label: "ID", field: SortField.ID },
              { label: "Approver", field: SortField.APPROVER_NAME },
              { label: "Status", field: SortField.STATUS },
              { label: "Leave Request Id", field: SortField.LEAVE_REQUEST_ID },
              { label: "Comment", field: SortField.COMMENT },
            ].map(({ label, field }) => (
              <TableCell
                key={field}
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  py: 1,
                  height: 48,
                }}
              >
                <TableSortLabel
                  active={sortBy === field}
                  direction={sortBy === field ? sortDirection : "asc"}
                  onClick={() => handleSort(field)}
                  sx={{
                    color: "#fff",
                    "&.Mui-active": { color: "#fff" },
                    "& .MuiTableSortLabel-icon": { color: "#fff !important" },
                  }}
                >
                  {label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.95rem",
                py: 1,
                height: 48,
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedApprovalRequests.map((approvalRequest, index) => {
            const editable =
              canEditOrDelete(approvalRequest) &&
              approvalRequest.approvalRequestStatus === Status.New;

            return (
              <TableRow
                key={approvalRequest.id}
                sx={{
                  backgroundColor: index % 2 === 1 ? "#424242" : "#333333",
                  "&:hover": { backgroundColor: "#555" },
                  height: 48,
                }}
              >
                <TableCell sx={{ color: "#fff", py: 1 }}>{approvalRequest.id}</TableCell>
                <TableCell sx={{ color: "#fff", py: 1 }}>
                  {approvalRequest.approver.fullName}
                </TableCell>
                <TableCell sx={{ color: "#fff", py: 1 }}>
                  {approvalRequest.approvalRequestStatus}
                </TableCell>
                <TableCell sx={{ color: "#fff", py: 1 }}>
                  <Link
                    to={`/leaverequest/${approvalRequest.leaveRequest.id}`}
                    style={{ color: "#fff", fontWeight: 500, textDecoration: "none" }}
                  >
                    {approvalRequest.leaveRequest.id}
                  </Link>
                </TableCell>
                <TableCell sx={{ color: "#fff", py: 1 }}>
                  {editable ? (
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Enter comment"
                      value={comments[approvalRequest.id] || ""}
                      onChange={(e) => handleCommentChange(approvalRequest.id, e.target.value)}
                      sx={{
                        input: { color: "#fff" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#fff" },
                          "&:hover fieldset": { borderColor: "#aaa" },
                          "&.Mui-focused fieldset": { borderColor: "#fff" },
                        },
                      }}
                    />
                  ) : (
                    approvalRequest.comment
                  )}
                </TableCell>
                <TableCell sx={{ color: "#fff", py: 1 }}>
                  {editable && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          minWidth: 90,
                          height: 36,
                          color: "#4caf50",
                          borderColor: "#4caf50",
                          fontWeight: "bold",
                          "&:hover": {
                            borderColor: "#66bb6a",
                            backgroundColor: "rgba(76,175,80,0.1)",
                          },
                        }}
                        onClick={() =>
                          onApprove(approvalRequest.id, comments[approvalRequest.id] || "")
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          minWidth: 90,
                          height: 36,
                          color: "#f44336",
                          borderColor: "#f44336",
                          fontWeight: "bold",
                          "&:hover": {
                            borderColor: "#ff7961",
                            backgroundColor: "rgba(244,67,54,0.1)",
                          },
                        }}
                        onClick={() =>
                          onReject(approvalRequest.id, comments[approvalRequest.id] || "")
                        }
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApprovalRequestTable;
