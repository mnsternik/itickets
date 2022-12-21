import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { readSingleTaskData, readGroupsData, readCategoriesData, readAllUsersData } from '../lib/api';

import TaskDetailForm from '../components/TaskDetail/TaskDetailForm';
import NewResponse from '../components/Response/NewResponse';
import ResponsesList from '../components/Response/ResponsesList';
import TaskDetailActions from '../components/TaskDetail/TaskDetailActions';

import { Divider, Paper } from '@mui/material';

const TaskDetail = () => {

    //add notaskfound component or smth
    const params = useParams();
    const { taskId } = params;

    const [isFormDisabled, setIsFormDisabled] = useState(true);
    const [groups, setGroups] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [taskData, setTaskData] = useState({
        id: '',
        priority: '',
        currentGroup: '',
        currentUser: '',
        category: '',
        status: '',
        author: '',
        description: '',
        createDate: '',
        modificationDate: '',
    });

    const groupsNamesArr = groups.map(group => group.name);
    const categoriesNamesArr = categories.map(category => category.name);

    useEffect(() => {
        readSingleTaskData(taskId, setTaskData);
        readGroupsData(setGroups);
        readCategoriesData(setCategories);
        readAllUsersData(setUsers);
    }, [taskId])

    const priorityChangeHandler = (event) => {
        setTaskData({ ...taskData, priority: event.target.value });
    };

    const currentUserChangeHandler = (event) => {
        setTaskData({ ...taskData, currentUser: event.target.value });
    };

    const currentGroupChangeHandler = (event) => {
        setTaskData({ ...taskData, currentGroup: event.target.value });
    };

    const categoryChangeHandler = (event) => {
        setTaskData({ ...taskData, category: event.target.value });
    };

    const statusChangeHandler = (event) => {
        setTaskData({ ...taskData, status: event.target.value });
    };

    const toggleFormChangeable = () => {
        setIsFormDisabled(prevState => !prevState);
    };

    const updateTaskHandler = (task) => {
        setTaskData(task)
    };

    return (
        <Paper
            elevation={3}
            sx={{
                minWidth: 700,
                minHeight: 800,
                my: 4,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <TaskDetailActions
                onCurrentUserChange={currentUserChangeHandler}
                onCurrentGroupChange={currentGroupChangeHandler}
                onToggleFormChangeable={toggleFormChangeable}
                onUpdate={updateTaskHandler}
                isFormDisabled={isFormDisabled}
                taskData={taskData}
            />

            <Divider />

            <TaskDetailForm
                onPriorityChange={priorityChangeHandler}
                onCurrentUserChange={currentUserChangeHandler}
                onCurrentGroupChange={currentGroupChangeHandler}
                onCategoryChange={categoryChangeHandler}
                onStatusChange={statusChangeHandler}
                groups={groupsNamesArr}
                categories={categoriesNamesArr}
                taskData={taskData}
                isFormDisabled={isFormDisabled}

            />

            <ResponsesList taskData={taskData} />

            <NewResponse taskData={taskData} onTaskUpdate={updateTaskHandler} />

        </Paper>
    )
};

export default TaskDetail;