import { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { updateSingleTaskData } from '../../lib/api';
import { Box, Button, Alert } from "@mui/material";

const TaskDetailActions = (props) => {

    const [showSuccessAlert, setShowSuccesAlert] = useState(false);

    const userData = useSelector(state => state.auth.userData);
    const group = useSelector(state => state.auth.userData.group);

    const navigate = useNavigate();

    //show "Assign to me" button only when logged user is not task's currentUser and logged user's group IS task's currentGroup
    const showAssignButton = userData.uid !== props.taskData.currentUserId && group === props.taskData.currentGroup && props.isFormDisabled;
    const showEditButton = userData.uid === props.taskData.currentUserId && props.isFormDisabled;
    const showSaveButton = !props.isFormDisabled;

    const dateFormatter = new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });


    const assignClickHandler = () => {
        const updatedTask = structuredClone(props.taskData);

        updatedTask.currentUserId = userData.uid;
        updatedTask.currentUser = userData.name;
        updatedTask.currentGroup = group;
        updatedTask.status = 'In progress';
        updatedTask.modificationDate = dateFormatter.format(new Date());

        updateSingleTaskData(updatedTask);
    };


    const editClickHandler = () => {
        props.onToggleFormChangeable();
    };


    const saveClickHandler = () => {
        const updatedTask = structuredClone(props.taskData);
        updatedTask.modificationDate = dateFormatter.format(new Date());

        props.onToggleFormChangeable();
        updateSingleTaskData(updatedTask);
        setShowSuccesAlert(true);
    };


    const leaveClickHandler = () => {
        props.onToggleFormChangeable();
    };

    return (
        <Box sx={{ display: 'flex', mb: 1 }}>

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