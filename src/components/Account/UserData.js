import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Stack, TextField } from "@mui/material";
import PasswordChange from './PasswordChange';

const UserData = () => {

    const userData = useSelector(state => state.auth.userData);

    return (
        <Stack spacing={1} sx={{ width: 320 }}>

            <TextField
                label='Username'
                value={userData.name}
                inputProps={{ readOnly: true }}
            />

            <TextField
                label='E-mail'
                value={userData.email}
                inputProps={{ readOnly: true }}
            />

            <TextField
                label='Group'
                value={userData.group}
                inputProps={{ readOnly: true }}
            />

            <PasswordChange />

        </Stack>
    )
};

export default UserData; 