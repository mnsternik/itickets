import { useEffect, useState } from 'react';
import { readAllGroupsData } from '../lib/api';

import DataList from '../components/ManageData/Groups/DataList';
import NewGroup from '../components/ManageData/Groups/NewGroup';

import { Paper, Typography } from '@mui/material';


const ManageGroupsData = () => {

    const [groupsData, setGroupsData] = useState([]);

    useEffect(() => {
        readAllGroupsData(setGroupsData);
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
                Groups data manager
            </Typography>

            <DataList groupsData={groupsData} />

            <NewGroup />

        </Paper>
    );
};

export default ManageGroupsData;
