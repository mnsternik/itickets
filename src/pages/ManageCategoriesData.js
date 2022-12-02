import { useSelector } from 'react-redux';
import { fetchCategoriesData } from '../store/tasks';

import ManagableStringDataList from '../UI/ManagableStringDataList';

import { Paper, Divider, Typography } from '@mui/material';


const ManageCategories = () => {

    const categoriesData = useSelector(state => state.tasks.categoriesData);

    return (
        <Paper
            sx={{
                minHeight: '500px',
                p: 4,
                my: 4,
                display: 'flex',
                flexDirection: 'column',
            }}>

            <Typography variant='h5' sx={{ fontWeight: 500, mb: 2, p: 2 }}>
                Categories data manager
            </Typography>

            <Divider />

            <ManagableStringDataList
                title='Categories list'
                inputLabel='Category'
                listItems={categoriesData.categories}
                url={categoriesData.url}
                fetchDataFunc={fetchCategoriesData}
            />

        </Paper>
    );
};

export default ManageCategories;
