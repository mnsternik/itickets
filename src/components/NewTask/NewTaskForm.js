import { useReducer, useState } from 'react';
import { useSelector } from 'react-redux';

import { Stack, TextField, Button, Alert } from '@mui/material';
import SelectInput from "../../UI/SelectInput";

const initTaskState = {
    title: '',
    description: '',
    priority: '',
    category: ''
}

const NewTaskForm = (props) => {

    const priorities = useSelector(state => state.tasks.priorities);

    const [taskState, dispatchTask] = useReducer((state, action) => {
        const newTask = { ...state, ...action.payload }

        if (action.type === 'priority_change') {
            newTask.priority = parseInt(newTask.priority)
        }

        return newTask
    }, initTaskState)

    const [showAlert, setShowAlert] = useState(false);


    const submitHandler = (e) => {
        e.preventDefault();

        //check if all form data is filled 
        if (Object.values(taskState).some(formItem => formItem.toString().trim() === '')) {
            setShowAlert(true);
            return;
        }
        setShowAlert(false);
        props.onAddNewTask(taskState);
        dispatchTask({ payload: initTaskState });
    }

    return (
        <Stack
            spacing={1}
            component='form'
            onSubmit={submitHandler}
        >

            <TextField
                label='Title'
                value={taskState.title}
                onChange={e => dispatchTask({ payload: { title: e.target.value } })}
            />

            <TextField
                label="Description"
                value={taskState.description}
                multiline
                rows="8"
                onChange={e => dispatchTask({ payload: { description: e.target.value } })}
            />

            <Stack direction='row' spacing={2}>
                <SelectInput
                    label='Priority'
                    value={taskState.priority}
                    structure='objects'
                    options={priorities}
                    inputProps={{ readOnly: props.isFormDisabled }}
                    sx={{ width: 180 }}
                    onChange={e => dispatchTask({ type: 'priority_change', payload: { priority: e.target.value } })}
                />

                <SelectInput
                    label='Category'
                    value={taskState.category}
                    options={props.categories}
                    sx={{ width: 180 }}
                    onChange={e => dispatchTask({ payload: { category: e.target.value } })}
                />
            </Stack>

            <Button
                type='submit'
                variant='contained'
                size='large'
                sx={{ width: '120px', mt: 2 }}
            >
                Send
            </Button>

            {showAlert && <Alert severity="error" onClose={() => setShowAlert(false)} sx={{ mt: 2 }}>
                All data must be filled
            </Alert>}

        </Stack>
    )
};

export default NewTaskForm;
