import { useState } from "react";
import { writeNewUserData } from "../../../lib/api";

import SelectInput from "../../../UI/SelectInput"

import { TextField, Box, Typography, Button } from "@mui/material"


const AddUserForm = (props) => {

    const { groups } = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [group, setGroup] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [error, setError] = useState(null);

    const nameInputChangeHandler = (event) => {
        setName(event.target.value);
    };

    const emailInputChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const groupSelectChangeHandler = (event) => {
        setGroup(event.target.value);
    };

    const passwordInputChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const repeatedPasswordInputChangeHandler = (event) => {
        setRepeatedPassword(event.target.value);
    };

    const validateUserData = (userData) => {
        const inputValues = [];
        for (let valKey in userData) {
            inputValues.push(userData[valKey])
        }

        if (inputValues.some(val => val.trim() === '')) {
            setError('All data must be filled');
            return false;
        } else if (password.length < 6) {
            setError('Password must be at least 6 characters long.')
            return false;
        } else if (password !== repeatedPassword) {
            setError('Passwords are not the same.')
            return false;

        } else if (!email.includes('@')) {
            setError('Wrong E-mail address')
            return false;
        }

        return true;
    };

    const clearForm = () => {
        setName('');
        setEmail('');
        setGroup('');
        setPassword('');
        setRepeatedPassword('');
    };

    const addUserHandler = () => {

        const userData = {
            name: name,
            email: email,
            group: group,
            //isAdmin 
        };

        if (!validateUserData(userData)) {
            return;
        }

        writeNewUserData(userData, password, setError);

        if (error) {
            return;
        }

        clearForm();
    };

    return (
        <Box elevaion={3}>

            <Typography variant="subtitle1" sx={{ my: 2 }}>
                Create new user
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', minHeight: 480 }}>

                <TextField
                    label="Name"
                    sx={{ mx: 1, width: 320 }}
                    value={name}
                    onChange={nameInputChangeHandler}
                />

                <TextField
                    label="E-Mail"
                    value={email}
                    onChange={emailInputChangeHandler}
                    sx={{ mx: 1, width: 320 }}
                />

                <SelectInput
                    label='Group'
                    options={groups}
                    defaultValue={''}
                    value={group}
                    onChange={groupSelectChangeHandler}
                    sx={{ width: 320 }}
                />

                <TextField
                    label="Pasword"
                    type="password"
                    value={password}
                    onChange={passwordInputChangeHandler}
                    sx={{ mx: 1, width: 320 }}

                />

                <TextField
                    label="Repeat password"
                    type="password"
                    value={repeatedPassword}
                    onChange={repeatedPasswordInputChangeHandler}
                    sx={{ mx: 1, width: 320 }}
                />

                {error && <Typography variant="subtitle1" sx={{ my: 2, color: 'error.main' }}>
                    {error}
                </Typography>}

                <Button
                    variant='contained'
                    sx={{ m: 1, width: 180 }}
                    onClick={addUserHandler}
                >
                    Add user
                </Button>

            </Box>
        </Box>
    )
};

export default AddUserForm; 