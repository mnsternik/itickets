import { useEffect, useState } from 'react';
import { readCategoriesData } from '../lib/api';

import DataList from '../components/ManageData/Categories/DataList';
import NewGroup from '../components/ManageData/Categories/NewCategory';

import { Paper, Divider, Typography } from '@mui/material';


const ManageCategoriesData = () => {

    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        readCategoriesData(setCategoriesData);
    }, [])

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

            <DataList categoriesData={categoriesData} />

            <NewGroup />

        </Paper>
    );
};

export default ManageCategoriesData;
