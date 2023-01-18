import { useEffect, useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { readCategoriesData, readNewTaskId, writeNewTaskData } from '../lib/api';

import NewTaskForm from '../components/NewTask/NewTaskForm';

import { Button, Typography, Paper, Divider } from '@mui/material';

const initialTaskState = {
    title: '',
    description: '',
    priority: '',
    category: '',
};

function newTaskFormReducer(state, action) {
    switch (action.type) {
        case 'titleChange':
            return { ...state, title: action.payload };
        case 'descriptionChange':
            return { ...state, description: action.payload };
        case 'priorityChange':
            return { ...state, priority: action.payload };
        case 'categoryChange':
            return { ...state, category: action.payload };
        case 'clearForm':
            return { initialTaskState };
        default:
            throw new Error();
    }
};

const NewTask = () => {

    const [newTaskState, newTaskDispatch] = useReducer(newTaskFormReducer, initialTaskState);
    const [newTaskId, setNewTaskId] = useState('');
    const [allCategories, setAllCategories] = useState([]);

    const user = useSelector(state => state.auth.username);

    const categoriesNamesArray = allCategories ?
        allCategories.map(category => category.name) : [];

    useEffect(() => {
        readNewTaskId(setNewTaskId);
        readCategoriesData(setAllCategories);
    }, [])

    const dateFormatter = new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

    const titleChangeHandler = (event) => {
        newTaskDispatch({ type: 'titleChange', payload: event.target.value })
    };

    const descriptionChangeHandler = (event) => {
        newTaskDispatch({ type: 'descriptionChange', payload: event.target.value })
    };

    const priorityChangeHandler = (event) => {
        newTaskDispatch({ type: 'priorityChange', payload: event.target.value })
    };

    const categoryChangeHandler = (event) => {
        newTaskDispatch({ type: 'categoryChange', payload: event.target.value })
    };


    const submitHandler = (event) => {
        event.preventDefault();

        const newTask = {
            ...newTaskState,
            id: newTaskId,
            createDate: dateFormatter.format(new Date()),
            modificationDate: dateFormatter.format(new Date()),
            priority: parseInt(priorityInputValue), // it is not number?
            currentUser: 'None',
            currentGroup: 'Helpdesk',
            author: user,
            status: 'Open'
        };

        writeNewTaskData(newTask);
        newTaskDispatch({ type: 'clearForm ' });
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