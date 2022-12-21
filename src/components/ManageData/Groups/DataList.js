import { deleteGroup } from '../../../lib/api';

import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const DataList = (props) => {

    const { groupsData } = props;

    const deleteGroupHandler = (groupId) => {
        deleteGroup(groupId)
    };

    let groupsList;
    if (groupsData.length) {
        groupsList = groupsData.map(group => (
            <TableRow key={group.name}>
                <TableCell component="th" scope="row">
                    {group.name}
                </TableCell>
                <TableCell align="center">
                    {group.members ? group.members.length : 0}
                </TableCell>
                <TableCell align="right">
                    {<Button onClick={() => deleteGroupHandler(group.id)}>Delete</Button>}
                </TableCell>
            </TableRow>
        ))
    }

    return (
        <TableContainer>
            <Table sx={{ minWidth: 450, my: 4, px: 2 }}>
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ color: 'text.secondary' }}>Name</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }} align="center">Members</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }} align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groupsList}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default DataList; 