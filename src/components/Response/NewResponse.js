import { useState } from 'react';
import { useSelector } from 'react-redux';
import { writeNewResponseData, updateSingleTaskData } from '../../lib/api';

import { Button, TextField, Stack } from '@mui/material';
import SelectInput from '../../UI/SelectInput';

const NewResponse = (props) => {

    const [responseInputValue, setResponseInputValue] = useState('');
    const [responseType, setResponseType] = useState('Public');

    const userData = useSelector(state => state.auth.userData);

    const dateFormatter = new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });


    const isResPrivateChangeHandler = (event) => {
        setResponseType(event.target.value);
    };

    const responseChangeHandler = (event) => {
        setResponseInputValue(event.target.value)
    };


    const addResponseClickHandler = () => {
        const updatedTask = structuredClone(props.taskData);
        updatedTask.modificationDate = dateFormatter.format(new Date());

        const responseData = {
            author: userData.name,
            authorId: userData.uid,
            createDate: dateFormatter.format(new Date()),
            message: responseInputValue,
            visibility: responseType
        };

        writeNewResponseData(updatedTask.id, responseData)
        updateSingleTaskData(updatedTask);

        setResponseInputValue('')
    };


    return (
        <Stack spacing={2} sx={{ mt: 3 }}>
            <SelectInput
                label='Visibility'
                value={responseType}
                onChange={isResPrivateChangeHandler}
                options={['Private', 'Public']}
                sx={{ width: 120, alignSelf: 'end' }}
            />

            <TextField
                label="Response"
                multiline
                rows="5"
                placeholder='Your response...'
                value={responseInputValue}
                onChange={responseChangeHandler}
            />

            <Button
                variant="contained"
                size='large'
                disabled={!responseInputValue.length}
                onClick={addResponseClickHandler}
                sx={{ width: 80 }}
            >
                Send
            </Button>
        </Stack>
    )
}

export default NewResponse;