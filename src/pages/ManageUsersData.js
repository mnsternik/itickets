import { useSelector } from 'react-redux';
import { fetchGroupsData } from '../store/users';

import ManagableStringDataList from '../UI/ManagableStringDataList';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


const ManageUsersData = () => {

    const groupsData = useSelector(state => state.users.groupsData);

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
                User data manager
            </Typography>

            <ManagableStringDataList
                title='Groups list'
                inputLabel='Group'
                listItems={groupsData.groups}
                url={groupsData.url}
                fetchDataFunc={fetchGroupsData}
            />

        </Paper>
    );
};

export default ManageUsersData;
