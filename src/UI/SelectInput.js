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
        <FormControl sx={{ ...props.sx, minWidth: 120, width: 'auto' }}>

            <InputLabel id={props.labelId || props.label + 'LabelId'}>
                {props.label}
            </InputLabel>

            <Select
                labelId={props.labelId || props.label + 'LabelId'}
                id={props.id || props.label + 'Id'}
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
