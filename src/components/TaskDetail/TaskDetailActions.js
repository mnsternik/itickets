import { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import useHttp from "../../hooks/useHttp";
import { fetchTasksData } from './../../store/tasks';

import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';

const TaskDetailActions = (props) => {

    const [showSuccessAlert, setShowSuccesAlert] = useState(false);

    const user = useSelector(state => state.auth.username);
    const group = useSelector(state => state.auth.group);

    const navigate = useNavigate();

    const { isLoading: assignLoading, error: assignError, sendRequest: sendUpdatedTask } = useHttp();

    //show "Assign to me" button only when logged user is not task's currentUser and logged user's group IS task's currentGroup
    const showAssignButton = user !== props.taskData.currentUser && group === props.taskData.currentGroup && props.isFormDisabled;
    const showEditButton = user === props.taskData.currentUser && props.isFormDisabled;
    const showSaveButton = !props.isFormDisabled;

    const taskUrl = `https://iticket-fd059-default-rtdb.firebaseio.com/tasks/${props.taskData.firebaseKey}.json`;

    const dateFormatter = new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });


    const assignClickHandler = () => {
        const updatedTask = structuredClone(props.taskData);

        updatedTask.currentUser = user;
        updatedTask.currentGroup = group;
        updatedTask.status = 'In progress';
        updatedTask.modificationDate = dateFormatter.format(new Date());

        sendUpdatedTask({
            url: taskUrl,
            method: 'PUT',
            body: updatedTask,
        }, fetchTasksData);

        props.onUpdate(updatedTask);
    };


    const editClickHandler = () => {
        props.onToggleFormChangeable();
    };


    const saveClickHandler = () => {
        const updatedTask = structuredClone(props.taskData);
        props.onToggleFormChangeable();
        setShowSuccesAlert(true);

        updatedTask.modificationDate = dateFormatter.format(new Date());

        sendUpdatedTask({
            url: taskUrl,
            method: 'PUT',
            body: updatedTask,
        }, fetchTasksData);
    };


    const leaveClickHandler = () => {
        props.onToggleFormChangeable();
    };

    return (
        <Box sx={{ display: 'flex' }}>

            <Button size='large' sx={{ width: '90px' }} onClick={() => navigate(-1)}>
                Back
            </Button>
            {showSaveButton &&
                <Button size='large' onClick={saveClickHandler} sx={{ width: '90px' }}>
                    Save
                </Button>
            }
            {showEditButton &&
                <Button size='large' onClick={editClickHandler} sx={{ width: '90px' }}>
                    Edit
                </Button>
            }
            {showSaveButton &&
                <Button size='large' onClick={leaveClickHandler} sx={{ width: '90px' }}>
                    Leave
                </Button>
            }
            {showAssignButton &&
                <Button size='large' onClick={assignClickHandler} sx={{ width: '140px' }}>
                    Assing to me
                </Button>
            }

            {showSuccessAlert && <Alert
                onClose={() => { setShowSuccesAlert(false) }}
                sx={{
                    position: 'absolute'
                }}
            >
                Changes saved!
            </Alert>}
        </Box>
    )
};

export default TaskDetailActions; 