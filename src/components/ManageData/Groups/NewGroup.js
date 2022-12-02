import { useState } from 'react';
import { writeNewGroupData } from "../../../lib/api";

import { Box, TextField, Button } from "@mui/material"


const NewGroup = () => {

    const [groupName, setGroupName] = useState('');
    const isAddButtonDisabled = groupName.trim('') === '';

    const groupNameChangeHandler = (event) => {
        setGroupName(event.target.value)
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

        writeNewGroupData(newGroup);
    }

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
                sx={{ width: 80, height: 40, my: "auto" }}
            >
                Add
            </Button>
        </Box>

    )

};

export default NewGroup;

