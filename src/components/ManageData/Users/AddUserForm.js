import { useState } from "react";
import { writeNewGroupMember, writeNewUserData } from "../../../lib/api";

import SelectInput from "../../../UI/SelectInput"

import { TextField, Typography, Button, Stack, Paper } from "@mui/material"


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
            setError('Password must be at least 6 characters long')
            return false;
        } else if (password !== repeatedPassword) {
            setError('Passwords are not the same')
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
        <Stack spacing={3}>

            <Typography variant={'h6'}>
                Create new user
            </Typography>

            <Stack spacing={1} sx={{ width: 420 }}>

                <TextField
                    label="Name"
                    value={name}
                    onChange={nameInputChangeHandler}
                />

                <TextField
                    label="E-Mail"
                    value={email}
                    onChange={emailInputChangeHandler}
                />

                <SelectInput
                    label='Group'
                    options={groups}
                    defaultValue={''}
                    value={group}
                    onChange={groupSelectChangeHandler}
                />

                <TextField
                    label="Pasword"
                    type="password"
                    value={password}
                    onChange={passwordInputChangeHandler}
                />

                <TextField
                    label="Repeat password"
                    type="password"
                    value={repeatedPassword}
                    onChange={repeatedPasswordInputChangeHandler}
                />

            </Stack>

            {error && <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {error}
            </Typography>}

            <Button
                variant='contained'
                size='large'
                sx={{ width: 120 }}
                onClick={addUserHandler}
            >
                Add user
            </Button>

        </Stack>
    )
};

export default AddUserForm; 