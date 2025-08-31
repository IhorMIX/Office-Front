import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableSortLabel,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { Employee } from "../../types/Employee";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserType } from "../../types/User";
import { Link } from "react-router-dom";

interface TableProps {
  employees: Employee[];
  onDeactivate: (id: number) => void;
  onDelete: (id: number) => void;
}

enum SortField {
  ID = "id",
  FULL_NAME = "fullName",
  SUBDIVISION = "subdivision.name",
  POSITION = "position.name",
  STATUS = "status",
  OUT_OF_OFFICE_BALANCE = "outOfOfficeBalance",
  HR_MANAGER = "hrManager.fullName",
}

const EmployeeTable: React.FC<TableProps> = ({ employees, onDeactivate, onDelete }) => {
  const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const role = useSelector((state: RootState) => state.auth.role);

  const getFieldByPath = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  const sortedEmployees = [...employees].sort((a, b) => {
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
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const canEditOrDelete = (role: string) => {
    return role === UserType.Admin || role === UserType.HrManager;
  };

  const cellStyle = {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "0.95rem",
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Table>

        <TableHead>
          <TableRow sx={{ backgroundColor: "#424242" }}>
            {[
              { field: SortField.ID, label: "ID" },
              { field: SortField.FULL_NAME, label: "Full Name" },
              { field: SortField.SUBDIVISION, label: "Subdivision" },
              { field: SortField.POSITION, label: "Position" },
              { field: SortField.STATUS, label: "Status" },
              { field: SortField.OUT_OF_OFFICE_BALANCE, label: "Out Of Office Balance" },
              { field: SortField.HR_MANAGER, label: "HR Manager" },
            ].map(({ field, label }) => (
              <TableCell key={field} sx={cellStyle}>
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
            <TableCell sx={cellStyle}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedEmployees.map((employee, index) => (
            <TableRow
              key={employee.id}
              sx={{
                backgroundColor: index % 2 === 0 ? "#424242" : "#333333",
                "&:hover": { backgroundColor: "#555" },
              }}
            >
              <TableCell sx={{ color: "#fff" }}>
                <Link
                  to={`/employee/${employee.id}`}
                  style={{ color: "#fff", fontWeight: 500, textDecoration: "none" }}
                >
                  {employee.id}
                </Link>
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>{employee.fullName}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{employee.subdivision?.name}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{employee.position?.name}</TableCell>
              <TableCell sx={{ color: "#fff" }}>
                {employee.status ? "Active" : "Inactive"}
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>{employee.outOfOfficeBalance}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{employee.hrManager?.fullName}</TableCell>

              {canEditOrDelete(role) && (
                <TableCell sx={{ color: "#fff" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/update-employee/${employee.id}`}
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
                      }}
                    >
                      Edit
                    </Button>

                    {employee.status ? (
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => onDeactivate(employee.id)}
                        sx={{
                          minWidth: 90,
                          height: 36,
                          color: "#fff",
                          borderColor: "#f44336",
                          fontWeight: "bold",
                          "&:hover": {
                            borderColor: "#ff7961",
                            backgroundColor: "rgba(244,67,54,0.1)",
                          },
                        }}
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => onDelete(employee.id)}
                        sx={{
                          minWidth: 90,
                          height: 36,
                          color: "error",
                          borderColor: "#f44336",
                          fontWeight: "bold",
                          "&:hover": {
                            borderColor: "#ff7961",
                            backgroundColor: "rgba(244,67,54,0.1)",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    )}
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

export default EmployeeTable;
