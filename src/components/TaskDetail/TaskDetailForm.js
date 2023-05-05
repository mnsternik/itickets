import { useSelector } from 'react-redux';

import { TextField, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import SelectInput from "../../UI/SelectInput";

const TaskDetailForm = (props) => {

    const prioritiesSelectOptions = useSelector(state => state.tasks.priorities);
    const statusesSelectOptions = useSelector(state => state.tasks.statuses).map(s => s.name);

    const groupsSelectOptions = props.groups.map(group => group.name)
    const categoriesSelectOptions = props.categories.map(category => category.name);
    const groupMembersSelectOptions = props.users
        .filter(user => user.group === props.taskData.currentGroup)
        .map(user => ({ name: user.name, value: user.uid }));
    const currentUserOptionValue = groupMembersSelectOptions.find(user => user.value === props.taskData.currentUserId);

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
                    value={props.taskData.status}
                    options={statusesSelectOptions}
                    inputProps={{ readOnly: props.isFormDisabled }}
                    IconComponent={props.isFormDisabled ? '' : ArrowDropDownIcon}
                    onChange={(e) => props.onSelectChange({ status: e.target.value })}
                />

                <SelectInput
                    label='Category'
                    options={categoriesSelectOptions}
                    value={props.categories.length ? props.taskData.category : ''}
                    inputProps={{ readOnly: props.isFormDisabled }}
                    IconComponent={props.isFormDisabled ? '' : ArrowDropDownIcon}
                    onChange={(e) => props.onSelectChange({ category: e.target.value })}
                />

                <SelectInput
                    label='Priority'
                    structure='objects'
                    options={prioritiesSelectOptions}
                    value={props.taskData.priority}
                    inputProps={{ readOnly: props.isFormDisabled }}
                    IconComponent={props.isFormDisabled ? '' : ArrowDropDownIcon}
                    onChange={(e) => props.onSelectChange({ priority: e.target.value })}
                />

            </Stack>

            <Stack direction="row" spacing={3}>

                <SelectInput
                    label='Current group'
                    options={groupsSelectOptions}
                    value={props.groups.length ? props.taskData.currentGroup : ''}
                    inputProps={{ readOnly: props.isFormDisabled }}
                    IconComponent={props.isFormDisabled ? '' : ArrowDropDownIcon}
                    onChange={props.onCurrentGroupChange}
                />

                <SelectInput
                    label='Current user'
                    structure='objects'
                    options={groupMembersSelectOptions}
                    value={currentUserOptionValue ? currentUserOptionValue.value : ''}
                    inputProps={{ readOnly: props.isFormDisabled }}
                    IconComponent={props.isFormDisabled ? '' : ArrowDropDownIcon}
                    sx={{ minWidth: 140 }}
                    onChange={props.onCurrentUserChange}
                />

            </Stack>
        </Stack>
    )
};

export default TaskDetailForm;

