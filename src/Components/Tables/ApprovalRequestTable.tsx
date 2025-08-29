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
  LEAVE_REQUEST_EMPLOYEE = "leaveRequest.employee.fullName",
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

    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  const handleSort = (field: SortField): void => {
    if (field === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const handleCommentChange = (id: number, comment: string): void => {
    setComments((prev) => ({ ...prev, [id]: comment }));
  };

  const canEditOrDelete = (approvalRequest: ApprovalRequest): boolean => {
    if (!user) return false;

    if ([UserType.Admin, UserType.HrManager, UserType.ProjectManager].includes(role as UserType)) {
      return true;
    }

    return false;
  };

  return (
    <TableContainer>
      <Table sx={{ backgroundColor: "white", borderRadius: "10px" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "rgb(0, 80, 184)" }}>
              <TableSortLabel
                active={sortBy === SortField.ID}
                direction={sortBy === SortField.ID ? sortDirection : "asc"}
                onClick={() => handleSort(SortField.ID)}
              >
                ID
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ fontWeight: "bold", color: "rgb(0, 80, 184)" }}>
              Approver
            </TableCell>

            <TableCell sx={{ fontWeight: "bold", color: "rgb(0, 80, 184)" }}>
              Status
            </TableCell>

            <TableCell sx={{ fontWeight: "bold", color: "rgb(0, 80, 184)" }}>
              Leave Request Id
            </TableCell>

            <TableCell sx={{ fontWeight: "bold", color: "rgb(0, 80, 184)" }}>Comment</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "rgb(0, 80, 184)" }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedApprovalRequests.map((approvalRequest) => {
            const editable =
              canEditOrDelete(approvalRequest) &&
              approvalRequest.approvalRequestStatus === Status.New;

            return (
              <TableRow key={approvalRequest.id}>
                <TableCell>{approvalRequest.id}</TableCell>
                <TableCell>{approvalRequest.approver.fullName}</TableCell>
                <TableCell>{approvalRequest.approvalRequestStatus}</TableCell>
                <TableCell>
                  <Link to={`/leaverequest/${approvalRequest.leaveRequest.id}`}>
                    {approvalRequest.leaveRequest.id}
                  </Link>
                </TableCell>

                <TableCell>
                  {editable ? (
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Enter comment"
                      value={comments[approvalRequest.id] || ""}
                      onChange={(e) => handleCommentChange(approvalRequest.id, e.target.value)}
                    />
                  ) : (
                    approvalRequest.comment
                  )}
                </TableCell>

                <TableCell>
                  {editable && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        sx={{ minWidth: 90, height: 36 }}
                        onClick={() => onApprove(approvalRequest.id, comments[approvalRequest.id] || "")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{ minWidth: 90, height: 36 }}
                        onClick={() => onReject(approvalRequest.id, comments[approvalRequest.id] || "")}
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
