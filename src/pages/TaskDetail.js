import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useHttp from '../hooks/useHttp';

import { Divider, Button, Paper } from '@mui/material';

import TaskDetailForm from '../components/TaskDetail/TaskDetailForm';
import NewResponse from '../components/TaskDetail/Response/NewResponse';
import ResponsesList from '../components/TaskDetail/Response/ResponsesList';
import TaskDetailActions from '../components/TaskDetail/TaskDetailActions';

const TaskDetail = () => {

    //add notaskfound component or smth



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
        responses: [],
    });

    const [showResponsesList, setShowResponsesList] = useState(false);
    const [isFormDisabled, setIsFormDisabled] = useState(true);

    const dispatch = useDispatch();

    const params = useParams();
    const { taskId } = params;

    const { isLoading: fetchTaskLoading, error: fetchTaskError, sendRequest: fetchTasks } = useHttp();

    useEffect(() => {
        const extractTask = (tasks) => {

            if (!tasks) {
                console.log('no task with this id in firebase')
                return;
            }

            const fetchedTasks = [];
            for (const taskKey in tasks) {
                fetchedTasks.push({ ...tasks[taskKey], firebaseKey: taskKey })
            }

            setTaskData(fetchedTasks.find(task => task.id === taskId));
        };

        fetchTasks({ url: 'https://iticket-fd059-default-rtdb.firebaseio.com/tasks.json' }, extractTask)
    }, [fetchTasks, dispatch, taskId])

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

    const toggleResponsesList = () => {
        setShowResponsesList(prevState => !prevState)
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
                taskData={taskData}
                isFormDisabled={isFormDisabled}

            />

            <Button onClick={toggleResponsesList} disabled={!taskData.responses}>
                {showResponsesList ? 'Hide responses' : `Show responses (${taskData.responses ? taskData.responses.length : '0'})`}
            </Button>

            {showResponsesList && <ResponsesList taskData={taskData} onTaskUpdate={updateTaskHandler} />}

            <NewResponse taskData={taskData} onTaskUpdate={updateTaskHandler} />

        </Paper>
    )
};

export default TaskDetail;