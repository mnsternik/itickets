import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Box, Button } from "@mui/material";

const TaskDetailActions = (props) => {

    const userData = useSelector(state => state.auth.userData);
    const group = useSelector(state => state.auth.userData.group);

    const navigate = useNavigate();

    //show "Assign to me" button only when logged user is not task's currentUser and logged user's group IS task's currentGroup
    const showAssignButton = userData.uid !== props.taskData.currentUserId && group === props.taskData.currentGroup && props.isFormDisabled;
    const showEditButton = userData.uid === props.taskData.currentUserId;
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
        props.onTaskUpdate(updatedTask);
    };

    const saveClickHandler = (event) => {
        event.preventDefault();
        const updatedTask = structuredClone(props.taskData);
        updatedTask.modificationDate = dateFormatter.format(new Date());
        props.onTaskUpdate(updatedTask);
        props.onToggleForm();
    };


    return (
        <Box sx={{ display: 'flex', mb: 1 }}>

            <Button
                size='large'
                sx={{ width: '90px' }}
                onClick={() => navigate(-1)}
            >
                Back
            </Button>

            {showSaveButton &&
                <Button
                    type='submit'
                    form='taskDetailsForm'
                    size='large'
                    onClick={saveClickHandler}
                    sx={{ width: '90px' }}
                >
                    Save
                </Button>
            }

            {showEditButton &&
                <Button
                    size='large'
                    onClick={props.onToggleForm}
                    sx={{ width: '90px' }}
                >
                    {props.isFormDisabled ? 'Edit' : 'Leave'}
                </Button>
            }

            {showAssignButton &&
                <Button
                    size='large'
                    onClick={assignClickHandler}
                    sx={{ width: '140px' }}
                >
                    Assing to me
                </Button>
            }

        </Box>
    )
};

export default TaskDetailActions; 