import { useState } from 'react';
import { writeNewGroupData } from "../../../lib/api";

import { Box, TextField, Button, Alert } from "@mui/material"
import ModalAlert from '../../../UI/ModalAlert';


const NewGroup = () => {

    const [groupName, setGroupName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(null);

    const isAddButtonDisabled = groupName.trim('') === '';
    const alertMessage = showAlert ?
        'New group created.' : 'Something went wrong. Try again later'

    const groupNameChangeHandler = (event) => {
        setGroupName(event.target.value)
    };

    const closeAlertHandler = () => {
        setShowAlert(false);
    };

    const addNewGroupHandler = () => {
        const newGroupId = groupName
            .split(' ')
            .map((word, i) => i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`)
            .join('');

        const newGroup = {
            id: newGroupId,
            name: groupName,
        };

        //add set error ??
        writeNewGroupData(newGroup);

        setShowAlert(true);
        setGroupName('');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <TextField
                label={'New group name'}
                variant="outlined"
                value={groupName}
                onChange={groupNameChangeHandler}
                sx={{ width: 320, my: 1, mr: 3 }}
            />

            <Button
                variant="contained"
                disabled={isAddButtonDisabled}
                onClick={addNewGroupHandler}
                sx={{
                    width: 80,
                    height: 40,
                    my: "auto"
                }}
            >
                Add
            </Button>

            {showAlert && <ModalAlert
                type={error ? 'error' : 'success'}
                onClose={closeAlertHandler}
                message={alertMessage}
            />}

        </Box>
    )
};

export default NewGroup;

