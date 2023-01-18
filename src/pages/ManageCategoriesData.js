import { useEffect, useState } from 'react';
import { readCategoriesData } from '../lib/api';

import DataList from '../components/ManageData/Categories/DataList';
import NewGroup from '../components/ManageData/Categories/NewCategory';

import { Paper, Stack, Typography } from '@mui/material';


const ManageCategoriesData = () => {

    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        readCategoriesData(setCategoriesData);
    }, [])

    return (
        <Stack>
            <Paper sx={{ p: 4 }}>
                <Typography variant='h5' sx={{ fontWeight: 500, mb: 2, p: 2 }}>
                    Categories data manager
                </Typography>

                <DataList categoriesData={categoriesData} />

                <NewGroup />
            </Paper>
        </Stack>
    );
};

export default ManageCategoriesData;
