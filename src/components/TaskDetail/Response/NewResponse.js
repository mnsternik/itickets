import { useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../../hooks/useHttp';
import { fetchTasksData } from '../../../store/tasks';

import { writeResponseData } from '../../../lib/api';

//import { ref, set, child, push } from 'firebase/database';
//import { db } from '../../../util/firebase';

import { Button, Box, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
//import SelectInput from '../../../UI/SelectInput';

const NewResponse = (props) => {

    const [responseInputValue, setResponseInputValue] = useState('');
    const [isResponsePrivate, setIsResponsePrivate] = useState('Public');

    const username = useSelector(state => state.auth.username);

    const { isLoading: fetchTaskLoading, error: fetchTaskError, sendRequest: sendUpdatedTask } = useHttp();

    const dateFormatter = new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });


    const isResPrivateChangeHandler = (event) => {
        setIsResponsePrivate(event.target.value);
    };

    const responseChangeHandler = (event) => {
        setResponseInputValue(event.target.value)
    };

    const addResponseClickHandler = (event) => {
        let updatedTask = structuredClone(props.taskData);
        const taskUrl = `https://iticket-fd059-default-rtdb.firebaseio.com/tasks/${updatedTask.firebaseKey}.json`;

        const responseData = {
            id: Math.floor(Math.random() * 1000).toString(),
            taskId: updatedTask.id,
            author: username,
            createDate: dateFormatter.format(new Date()),
            message: responseInputValue,
            visibility: isResponsePrivate
        };

        if (!updatedTask.responses) {
            updatedTask.responses = [responseData]
        } else {
            updatedTask.responses.push(responseData)
        }

        updatedTask.modificationDate = dateFormatter.format(new Date());

        //writeResponseData(updatedTask.id, responseData);

        sendUpdatedTask({
            url: taskUrl,
            method: 'PUT',
            body: updatedTask,
        }, fetchTasksData);

        props.onTaskUpdate(updatedTask);

        setResponseInputValue('')
    };


    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

            <FormControl sx={{ width: '140px', my: 2, alignSelf: 'flex-end' }}>
                <InputLabel id="input-response-type-label"> Visibility </InputLabel>
                <Select
                    labelId="response-type-label"
                    size="small"
                    id="response-type"
                    value={isResponsePrivate}
                    label="Visibility"
                    onChange={isResPrivateChangeHandler}
                    sx={{ w: 120 }}
                >
                    <MenuItem value={'Private'}>Private</MenuItem>
                    <MenuItem value={'Public'}>Public</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Response"
                multiline
                rows="5"
                placeholder='Your response...'
                value={responseInputValue}
                onChange={responseChangeHandler}
            />

            <Button
                variant="outlined"
                size='large'
                onClick={addResponseClickHandler}
                sx={{ m: 2, width: 80 }}
            >
                Send
            </Button>

        </Box>

    )
}

export default NewResponse;