import { useNavigate } from 'react-router-dom';
import { camelize } from '../../lib/api';

import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
    // hide last border
    '&:last-child td, &:last-child th': { border: 0, },
}));

const TasksTable = (props) => {

    const navigate = useNavigate();

    const {
        tasks,
        labels,
        sortingOrder,
        sortingItem,
        error,
        noTasksMessage
    } = props;

    let sortedTasks = [];

    const sortTasks = (tasks, sortingOrder, sortingItem) => {
        const sortedTasks = structuredClone(tasks);
        const sortingKey = camelize(sortingItem);
        const sortingKeyDataType = typeof tasks[0][sortingKey];

        if (sortingKeyDataType === 'string') {
            sortedTasks.sort((taskA, taskB) => taskA[sortingKey].localeCompare(taskB[sortingKey]));
        }
        else if (sortingKeyDataType === 'number') {
            sortedTasks.sort((taskA, taskB) => taskA[sortingKey] - taskB[sortingKey])
        }
        else if (sortingItem === 'Modification date' || sortingItem === 'Create date') {
            sortedTasks.sort((taskA, taskB) => Date.parse(taskA[sortingKey]) - Date.parse(taskB[sortingKey]))
        }

        return sortingOrder === 'Ascending' ?
            sortedTasks : sortedTasks.reverse()
    };


    const rowClickHandler = (taskId) => {
        navigate(`/tasks/${taskId}`);
    };

    let message;
    if (error) {
        message = 'Failed to fetched content.';
    }
    else if (!tasks.length && !error) {
        message = noTasksMessage
    } else {
        sortedTasks = sortTasks(tasks, sortingOrder, sortingItem);
    }

    const tableContent = sortedTasks.map((task) => (
        <StyledTableRow
            key={task.id}
            onClick={() => rowClickHandler(task.id)}
            sx={{
                textDecoration: 'none',
                cursor: 'pointer'
            }}
        >
            <StyledTableCell scope="row">{task.title}</StyledTableCell>
            <StyledTableCell align="center">{task.priority}</StyledTableCell>
            <StyledTableCell align="center">{task.modificationDate}</StyledTableCell>
            <StyledTableCell align="center">{task.status}</StyledTableCell>
            <StyledTableCell align="center">{task.currentUser}</StyledTableCell>
            <StyledTableCell align="center">{task.currentGroup}</StyledTableCell>
        </StyledTableRow>
    ));

    const tableHead = labels.map((label) => (
        <StyledTableCell align="center" key={label}> {label} </StyledTableCell>
    ));


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {tableHead}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableContent}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant='subtitle2' sx={{ textAlign: 'center', mt: 2 }}>
                {message}
            </Typography>
        </>
    );
};

export default TasksTable;
