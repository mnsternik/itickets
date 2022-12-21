import { useState, useEffect } from 'react';
import { readGroupsData, writeNewUserData } from '../lib/api';

import AddUserForm from '../components/ManageData/Users/AddUserForm';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


const ManageUsersData = () => {

    const [groups, setGroups] = useState([]);

    const groupsNamesArr = groups.map(group => group.name);

    useEffect(() => {
        readGroupsData(setGroups);
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
                Users data manager
            </Typography>

            <AddUserForm
                groups={groupsNamesArr}
            />

        </Paper>
    );
};

export default ManageUsersData;
