import { useSelector } from 'react-redux';

import { Box, TextField } from '@mui/material';
import SelectInput from "../../UI/SelectInput";


const NewTaskForm = (props) => {

    const priorities = useSelector(state => state.tasks.priorities);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            minHeight: 380,
            mt: 3
        }}>

            <TextField
                label='Title'
                value={props.title}
                onChange={props.onTitleChange}
                sx={{ mx: 1 }}
            />

            <TextField
                label="Description"
                value={props.description}
                multiline
                rows="5"
                onChange={props.onDescriptionChange}
                sx={{ mx: 1 }}
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

        </Box>
    )
};

export default NewTaskForm;

/*                error={isTitleInvalid}
                helperText={isTitleInvalid && 'Cannot be empty.'}


*/ 