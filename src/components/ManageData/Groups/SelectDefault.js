import { useEffect, useState } from "react";
import { readDefaultAssignedGroup, writeDefaultAssignedGroup } from "../../../lib/api";

import SelectInput from "../../../UI/SelectInput";
import { Box, Button, Alert } from "@mui/material";


const SelectDefault = (props) => {

    const [defaultGroup, setDefaultGroup] = useState({ name: '', id: '' });
    const [showAlert, setShowAlert] = useState(false);

    const groupsSelectOptions = props.groupsData.map(group => ({ value: group.id, name: group.name }));

    useEffect(() => {
        readDefaultAssignedGroup(setDefaultGroup)
    }, [])

    const defaultGroupChangeHandler = (event) => {
        setDefaultGroup({ id: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const selectedGroupData = props.groupsData.find(group => group.id === defaultGroup.id);
        writeDefaultAssignedGroup({
            id: selectedGroupData.id,
            name: selectedGroupData.name
        });
        setShowAlert(true);
    };

    return (
        <Box component='form' onSubmit={submitHandler}>
            <SelectInput
                label='Default assigned group'
                structure='objects'
                value={defaultGroup.id}
                options={groupsSelectOptions}
                onChange={defaultGroupChangeHandler}
                sx={{ width: 320, mr: 2 }}
            />

            <Button type='submit' size='large' variant='contained' sx={{ height: 54 }}>
                Save
            </Button>

            {showAlert && <Alert severity='success' onClose={() => setShowAlert(false)}>
                {'Default assigned group successfuly changed'}
            </Alert>}
        </Box>
    )
};

export default SelectDefault; 