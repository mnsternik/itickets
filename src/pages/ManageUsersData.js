import { useState, useEffect } from 'react';
import { readAllGroupsData, readAllUsersData } from '../lib/api';

import EditUserForm from '../components/ManageData/Users/EditUserForm';

import { Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const ManageUsersData = () => {

    const [allGroups, setAllGroups] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const groupsNamesArr = allGroups.map(group => group.name);

    useEffect(() => {
        readAllGroupsData(setAllGroups);
        readAllUsersData(setAllUsers);
    }, [])

    return (

        <Paper sx={{ p: 4 }}>
            <Stack spacing={5}>

                <Typography variant='h5' sx={{ fontWeight: 500, mb: 2, p: 2 }}>
                    Users data manager
                </Typography>

                <EditUserForm
                    allUsers={allUsers}
                    groups={groupsNamesArr}
                />

            </Stack>
        </Paper>
    );
};

export default ManageUsersData;
