import { useState } from 'react';
import { writeNewGroupData, camelize } from "../../../lib/api";

import { Box, TextField, Button, Alert, Stack } from "@mui/material"

const NewGroupForm = () => {

    const [groupName, setGroupName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(null);

    const isAddButtonDisabled = groupName.trim('') === '';
    const alertMessage = error ? error : 'New group created';

    const groupNameChangeHandler = (event) => {
        setGroupName(event.target.value)
    };

    const closeAlertHandler = () => {
        setShowAlert(false);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setError(null);

        const newGroup = {
            id: camelize(groupName),
            name: groupName,
        };

        writeNewGroupData(newGroup, setError, setGroupName);
        setShowAlert(true);
    };

    return (
        <Stack direction='column' spacing={2}>

            <Box component='form' onSubmit={submitHandler} sx={{ display: 'flex' }}>

                <TextField
                    label={'New group name'}
                    variant="outlined"
                    value={groupName}
                    onChange={groupNameChangeHandler}
                    sx={{ width: 320, my: 1, mr: 3 }}
                />

                <Button
                    variant='contained'
                    type='submit'
                    size='large'
                    disabled={isAddButtonDisabled}
                    sx={{ my: "auto" }}
                >
                    Add
                </Button>

            </Box>

            {showAlert && <Alert severity={error ? 'error' : 'success'} onClose={closeAlertHandler}>
                {alertMessage}
            </Alert>}

        </Stack>
    )
};

export default NewGroupForm;

