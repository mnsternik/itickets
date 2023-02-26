import { useReducer } from 'react';
import { useSelector } from 'react-redux';

import { Stack, TextField, Button } from '@mui/material';
import SelectInput from "../../UI/SelectInput";


const initTaskState = {
    title: '',
    description: '',
    priority: '',
    category: ''
}

const NewTaskForm = (props) => {

    const priorities = useSelector(state => state.tasks.priorities);

    const [taskState, dispatchTask] = useReducer((prev, next) => {
        const newTask = { ...prev, ...next }

        if (newTask.priority.length > 0) {
            newTask.priority = parseInt(newTask.priority)
        }

        return newTask
    }, initTaskState)


    const submitHandler = (e) => {
        e.preventDefault();
        props.onAddNewTask(taskState);
        dispatchTask(initTaskState);
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
                onChange={e => dispatchTask({ title: e.target.value })}
            />

            <TextField
                label="Description"
                value={taskState.description}
                multiline
                rows="5"
                onChange={e => dispatchTask({ description: e.target.value })}
            />

            <SelectInput
                label='Priority'
                value={taskState.priority}
                structure='objects'
                options={priorities}
                inputProps={{ readOnly: props.isFormDisabled }}
                sx={{ width: 180 }}
                onChange={e => dispatchTask({ priority: e.target.value })}
            />

            <SelectInput
                label='Category'
                value={taskState.category}
                options={props.categories}
                sx={{ width: 180 }}
                onChange={e => dispatchTask({ category: e.target.value })}
            />

            <Button
                type='submit'
                variant='contained'
                size='large'
                sx={{ width: '120px', mt: 2 }}
            >
                Send
            </Button>

        </Stack>
    )
};

export default NewTaskForm;
