import { useSelector } from 'react-redux';

import { TextField, Box, Typography } from '@mui/material';
import SelectInput from "../../UI/SelectInput";

const DUMMY_USERS = ['user1', 'user2', 'user3', 'None'];

const TaskDetailForm = (props) => {

    const categories = useSelector(state => state.tasks.categoriesData.categories);
    const groups = useSelector(state => state.users.groupsData.groups);
    const priorities = useSelector(state => state.tasks.priorities);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            minHeight: 500
        }}>

            <Typography variant='h5' sx={{ my: 1 }}>
                [ID: {props.taskData.id}] - {props.taskData.title}
            </Typography>

            <Typography variant='subtitle1' sx={{ fontWeight: 'light', mb: 2 }}>
                Author: {props.taskData.author}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', my: 1 }}>
                <SelectInput
                    label='Category'
                    onChange={props.onCategoryChange}
                    value={props.taskData.category}
                    options={categories}
                    inputProps={{ readOnly: props.isFormDisabled }}
                />

                <SelectInput
                    label='Status'
                    onChange={props.onStatusChange}
                    value={props.taskData.status}
                    options={['Open', 'In progress', 'Closed', 'Canceled']}
                    inputProps={{ readOnly: props.isFormDisabled }}
                />

                <SelectInput
                    label='Priority'
                    onChange={props.onPriorityChange}
                    value={props.taskData.priority}
                    structure='objects'
                    options={priorities}
                    inputProps={{ readOnly: props.isFormDisabled }}
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', my: 1 }}>
                <SelectInput
                    label='Current user'
                    onChange={props.onCurrentUserChange}
                    value={props.taskData.currentUser}
                    options={DUMMY_USERS}
                    inputProps={{ readOnly: props.isFormDisabled }}
                />

                <SelectInput
                    label='Current group'
                    onChange={props.onCurrentGroupChange}
                    value={props.taskData.currentGroup}
                    options={groups}
                    inputProps={{ readOnly: props.isFormDisabled }}
                />
            </Box>

            <TextField
                label="Description"
                inputProps={{ readOnly: props.isFormDisabled }}
                multiline
                rows={4}
                value={props.taskData.description}
                sx={{ my: 1 }}
            />

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                my: 1
            }}>
                <TextField
                    label="Creation date"
                    value={props.taskData.createDate}
                    inputProps={{ readOnly: true }}
                    sx={{ width: 300, px: 1 }}

                />

                <TextField
                    label="Last modification date"
                    value={props.taskData.modificationDate}
                    inputProps={{ readOnly: true }}
                    sx={{ width: 300, px: 1 }}
                />
            </Box>
        </Box>
    )
};

export default TaskDetailForm;

