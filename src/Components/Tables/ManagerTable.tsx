import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, Button } from '@mui/material';
import { BaseEmployee } from '../../types/Employee';

interface TableProps {
    managers: BaseEmployee[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

// Перечисление для полей, по которым можно сортировать
enum SortField {
    ID = 'id',
    FULL_NAME = 'fullName'
}

const ManagerTable: React.FC<TableProps> = ({ managers, onEdit, onDelete }) => {
    const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Вспомогательная функция для получения значения поля по пути
    const getFieldByPath = (obj: any, path: string): any => {
        const keys = path.split('.');
        return keys.reduce((acc, key) => acc[key], obj);
    };

    // Функция для сортировки сотрудников
    const sortedEmployees = [...managers].sort((a, b) => {
        const aValue = getFieldByPath(a, sortBy);
        const bValue = getFieldByPath(b, sortBy);

        // Определение направления сортировки
        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
    });

    // Обработчик клика по заголовку столбца для сортировки
    const handleSort = (field: SortField) => {
        if (field === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
    };

    return (
        <TableContainer>
            <Table sx={{backgroundColor:"white", borderRadius:"10px"}}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.ID}
                                direction={sortBy === SortField.ID ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.ID)}
                            >
                                ID
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.FULL_NAME}
                                direction={sortBy === SortField.FULL_NAME ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.FULL_NAME)}
                            >
                                Full Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.id}</TableCell>
                            <TableCell>{employee.fullName}</TableCell>
                            <TableCell>
                                <Button onClick={() => onEdit(employee.id)}>Edit</Button>
                                <Button sx={{color:"red"}} onClick={() => onDelete(employee.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ManagerTable;