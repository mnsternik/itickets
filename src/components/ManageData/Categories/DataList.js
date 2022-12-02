import { deleteCategory } from '../../../lib/api';

import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const DataList = (props) => {

    const { categoriesData } = props;

    const deleteCategoryHandler = (categoryId) => {
        deleteCategory(categoryId)
    };

    let categoriesList;
    if (categoriesData.length) {
        categoriesList = categoriesData.map(category => (
            <TableRow key={category.id}>
                <TableCell component="th" scope="row">
                    {category.name}
                </TableCell>
                <TableCell align="center">
                    {category.tasksAssigned ? category.tasksAssigned.length : 0}
                </TableCell>
                <TableCell align="right">
                    {<Button onClick={() => deleteCategoryHandler(category.id)}>Delete</Button>}
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
                        <TableCell sx={{ color: 'text.secondary' }} align="center">Tasks assigned</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }} align="right">Action</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {categoriesList}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default DataList; 