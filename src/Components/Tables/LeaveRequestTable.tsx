import { useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
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
  Box,
  Paper,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { LeaveRequest } from "../../types/Requests";

interface TableProps {
  leaveRequests: LeaveRequest[];
  onDelete: (id: number) => void;
}

enum SortField {
  ID = "id",
  EMPLOYEE_NAME = "employee.fullName",
  START_DATE = "startDate",
  END_DATE = "endDate",
  APPROVAL_STATUS = "approvalRequest.Status",
  REASON = "reason",
  COMMENT = "comment",
  STATUS = "status",
}

const LeaveRequestTable: React.FC<TableProps> = ({ leaveRequests, onDelete }) => {
  const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const role = useSelector((state: RootState) => state.auth.role);

  const getFieldByPath = (obj: any, path: string): any =>
    path.split(".").reduce((acc, key) => acc?.[key], obj);

  const sortedLeaveRequests = [...leaveRequests].sort((a, b) => {
    const aValue = getFieldByPath(a, sortBy);
    const bValue = getFieldByPath(b, sortBy);
    if (aValue === undefined || bValue === undefined) return 0;
    return sortDirection === "asc" ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1;
  });

  const handleSort = (field: SortField) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const canEditOrDelete = (role: string) =>
    role === UserType.Admin || role === UserType.Employee;

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, backgroundColor: "#424242" }}>
      <Table>
        <TableHead>
          <TableRow>
            {[
              { label: "ID", field: SortField.ID },
              { label: "Employee Name", field: SortField.EMPLOYEE_NAME },
              { label: "Start Date", field: SortField.START_DATE },
              { label: "End Date", field: SortField.END_DATE },
              { label: "Reason", field: SortField.REASON },
              { label: "Comment", field: SortField.COMMENT },
              { label: "Status", field: SortField.STATUS },
              { label: "Approval Status", field: SortField.APPROVAL_STATUS },
            ].map(({ field, label }) => (
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
            {canEditOrDelete(role) && (
              <TableCell sx={{ color: "#fff", fontWeight: "bold", fontSize: "0.95rem", py: 1, height: 48 }}>
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedLeaveRequests.map((leaveRequest, index) => (
            <TableRow
              key={leaveRequest.id}
              sx={{
                backgroundColor: index % 2 === 1 ? "#424242" : "#333333",
                "&:hover": { backgroundColor: "#555" },
                height: 48,
              }}
            >
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                <Link to={`/leaverequest/${leaveRequest.id}`} style={{ color: "#fff", textDecoration: "none" }}>
                  {leaveRequest.id}
                </Link>
              </TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>{leaveRequest.employee.fullName}</TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>{new Date(leaveRequest.startDate).toLocaleDateString()}</TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>{new Date(leaveRequest.endDate).toLocaleDateString()}</TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>{leaveRequest.absenceReason.reasonDescription}</TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>{leaveRequest.comment}</TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>{leaveRequest.status}</TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>{leaveRequest.approvalRequest?.approvalRequestStatus}</TableCell>

              {canEditOrDelete(role) && (
                <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/update-leave-request/${leaveRequest.id}`}
                      disabled={
                        leaveRequest.approvalRequest?.approvalRequestStatus === "Rejected" ||
                        leaveRequest.approvalRequest?.approvalRequestStatus === "Approved"
                      }
                      sx={{
                        minWidth: 90,
                        height: 36,
                        color: "#fff",
                        borderColor: "#fff",
                        fontWeight: "bold",
                        "&:hover": {
                          borderColor: "#aaa",
                          backgroundColor: "rgba(255,255,255,0.08)",
                        },
                        "&.Mui-disabled": {
                          color: "rgba(255,255,255,0.5)",
                          borderColor: "rgba(255,255,255,0.3)",
                          backgroundColor: "rgba(255,255,255,0.05)",
                        },
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => onDelete(leaveRequest.id)}
                      disabled={
                        leaveRequest.approvalRequest?.approvalRequestStatus === "Rejected" ||
                        leaveRequest.approvalRequest?.approvalRequestStatus === "Approved"
                      }
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
                        "&.Mui-disabled": {
                          color: "rgba(244,67,54,0.5)",
                          borderColor: "rgba(244,67,54,0.3)",
                          backgroundColor: "rgba(244,67,54,0.05)",
                        },
                      }}
                    >
                      Delete
                    </Button>

                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaveRequestTable;
