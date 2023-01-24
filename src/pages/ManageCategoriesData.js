import { useEffect, useState } from 'react';
import { readCategoriesData } from '../lib/api';

import CategoriesList from '../components/ManageData/Categories/CategoriesList';
import NewCategoryForm from '../components/ManageData/Categories/NewCategoryForm';

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

                <CategoriesList categoriesData={categoriesData} />

                <NewCategoryForm />
            </Paper>
        </Stack>
    );
};

export default ManageCategoriesData;
