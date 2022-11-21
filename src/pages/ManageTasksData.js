import { useSelector } from 'react-redux';
import { fetchCategoriesData } from '../store/tasks';

import ManagableStringDataList from '../UI/ManagableStringDataList';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ManageTasksData = () => {

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

            <Typography variant='h5' sx={{ textAlign: 'center' }}>
                Task data manager
            </Typography>


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

export default ManageTasksData;
