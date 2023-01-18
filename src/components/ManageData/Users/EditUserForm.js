import { useState } from 'react';

import SelectInput from '../../../UI/SelectInput';

import { Stack, Typography, Button, TextField, Divider } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const EditUserForm = (props) => {

    const [selectedUserId, setSelectedUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [group, setGroup] = useState('');
    const [isFormReadOnly, setIsFormReadOnly] = useState(true);
    const [isFormTouched, setIsFormTouched] = useState(false);


    const allUsersSelectOptions = props.allUsers.map(user => ({ name: user.name, value: user.uid }))

    const selectedUserChangeHandler = (event) => {
        const selectedUser = props.allUsers.find(user => user.uid === event.target.value);
        setIsFormReadOnly(true);
        setIsFormTouched(false);
        setSelectedUserId(selectedUser.uid);
        setEmail(selectedUser.email);
        setUsername(selectedUser.name);
        setGroup(selectedUser.group);
    };

    const usernameInputChangeHandler = (event) => {
        setUsername(event.target.value);
        setIsFormTouched(true);
    };

    const emailInputChangeHandler = (event) => {
        setEmail(event.target.value);
        setIsFormTouched(true);
    };

    const groupSelectChangeHandler = (event) => {
        setGroup(event.target.value);
        setIsFormTouched(true);
    };

    const toggleFormHandler = () => {
        setIsFormReadOnly(prevState => !prevState);
    }

    const cancelClickHandler = () => {
        setIsFormReadOnly(true);
        setIsFormTouched(false);
        setUsername('');
        setEmail('');
        setGroup('');
    }

    const saveClickHandler = () => {

    }

    return (
        <Stack spacing={3} sx={{ width: 420 }} >

            <Typography variant={'h6'}>
                Edit existing user
            </Typography>

            <SelectInput
                label='Select user'
                structure='objects'
                options={allUsersSelectOptions}
                value={selectedUserId}
                onChange={selectedUserChangeHandler}
            />

            <Divider />

            <Stack spacing={1}>

                <TextField
                    label='Username'
                    value={username}
                    onChange={usernameInputChangeHandler}
                    inputProps={{ disabled: isFormReadOnly }}
                    disabled={isFormReadOnly}
                />

                <TextField
                    label='E-mail'
                    value={email}
                    onChange={emailInputChangeHandler}
                    disabled={isFormReadOnly}
                />

                <SelectInput
                    label='Group'
                    value={group}
                    onChange={groupSelectChangeHandler}
                    options={props.groups}
                    disabled={isFormReadOnly}
                    IconComponent={isFormReadOnly ? '' : ArrowDropDownIcon}
                />

            </Stack>

            <Stack direction="row" spacing={2}>

                {isFormReadOnly && <Button
                    variant={'contained'}
                    size='large'
                    onClick={toggleFormHandler}
                    disabled={!selectedUserId}
                >
                    Edit
                </Button>}

                {!isFormReadOnly && <Button
                    variant={'contained'}
                    onClick={toggleFormHandler}
                    size='large'
                    disabled={!isFormTouched}
                >
                    Save
                </Button>}

                {!isFormReadOnly && <Button onClick={cancelClickHandler} size='large'>
                    Cancel
                </Button>}

            </Stack>

        </Stack>
    )
};

export default EditUserForm