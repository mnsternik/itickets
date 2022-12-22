import { useSelector } from 'react-redux';

import { Stack, TextField } from '@mui/material';
import SelectInput from "../../UI/SelectInput";


const NewTaskForm = (props) => {

    const priorities = useSelector(state => state.tasks.priorities);

    return (
        <Stack spacing={1}>

            <TextField
                label='Title'
                value={props.title}
                onChange={props.onTitleChange}
            />

            <TextField
                label="Description"
                value={props.description}
                multiline
                rows="5"
                onChange={props.onDescriptionChange}
            />

            <SelectInput
                label='Priority'
                onChange={props.onPriorityChange}
                value={props.priority}
                structure='objects'
                options={priorities}
                inputProps={{ readOnly: props.isFormDisabled }}
                sx={{ width: 180 }}
            />

            <SelectInput
                label='Category'
                value={props.category}
                onChange={props.onCategoryChange}
                options={props.categories}
                sx={{ width: 180 }}
            />

        </Stack>
    )
};

export default NewTaskForm;
