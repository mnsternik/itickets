import { useState } from 'react';

import { updateUserPassword } from '../../lib/api';

import { Stack, TextField, Box, Button, Alert } from "@mui/material";

const PasswordChange = () => {

    const [newPassword, setNewPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(null);


    const [isFormDisabled, setIsFormDisabled] = useState(true);

    const isPasswordValid = newPassword === repeatedPassword && newPassword.length > 7;
    const isSaveButtonActive = isPasswordValid && !isFormDisabled;

    const toggleForm = () => {
        setIsFormDisabled(isDisabled => !isDisabled);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        updateUserPassword(newPassword, setError, setShowAlert);
    };

    return (
        <Box>

            <Stack
                component='form'
                spacing={1}
                sx={{ width: 320 }}
                onSubmit={submitHandler}
            >

                <TextField
                    label='New password'
                    type='password'
                    value={newPassword}
                    disabled={isFormDisabled}
                    onChange={e => setNewPassword(e.target.value)}
                />

                <TextField
                    label='Repeat new password'
                    type='password'
                    value={repeatedPassword}
                    disabled={isFormDisabled}
                    onChange={e => setRepeatedPassword(e.target.value)}
                />

                <Stack direction='row' spacing={1}>
                    <Button
                        onClick={toggleForm}
                        size='large'
                        type='button'
                    >
                        {isFormDisabled ? 'Change password' : 'Cancel'}
                    </Button>

                    <Button
                        variant='contained'
                        disabled={!isSaveButtonActive}
                        size='large'
                        type='submit'

                    >
                        Save
                    </Button>

                </Stack>

                {showAlert && <Alert severity={error ? 'error' : 'success'} onClose={() => setShowAlert(show => !show)}>
                    {error ? 'Something went wrong: ' + error : 'Password updated successfuly'}
                </Alert>}

            </Stack>

        </Box>
    )
};

export default PasswordChange; 