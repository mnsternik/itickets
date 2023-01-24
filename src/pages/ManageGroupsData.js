import { useEffect, useState } from 'react';
import { readAllGroupsData } from '../lib/api';

import GroupsList from '../components/ManageData/Groups/GroupsList';
import NewGroupForm from '../components/ManageData/Groups/NewGroupForm';

import { Paper, Typography, Stack } from '@mui/material';


const ManageGroupsData = () => {

    const [groupsData, setGroupsData] = useState([]);

    useEffect(() => {
        readAllGroupsData(setGroupsData);
    }, [])

    return (
        <Stack>
            <Paper sx={{ p: 4 }}>

                <Typography variant='h5' sx={{ fontWeight: 500, mb: 2, p: 2 }}>
                    Groups data manager
                </Typography>

                <GroupsList groupsData={groupsData} />

                <NewGroupForm />

            </Paper>
        </Stack>
    );
};

export default ManageGroupsData;
