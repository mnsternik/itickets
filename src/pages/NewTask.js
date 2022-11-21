import { useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from './../hooks/useHttp';

import NewTaskForm from '../components/NewTask/NewTaskForm';

import { Button, Typography, Paper } from '@mui/material';

const NewTask = () => {

    const [titleInputValue, setTitleInputValue] = useState('');
    const [descriptionInputValue, setDescriptionInputValue] = useState('');
    const [priorityInputValue, setPriorityInputValue] = useState('');
    const [categoryInputValue, setCategoryInputValue] = useState('');

    const { isLoading: sendTaskLoading, error: sendTaskError, sendRequest: sendTask } = useHttp();

    const user = useSelector(state => state.auth.username);
    const categories = useSelector(state => state.tasks.categoriesData.categories);

    const dateFormatter = new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

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


    const clearForm = () => {
        setTitleInputValue('');
        setDescriptionInputValue('');
        setCategoryInputValue('');
        setPriorityInputValue('');
    };


    const submitHandler = (event) => {
        event.preventDefault();

        const newTask = {
            id: Math.floor(Math.random() * 1000).toString(), // <- id should be from response from firebase?
            createDate: dateFormatter.format(new Date()),
            modificationDate: dateFormatter.format(new Date()),
            priority: parseInt(priorityInputValue),
            category: categoryInputValue,
            title: titleInputValue,
            description: descriptionInputValue,
            author: user,
            status: 'Open',
            currentUser: 'None',
            currentGroup: 'Helpdesk',
            responses: []
        }

        sendTask({
            url: 'https://iticket-fd059-default-rtdb.firebaseio.com/tasks.json',
            method: 'POST',
            body: newTask,
        });

        clearForm();
    };


    return (
        <Paper
            component='form'
            sx={{
                minHeight: '500px',
                p: 4,
                my: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
            }}>

            <Typography variant="h6" gutterBottom sx={{}}>
                Create new task
            </Typography>

            <NewTaskForm
                categories={categories}
                title={titleInputValue}
                description={descriptionInputValue}
                priority={priorityInputValue}
                category={categoryInputValue}
                onTitleChange={titleChangeHandler}
                onDescriptionChange={descriptionChangeHandler}
                onPriorityChange={priorityChangeHandler}
                onCategoryChange={categoryChangeHandler}
            />

            <Button
                variant="contained"
                size="large"
                onClick={submitHandler}
                sx={{ width: '120px' }}
            >
                Send
            </Button>
        </Paper>
    )
};

export default NewTask; 