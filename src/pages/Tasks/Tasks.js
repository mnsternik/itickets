import React, { useState, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    useEffect(() => {
        const transformFetchedData = (data) => {
            const tasks = [];
            for (let taskKey in data) {
                tasks.push(data[taskKey]);
            }
            setTasks(tasks);
        };

        fetchTasks({
            url: 'https://iticket-fd059-default-rtdb.firebaseio.com/tasks.json'
        }, transformFetchedData)
    }, [fetchTasks]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="center">Priority</StyledTableCell>
                        <StyledTableCell align="center">Create Date</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Current user</StyledTableCell>
                        <StyledTableCell align="center">Current group</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <StyledTableRow key={task.id}>
                            <StyledTableCell component="th" scope="row">
                                {task.title}
                            </StyledTableCell>
                            <StyledTableCell align="center">{task.priority}</StyledTableCell>
                            <StyledTableCell align="center">{task.createDate}</StyledTableCell>
                            <StyledTableCell align="center">{task.status}</StyledTableCell>
                            <StyledTableCell align="center">{task.currentUser}</StyledTableCell>
                            <StyledTableCell align="center">{task.currentGroup}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Tasks;