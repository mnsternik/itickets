import { useState } from 'react';
import { writeNewGroupData, camelize } from "../../../lib/api";

import { Box, TextField, Button, Alert, Stack, Checkbox, FormControlLabel } from "@mui/material"

const NewGroupForm = () => {

    const [groupName, setGroupName] = useState('');
    const [adminCheckboxChecked, setAdminCheckboxChecked] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(null);

    const isAddButtonDisabled = groupName.trim('') === '';
    const alertMessage = error ? error : 'New group created';

    const groupNameChangeHandler = (event) => {
        setGroupName(event.target.value)
    };

    const checkboxChangeHandler = (event) => {
        setAdminCheckboxChecked(checked => !checked);
    }

    const closeAlertHandler = () => {
        setShowAlert(false);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setError(null);

        const newGroup = {
            id: camelize(groupName),
            name: groupName,
            role: adminCheckboxChecked ? 'admin' : 'user',
        };

        writeNewGroupData(newGroup, setError, setGroupName);
        setShowAlert(true);
    };

    return (
        <Stack direction='column' spacing={2}>

            <Box component='form' onSubmit={submitHandler} sx={{ display: 'flex' }}>

                <Button
                    variant='contained'
                    type='submit'
                    size='large'
                    disabled={isAddButtonDisabled}
                    sx={{ my: "auto" }}
                >
                    Add
                </Button>

                <TextField
                    label={'New group name'}
                    variant="outlined"
                    value={groupName}
                    onChange={groupNameChangeHandler}
                    sx={{ width: 320, my: 1, mx: 3 }}
                />

                <FormControlLabel
                    label="Administrator role"
                    control={<Checkbox checked={adminCheckboxChecked} onChange={checkboxChangeHandler} />}
                />

            </Box>

            {showAlert && <Alert severity={error ? 'error' : 'success'} onClose={closeAlertHandler}>
                {alertMessage}
            </Alert>}

        </Stack>
    )
};

export default NewGroupForm;

