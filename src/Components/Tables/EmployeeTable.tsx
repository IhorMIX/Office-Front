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
    fontWeight: "bold",
    color: "rgb(0, 80, 184)",
  };

  return (
    <TableContainer>
      <Table sx={{ backgroundColor: "white", borderRadius: "10px" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={cellStyle}>
              <TableSortLabel
                active={sortBy === SortField.ID}
                direction={sortBy === SortField.ID ? sortDirection : "asc"}
                onClick={() => handleSort(SortField.ID)}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell sx={cellStyle}>
              <TableSortLabel
                active={sortBy === SortField.FULL_NAME}
                direction={sortBy === SortField.FULL_NAME ? sortDirection : "asc"}
                onClick={() => handleSort(SortField.FULL_NAME)}
              >
                Full Name
              </TableSortLabel>
            </TableCell>
            <TableCell sx={cellStyle}>
              <TableSortLabel
                active={sortBy === SortField.SUBDIVISION}
                direction={sortBy === SortField.SUBDIVISION ? sortDirection : "asc"}
                onClick={() => handleSort(SortField.SUBDIVISION)}
              >
                Subdivision
              </TableSortLabel>
            </TableCell>
            <TableCell sx={cellStyle}>
              <TableSortLabel
                active={sortBy === SortField.POSITION}
                direction={sortBy === SortField.POSITION ? sortDirection : "asc"}
                onClick={() => handleSort(SortField.POSITION)}
              >
                Position
              </TableSortLabel>
            </TableCell>
            <TableCell sx={cellStyle}>
              <TableSortLabel
                active={sortBy === SortField.STATUS}
                direction={sortBy === SortField.STATUS ? sortDirection : "asc"}
                onClick={() => handleSort(SortField.STATUS)}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell sx={cellStyle}>
              <TableSortLabel
                active={sortBy === SortField.OUT_OF_OFFICE_BALANCE}
                direction={sortBy === SortField.OUT_OF_OFFICE_BALANCE ? sortDirection : "asc"}
                onClick={() => handleSort(SortField.OUT_OF_OFFICE_BALANCE)}
              >
                Out Of Office Balance
              </TableSortLabel>
            </TableCell>
            <TableCell sx={cellStyle}>
              <TableSortLabel
                active={sortBy === SortField.HR_MANAGER}
                direction={sortBy === SortField.HR_MANAGER ? sortDirection : "asc"}
                onClick={() => handleSort(SortField.HR_MANAGER)}
              >
                HR Manager
              </TableSortLabel>
            </TableCell>
            <TableCell sx={cellStyle}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <Link to={`/employee/${employee.id}`}>{employee.id}</Link>
              </TableCell>
              <TableCell>{employee.fullName}</TableCell>
              <TableCell>{employee.subdivision?.name}</TableCell>
              <TableCell>{employee.position?.name}</TableCell>
              <TableCell>{employee.status ? "Active" : "Inactive"}</TableCell>
              <TableCell>{employee.outOfOfficeBalance}</TableCell>
              <TableCell>{employee.hrManager?.fullName}</TableCell>
              {canEditOrDelete(role) && (
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/update-employee/${employee.id}`}
                      sx={{
                        minWidth: 90,
                        height: 36,
                        textAlign: "center",
                        whiteSpace: "nowrap",
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
                          textAlign: "center",
                          whiteSpace: "nowrap",
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
                          textAlign: "center",
                          whiteSpace: "nowrap",
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
