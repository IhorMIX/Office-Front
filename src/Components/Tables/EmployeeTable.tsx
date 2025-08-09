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
} from "@mui/material";
import { Employee } from "../../types/Employee";

interface TableProps {
  employees: Employee[];
  onEdit: (id: number) => void;
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

const EmployeeTable: React.FC<TableProps> = ({ employees, onEdit, onDelete }) => {
  const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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

  const cellStyle = {
    fontWeight: "bold",
    color: "rgb(0, 80, 184)",
  };

  return (
    <TableContainer>
      <Table sx={{ backgroundColor: "white", borderRadius: "10px" }}>
        <TableHead>
          <TableRow>
            {[
              { label: "ID", field: SortField.ID },
              { label: "Full Name", field: SortField.FULL_NAME },
              { label: "Subdivision", field: SortField.SUBDIVISION },
              { label: "Position", field: SortField.POSITION },
              { label: "Status", field: SortField.STATUS },
              { label: "Out Of Office Balance", field: SortField.OUT_OF_OFFICE_BALANCE },
              { label: "HR Manager", field: SortField.HR_MANAGER },
            ].map(({ label, field }) => (
              <TableCell key={field} sx={cellStyle}>
                <TableSortLabel
                  active={sortBy === field}
                  direction={sortBy === field ? sortDirection : "asc"}
                  onClick={() => handleSort(field)}
                >
                  {label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell sx={cellStyle}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.fullName}</TableCell>
              <TableCell>{employee.subdivision?.name}</TableCell>
              <TableCell>{employee.position?.name}</TableCell>
              <TableCell>{employee.status ? "Active" : "Inactive"}</TableCell>
              <TableCell>{employee.outOfOfficeBalance}</TableCell>
              <TableCell>{employee.hrManager?.fullName}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onEdit(employee.id)}
                    sx={{ minWidth: 90, height: 36, textAlign: "center", whiteSpace: "nowrap" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => onDelete(employee.id)}
                    sx={{ minWidth: 90, height: 36, textAlign: "center", whiteSpace: "nowrap" }}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
