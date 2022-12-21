import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const SelectInput = (props) => {

    let options;
    if (props.structure === 'objects') {
        options = props.options.map((option) => {
            return (
                <MenuItem
                    key={option.name + 'Key'}
                    value={option.value}
                    sx={{ my: 'auto' }}
                >
                    {option.name}
                </MenuItem>
            )
        });
    } else {
        options = props.options.map((option) => {
            return (
                <MenuItem
                    key={option + 'Key'}
                    value={option}
                    sx={{ py: 'auto' }}
                >
                    {option}
                </MenuItem>
            )
        });
    }


    return (
        <FormControl
            fullWidth={props.fullWidth || false}
            sx={{ mx: 1 }}>

            <InputLabel id={props.labelId || props.label + 'LabelId'}>
                {props.label}
            </InputLabel>

            <Select
                labelId={props.labelId || props.label + 'LabelId'}
                id={props.id || props.label + 'Id'}
                defaultValue=''
                onChange={props.onChange}
                size={props.size || 'medium'}
                {...props}
            >
                {options}
            </Select>

        </FormControl>
    );
};

export default SelectInput;

/*<FormControl error={isPriorityInvalid}>
<InputLabel size="small" id="priority-label">Priority</InputLabel>
<Select
    labelId="priority-label"
    id="priority"
    value={props.priority}
    label="Priority"
    size="small"
    onChange={props.onPriorityChange}
    onBlur={priorityBlurHandler}
    sx={{ width: '180px', textAlign: 'center' }}
>
    {prioritiesList}
</Select>
{isPriorityInvalid && <FormHelperText>Please choose priority.</FormHelperText>}
</FormControl>*/