import { useState, useEffect } from "react";
import { writeNewUserData, readAllGroupsData } from "../lib/api";

import SelectInput from "../UI/SelectInput";

import { TextField, Button, Stack, Alert, Paper, Typography } from "@mui/material"


const AddUserForm = () => {

    const [allGroups, setAllGroups] = useState([]);
    const groupsNamesArr = allGroups.map(group => group.name);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [group, setGroup] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const [error, setError] = useState(null);

    const [showAlert, setShowAlert] = useState(false);
    const alertMessage = error ? error : 'New user created'

    useEffect(() => {
        readAllGroupsData(setAllGroups);
    }, [])

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

    const closeAlertHandler = () => {
        setShowAlert(false);
    }

    const validateUserData = (userData) => {
        const inputValues = [];
        for (let valKey in userData) {
            inputValues.push(userData[valKey])
        }
        if (inputValues.some(val => val.trim() === '')) {
            setError('All data must be filled');
            return false;
        } else if (password !== repeatedPassword) {
            setError('Passwords are not the same')
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
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setError(null);

        const userData = {
            name: name,
            email: email,
            group: group,
            //isAdmin 
        };

        if (!validateUserData(userData)) {
            setShowAlert(true);
            return;
        }

        writeNewUserData(userData, password, setError, clearForm);
        setShowAlert(true);
    };

    return (
        <Paper sx={{ p: 4 }}>

            <Typography variant='h5' sx={{ fontWeight: 500, mb: 2, p: 2 }}>
                Register user
            </Typography>

            <Stack component='form' onSubmit={submitHandler} spacing={1} sx={{ width: 420 }}>

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
                    options={groupsNamesArr}
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

                <Button
                    variant='contained'
                    type='submit'
                    size='large'
                    sx={{ width: 120 }}
                >
                    Add user
                </Button>

                {showAlert && <Alert severity={error ? 'error' : 'success'} onClose={closeAlertHandler}>
                    {alertMessage}
                </Alert>}
            </Stack>
        </Paper>
    )
};

export default AddUserForm; 