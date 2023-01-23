import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { readCategoriesData, readNewTaskId, writeNewTaskData } from '../lib/api';

import NewTaskForm from '../components/NewTask/NewTaskForm';

import { Typography, Paper, Divider, Alert } from '@mui/material';


const NewTask = () => {

    const userData = useSelector(state => state.auth.userData);

    const [newTaskId, setNewTaskId] = useState('');
    const [categories, setCategories] = useState([]);

    const [alertData, setAlertData] = useState({ showAlert: false, taskId: '' });

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

    const closeAlertHandler = () => {
        setAlertData({ showAlert: false, taskId: '' });
    }

    const addNewTaskHandler = (formData) => {
        const newTask = {
            ...formData,
            id: newTaskId,
            createDate: dateFormatter.format(new Date()),
            modificationDate: dateFormatter.format(new Date()),
            authorId: userData.uid,
            author: userData.name,
            status: 'Open',
            currentUserId: null,
            currentUser: null,
            currentGroup: 'Helpdesk',
        };

        writeNewTaskData(newTask);
        setAlertData({ showAlert: true, taskId: newTaskId });
    };


    return (
        <Paper sx={{ p: 4 }}>

            <Typography variant='h5' sx={{ fontWeight: 500, mb: 2, p: 2 }}>
                Create new task
            </Typography>

            <Divider />

            <NewTaskForm categories={categoriesNamesArray} onAddNewTask={addNewTaskHandler} />

            {alertData.showAlert && <Alert severity="success" onClose={closeAlertHandler} sx={{ mt: 2 }}>
                Task successfuly created. You can see it <Link style={{ color: 'green' }} to={`/tasks/${alertData.taskId}`}>here</Link>
            </Alert>}

        </Paper>
    )
};

export default NewTask; 