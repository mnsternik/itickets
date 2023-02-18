import { useSelector } from 'react-redux';

import { TextField, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import SelectInput from "../../UI/SelectInput";

const TaskDetailForm = (props) => {

    const priorities = useSelector(state => state.tasks.priorities);

    const { groups, categories, users } = props;

    const currentUserOptionValue = users.find(user => user.value === props.taskData.currentUserId);

    return (

        <Stack
            component={'form'}
            id={'taskDetailsForm'}
            spacing={2}
            sx={{ my: 3 }}
        >

            <TextField
                label="Title"
                value={props.taskData.title ? props.taskData.title : ''}
                inputProps={{ readOnly: true }}
            />

            <TextField
                label="Description"
                inputProps={{ readOnly: props.isFormDisabled }}
                multiline
                rows={8}
                value={props.taskData.description}
                sx={{ my: 1 }}
            />

            <Stack direction="row" spacing={3}>

                <TextField
                    label="ID"
                    value={props.taskData.id}
                    inputProps={{ readOnly: true }}
                    sx={{ width: 70 }}
                />

                <TextField
                    label="Author"
                    value={props.taskData.author}
                    inputProps={{ readOnly: true }}
                />

                <TextField
                    label="Creation date"
                    value={props.taskData.createDate}
                    inputProps={{ readOnly: true }}
                />

                <TextField
                    label="Last modification date"
                    value={props.taskData.modificationDate}
                    inputProps={{ readOnly: true }}
                />

            </Stack>

            <Stack direction="row" spacing={3}>

                <SelectInput
                    label='Status'
                    onChange={props.onStatusChange}
                    value={props.taskData.status}
                    options={['Open', 'In progress', 'Closed', 'Canceled']}
                    inputProps={{ readOnly: props.isFormDisabled }}
                    IconComponent={props.isFormDisabled ? '' : ArrowDropDownIcon}
                />

                <SelectInput
                    label='Category'
                    options={categories}
                    onChange={props.onCategoryChange}
                    value={categories.length ? props.taskData.category : ''}
                    inputProps={{ readOnly: props.isFormDisabled }}
                    IconComponent={props.isFormDisabled ? '' : ArrowDropDownIcon}
                />

                <SelectInput
                    label='Priority'
                    onChange={props.onPriorityChange}
                    value={props.taskData.priority}
                    structure='objects'
                    options={priorities}
                    inputProps={{ readOnly: props.isFormDisabled }}
                    IconComponent={props.isFormDisabled ? '' : ArrowDropDownIcon}
                />

            </Stack>

            <Stack direction="row" spacing={3}>

                <SelectInput
                    label='Current group'
                    onChange={props.onCurrentGroupChange}
                    value={groups.length ? props.taskData.currentGroup : ''}
                    options={groups}
                    inputProps={{ readOnly: props.isFormDisabled }}
                    IconComponent={props.isFormDisabled ? '' : ArrowDropDownIcon}
                />

                <SelectInput
                    label='Current user'
                    structure='objects'
                    value={currentUserOptionValue ? currentUserOptionValue.value : ''}
                    options={users}
                    onChange={props.onCurrentUserChange}
                    inputProps={{ readOnly: props.isFormDisabled }}
                    IconComponent={props.isFormDisabled ? '' : ArrowDropDownIcon}
                    sx={{ minWidth: 140 }}
                />

            </Stack>
        </Stack>
    )
};

export default TaskDetailForm;

