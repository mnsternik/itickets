import { useState, useEffect } from 'react';
import { readAllGroupsData, readAllUsersData } from '../lib/api';

import AddUserForm from '../components/ManageData/Users/AddUserForm';
import EditUserForm from '../components/ManageData/Users/EditUserForm';

import { Divider, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const ManageUsersData = () => {

    const [groups, setGroups] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const groupsNamesArr = groups.map(group => group.name);

    useEffect(() => {
        readAllGroupsData(setGroups);
        readAllUsersData(setAllUsers);
    }, [])

    return (

        <Paper sx={{ p: 4 }}>
            <Stack spacing={5}>

                <Typography variant='h5' sx={{ fontWeight: 500, mb: 2, p: 2 }}>
                    Users data manager
                </Typography>

                <Stack spacing={3} >

                    <AddUserForm
                        groups={groupsNamesArr}
                    />

                    <Divider />

                    <EditUserForm
                        allUsers={allUsers}
                        groups={groupsNamesArr}
                    />

                </Stack>

            </Stack>
        </Paper>
    );
};

export default ManageUsersData;
