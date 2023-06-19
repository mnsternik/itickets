import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Box, Button, Stack } from "@mui/material";

const TaskDetailActions = (props) => {

    const userData = useSelector(state => state.auth.userData);
    const group = useSelector(state => state.auth.userData.group);

    const navigate = useNavigate();

    const isTaskClosed = (props.taskData.status === 'Completed' || props.taskData.status === 'Failed');
    const isLoggedUserAssigned = props.taskData.currentUserId === userData.uid;
    const isLoggedUserAuthor = props.taskData.authorId === userData.uid;
    const isLoggedUserGroupAssigned = props.taskData.currentGroup === group;
    //const isTaskArchived = props.taskData.archived;


    //show "Assign to me" button only when logged user is not task's currentUser and logged user's group IS task's currentGroup
    const showAssignButton = !isTaskClosed && !isLoggedUserAssigned && isLoggedUserGroupAssigned && props.isFormDisabled;
    const showEditButton = !isTaskClosed && isLoggedUserAssigned;
    const showSaveButton = !props.isFormDisabled;
    const showReopenButton = isTaskClosed && (isLoggedUserAssigned || isLoggedUserAuthor)

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

    const completedClickHandler = (event) => {
        const updatedTask = structuredClone(props.taskData);
        updatedTask.status = 'Completed';
        updatedTask.modificationDate = dateFormatter.format(new Date());
        props.onTaskUpdate(updatedTask);
    };

    const failedClickHandler = (event) => {
        const updatedTask = structuredClone(props.taskData);
        updatedTask.status = 'Failed';
        updatedTask.modificationDate = dateFormatter.format(new Date());
        props.onTaskUpdate(updatedTask);
    };

    const reopenClickHandler = (event) => {
        const updatedTask = structuredClone(props.taskData);
        updatedTask.status = 'Re-open';
        updatedTask.modificationDate = dateFormatter.format(new Date());
        props.onTaskUpdate(updatedTask);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>

            <Stack direction='row'>
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

                {showReopenButton &&
                    <Button
                        size='large'
                        onClick={reopenClickHandler}
                        sx={{ width: '140px' }}
                    >
                        Re-open
                    </Button>
                }

            </Stack>

            {!props.isFormDisabled && <Stack direction='row'>
                {showEditButton &&
                    <Button
                        size='large'
                        onClick={completedClickHandler}
                        sx={{ width: '90px', px: 8 }}
                    >
                        Completed
                    </Button>
                }

                {showEditButton &&
                    <Button
                        size='large'
                        color='error'
                        onClick={failedClickHandler}
                        sx={{ width: '90px' }}
                    >
                        Failed
                    </Button>
                }
            </Stack>}

        </Box>
    )
};

export default TaskDetailActions; 