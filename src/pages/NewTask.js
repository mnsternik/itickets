import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { readCategoriesData, readDefaultAssignedGroup, writeNewTaskData } from '../lib/api';

import NewTaskForm from '../components/NewTask/NewTaskForm';

import { Typography, Paper, Divider, Alert } from '@mui/material';


const NewTask = () => {

    const userData = useSelector(state => state.auth.userData);

    const [newTaskId, setNewTaskId] = useState('');
    const [defaultAssignedGroup, setDefaultAssignedGroup] = useState({})
    const [categories, setCategories] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const categoriesNamesArray = categories ?
        categories.map(category => category.name) : [];

    useEffect(() => {
        readCategoriesData(setCategories);
        readDefaultAssignedGroup(setDefaultAssignedGroup);
    }, [])

    const dateFormatter = new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

    const addNewTaskHandler = (formData) => {
        const newTask = {
            ...formData,
            createDate: dateFormatter.format(new Date()),
            modificationDate: dateFormatter.format(new Date()),
            authorId: userData.uid,
            author: userData.name,
            status: 'Open',
            currentUserId: null,
            currentUser: null,
            currentGroup: defaultAssignedGroup.name
        };

        writeNewTaskData(newTask, setNewTaskId);
        setShowAlert(true);
    };


    return (
        <Paper sx={{ p: 4 }}>

            <Typography variant='h5' sx={{ fontWeight: 500, mb: 2, p: 2 }}>
                Create new task
            </Typography>

            <Divider />

            <NewTaskForm
                categories={categoriesNamesArray}
                onAddNewTask={addNewTaskHandler}
            />

            {showAlert &&
                <Alert severity="success"
                    onClose={() => setShowAlert(false)}
                    sx={{ mt: 2 }}
                >
                    Task successfuly created. You can see it <Link style={{ color: 'green' }} to={`/tasks/${newTaskId}`}>here</Link>
                </Alert>}

        </Paper>
    )
};

export default NewTask; 