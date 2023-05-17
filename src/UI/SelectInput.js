import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const SelectInput = (props) => {

    let options = [];
    if (props.structure === 'objects' && props.options) {
        options = props.options.map((option) => {
            return (
                <MenuItem
                    key={option.value + 'Key'}
                    value={option.value}
                    sx={{ my: 'auto' }}
                >
                    {option.name}
                </MenuItem>
            )
        });
    } else if (props.options) {
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
            sx={{ ...props.sx, minWidth: 120, width: 'auto' }}
            id={props.label + '-select-form-control-id'}
        >

            <InputLabel
                id={props.label + '-select-label-id'}
                htmlFor={props.label + '-select-id'}
            >
                {props.label}
            </InputLabel>

            <Select
                id={props.label + '-select-id'}
                aria-label={props.label}
                defaultValue=''
                size={props.size || 'medium'}
                {...props}
            >
                {options}
            </Select>

        </FormControl>
    );
};

export default SelectInput;
