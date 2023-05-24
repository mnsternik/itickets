import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const DataTable = (props) => {

    const {
        tableColumns,
        tableData,
        onDeleteItem,
    } = props;

    const tableHeadContent = tableColumns.map(column => (
        <TableCell sx={{ color: 'text.secondary' }}>{column}</TableCell>)
    );

    const tableBodyContent = tableData.map(item => {
        let membersLength;
        if (item.members) {
            membersLength = Object.keys(item.members).length;
        }
        return (
            <TableRow key={item.name}>
                <TableCell>
                    {item.name}
                </TableCell>
                {item.role && <TableCell>
                    {item.role}
                </TableCell>}
                <TableCell>
                    {membersLength}
                </TableCell>
                <TableCell>
                    <Button onClick={() => onDeleteItem(item.id)}>Delete</Button>
                </TableCell>
            </TableRow>
        )
    });

    return (
        <TableContainer>
            <Table sx={{ minWidth: 450, my: 4, px: 2 }}>
                <TableHead>
                    <TableRow >
                        {tableHeadContent}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableBodyContent}
                </TableBody>
            </Table>
        </TableContainer>
    )
};


export default DataTable;

{/* <TableRow key={item.name}>
<TableCell component="th" scope="row">
    {item.name}
</TableCell>
<TableCell component="th" scope="row">
    {group.role}
</TableCell>
<TableCell align="center">
    {group.members ? groupMembersAmount : 0}
</TableCell>
<TableCell align="right">
    {<Button onClick={() => onDeleteItem(item.id)}>Delete</Button>}
</TableCell>
</TableRow>
) */}