import { useEffect, useState } from 'react';
import { readGroupsData } from '../lib/api';

import DataList from '../components/ManageData/Groups/DataList';
import NewGroup from '../components/ManageData/Groups/NewGroup';

import { Paper, Divider, Typography } from '@mui/material';


const ManageGroupsData = () => {

    const [groupsData, setGroupsData] = useState([]);

    useEffect(() => {
        readGroupsData(setGroupsData);
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

            <Divider />

            <DataList groupsData={groupsData} />

            <NewGroup />

        </Paper>
    );
};

export default ManageGroupsData;
