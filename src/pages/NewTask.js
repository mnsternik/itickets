import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { readCategoriesData, readNewTaskId, writeNewTaskData } from '../lib/api';

import NewTaskForm from '../components/NewTask/NewTaskForm';

import { Button, Typography, Paper, Divider } from '@mui/material';

const NewTask = () => {

    const [titleInputValue, setTitleInputValue] = useState('');
    const [descriptionInputValue, setDescriptionInputValue] = useState('');
    const [priorityInputValue, setPriorityInputValue] = useState('');
    const [categoryInputValue, setCategoryInputValue] = useState('');

    const user = useSelector(state => state.auth.username);
    //const categories = useSelector(state => state.tasks.categoriesData.categories);

    const [newTaskId, setNewTaskId] = useState('');
    const [categories, setCategories] = useState([]);

    const categoriesNamesArray = categories ?
        categories.map(category => category.name) : [];

    useEffect(() => {
        readNewTaskId(setNewTaskId);
        readCategoriesData(setCategories);
    }, [])

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
            id: newTaskId,
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
        };

        writeNewTaskData(newTask);

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

            <Typography variant='h5' sx={{ fontWeight: 500, mb: 2, p: 2 }}>
                Create new task
            </Typography>

            <Divider />

            <NewTaskForm
                categories={categoriesNamesArray}
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