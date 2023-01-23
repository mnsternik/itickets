import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Stack, TextField, Button } from '@mui/material';
import SelectInput from "../../UI/SelectInput";


const NewTaskForm = (props) => {

    const priorities = useSelector(state => state.tasks.priorities);

    const [titleInputValue, setTitleInputValue] = useState('');
    const [descriptionInputValue, setDescriptionInputValue] = useState('');
    const [priorityInputValue, setPriorityInputValue] = useState('');
    const [categoryInputValue, setCategoryInputValue] = useState('');

    const titleChangeHandler = (event) => {
        setTitleInputValue(event.target.value);
    };

    const descriptionChangeHandler = (event) => {
        setDescriptionInputValue(event.target.value);
    };

    const priorityChangeHandler = (event) => {
        setPriorityInputValue(event.target.value);
    };

    const categoryChangeHandler = (event) => {
        setCategoryInputValue(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        props.onAddNewTask({
            title: titleInputValue,
            description: descriptionInputValue,
            priority: parseInt(priorityInputValue),
            category: categoryInputValue
        });

        setTitleInputValue('');
        setDescriptionInputValue('');
        setCategoryInputValue('');
        setPriorityInputValue('');
    }

    return (
        <Stack
            spacing={1}
            component='form'
            onSubmit={submitHandler}
        >

            <TextField
                label='Title'
                value={titleInputValue}
                onChange={titleChangeHandler}
            />

            <TextField
                label="Description"
                value={descriptionInputValue}
                multiline
                rows="5"
                onChange={descriptionChangeHandler}
            />

            <SelectInput
                label='Priority'
                value={priorityInputValue}
                onChange={priorityChangeHandler}
                structure='objects'
                options={priorities}
                inputProps={{ readOnly: props.isFormDisabled }}
                sx={{ width: 180 }}
            />

            <SelectInput
                label='Category'
                value={categoryInputValue}
                onChange={categoryChangeHandler}
                options={props.categories}
                sx={{ width: 180 }}
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
