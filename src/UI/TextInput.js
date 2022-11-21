import { useState } from 'react';
import TextField from '@mui/material/TextField';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    input: {
        "& .MuiInputBase-root.Mui-disabled": {
            color: "green"
        }

    }
});

const TextInput = (props) => {

    const [value, setValue] = useState('');
    const [isInputTouched, setIsInputTouched] = useState(false);
    const [isEnteredValueValid, setisEnteredValueValid] = useState(false);

    const classes = useStyles();

    const isInputInvalid = !isEnteredValueValid && isInputTouched;

    const onChangeHandler = (event) => {
        setValue(event.target.value);
        setisEnteredValueValid(validate(event.target.value));

        if (validate(event.target.value)) {
            props.onChangeHandler(event.target.value)
        }
    };

    const onBlurHandler = (event) => {
        setIsInputTouched(true);
    };

    const validate = (enteredValue) => {
        setisEnteredValueValid(props.validation ? props.validation(enteredValue) : enteredValue.trim() !== '');
    };

    return (
        <TextField
            inputProps={{ className: classes.input }}
            id={`input-${props.label}`}
            label={props.label}
            variant={props.variant || 'outlined'}
            size={props.size || 'small'}
            value={value}
            multiline={props.multiline || false}
            rows={props.rows || '1'}
            error={isInputInvalid}
            helperText={isInputInvalid && 'Invalid value.'}
            disabled={props.disabled || false}
            onChange={onChangeHandler}
            onBlur={props.onBlurHandler}
            sx={{ mx: 2 }}
            {...props}
        />
    );
};

export default TextInput;
