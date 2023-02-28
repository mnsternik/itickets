import { useEffect, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { readSingleTaskData, readAllGroupsData, readCategoriesData, readAllUsersData, updateSingleTaskData } from '../lib/api';

import TaskDetailForm from '../components/TaskDetail/TaskDetailForm';
import NewResponse from '../components/Response/NewResponse';
import ResponsesList from '../components/Response/ResponsesList';
import TaskDetailActions from '../components/TaskDetail/TaskDetailActions';

import { Divider, Paper, Typography } from '@mui/material';


const initTaskState = {
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
};

const TaskDetail = () => {

    const params = useParams();
    const { taskId } = params;

    const [taskState, dispatchTask] = useReducer((state, action) => {

        // task with given id not found
        if (!action) {
            return action;
        }

        return ({ ...state, ...action })
    }, initTaskState);

    const [groups, setGroups] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);

    const [isFormDisabled, setIsFormDisabled] = useState(true);

    useEffect(() => {
        readSingleTaskData(taskId, dispatchTask);
        readAllGroupsData(setGroups);
        readCategoriesData(setCategories);
        readAllUsersData(setUsers);
    }, [taskId])


    const currentUserChangeHandler = (event) => {
        const selectedUser = users.find(user => user.uid === event.target.value);
        dispatchTask({
            currentUserId: selectedUser.uid,
            currentUser: selectedUser.name,
            currentGroup: selectedUser.group
        });
    };

    const currentGroupChangeHandler = (event) => {
        dispatchTask({
            currentGroup: event.target.value,
            currentUser: '',
            currentUserId: ''
        });
    };

    const toggleFormHandler = () => {
        setIsFormDisabled(prevState => !prevState);
    };

    const updateTaskHandler = (taskData) => {
        updateSingleTaskData(taskData);
    };

    return (
        <>
            {taskState && taskState.id && taskState.id.length > 0 &&
                <Paper
                    elevation={3}
                    sx={{
                        minWidth: 700,
                        minHeight: 800,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                    }}
                >

                    <TaskDetailActions
                        isFormDisabled={isFormDisabled}
                        taskData={taskState}
                        onCurrentUserChange={currentUserChangeHandler}
                        onCurrentGroupChange={currentGroupChangeHandler}
                        onToggleForm={toggleFormHandler}
                        onTaskUpdate={updateTaskHandler}
                    />

                    <Divider />

                    <TaskDetailForm
                        groups={groups}
                        users={users}
                        categories={categories}
                        taskData={taskState}
                        isFormDisabled={isFormDisabled}
                        onCurrentUserChange={currentUserChangeHandler}
                        onCurrentGroupChange={currentGroupChangeHandler}
                        onSelectChange={dispatchTask}
                    />

                    <ResponsesList taskData={taskState} />

                    <NewResponse
                        taskData={taskState}
                        onTaskUpdate={updateTaskHandler}
                    />

                </Paper>
            }

            {!taskState &&
                <Typography variant='h5' sx={{ p: 4 }}>
                    Task not found.
                </Typography>
            }
        </>
    )
};

export default TaskDetail;