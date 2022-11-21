import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


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

    const rowClickHandler = (taskId) => {
        navigate(`/tasks/${taskId}`);
    };

    let message;
    if (props.error) {
        message = 'Failed to fetched content.';
    }
    else if (!props.tasks.length && !props.error) {
        message = 'There is no tasks yet.';
    }

    const tableContent = props.tasks.map((task) => (
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

    const tableHead = props.labels.map((label) => (
        <StyledTableCell align="center" key={label}> {label} </StyledTableCell>
    ));


    return (
        <>
            <TableContainer component={Paper} sx={{ my: 4 }}>
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

            <Typography variant='subtitle2' sx={{ textAlign: 'center' }}>
                {message}
            </Typography>
        </>

    );
};

export default TasksTable;
