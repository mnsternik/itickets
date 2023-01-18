import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { readSingleTaskData, readAllGroupsData, readCategoriesData, readAllUsersData } from '../lib/api';

import TaskDetailForm from '../components/TaskDetail/TaskDetailForm';
import NewResponse from '../components/Response/NewResponse';
import ResponsesList from '../components/Response/ResponsesList';
import TaskDetailActions from '../components/TaskDetail/TaskDetailActions';

import { Divider, Paper, Typography } from '@mui/material';

const TaskDetail = () => {

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

    let selectedGroupMembers = [];
    if (taskData && taskData.currentGroup) {
        selectedGroupMembers = users.filter(user => user.group === taskData.currentGroup);
    }
    const groupMembersSelectOptions = selectedGroupMembers.map(user => ({ name: user.name, value: user.uid }));

    useEffect(() => {
        readSingleTaskData(taskId, setTaskData);
        readAllGroupsData(setGroups);
        readCategoriesData(setCategories);
        readAllUsersData(setUsers);
    }, [taskId])


    const currentUserChangeHandler = (event) => {
        const selectedUser = users.find(user => user.uid === event.target.value);
        setTaskData({
            ...taskData,
            currentUserId: selectedUser.uid,
            currentUser: selectedUser.name,
            currentGroup: selectedUser.group
        });
    };

    const currentGroupChangeHandler = (event) => {
        setTaskData({
            ...taskData,
            currentGroup: event.target.value,
            currentUser: '',
            currentUserId: ''
        });
    };

    const categoryChangeHandler = (event) => {
        //removeCategoryMember(event.target.value, taskData.id);
        //wirteCategoryMember(event.target.value, taskData.id)
        setTaskData({ ...taskData, category: event.target.value });
    };

    const priorityChangeHandler = (event) => {
        setTaskData({ ...taskData, priority: event.target.value });
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
        <>
            {taskData && taskData.id && taskData.id.length > 0 &&
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
                        users={groupMembersSelectOptions}
                        categories={categoriesNamesArr}
                        taskData={taskData}
                        isFormDisabled={isFormDisabled}
                    />

                    <ResponsesList taskData={taskData} />

                    <NewResponse taskData={taskData} onTaskUpdate={updateTaskHandler} />
                </Paper>
            }

            {!taskData &&
                <Typography variant='h5' sx={{ p: 4 }}>
                    Task not found.
                </Typography>
            }
        </>
    )
};

export default TaskDetail;