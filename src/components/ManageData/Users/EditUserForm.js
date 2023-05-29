import { useState, useReducer } from 'react';
import { updateUserData } from '../../../lib/api';

import SelectInput from '../../../UI/SelectInput';

import { Stack, Typography, Button, TextField, Divider, Alert } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const initUserState = {
    uid: '',
    name: '',
    email: '',
    group: '',
};

const EditUserForm = (props) => {

    const [isFormReadOnly, setIsFormReadOnly] = useState(true);
    const [isFormTouched, setIsFormTouched] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(null);

    const [userState, dispatchFormData] = useReducer((state, action) => {
        if (action.type === 'selected_user_change') {
            setIsFormReadOnly(true);
            setIsFormTouched(false);
        } else {
            setIsFormTouched(true);
        }

        return { ...state, ...action.payload }
    }, initUserState)

    const alertMessage = error ? error : 'User updated successfully';

    const allUsersSelectOptions = props.allUsers.map(user => ({ name: user.name, value: user.uid }))

    const selectedUserChangeHandler = (event) => {
        const selectedUser = props.allUsers.find(user => user.uid === event.target.value);
        dispatchFormData({ payload: selectedUser, type: 'selected_user_change' })
    };

    const cancelClickHandler = () => {
        dispatchFormData({ payload: initUserState, type: 'selected_user_change' })
    };

    const validateUserData = () => {
        if (userState.name.trim() === '') {
            setError('Username cannot be empty');
            return false;
        } else if (userState.email.trim() === '') {
            setError('Email cannot be empty');
            return false;
        } else if (!userState.email.includes('@')) {
            setError('Invalid e-mail address')
            return false;
        }
        return true;
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setError(null);
        if (!validateUserData()) {
            setShowAlert(true);
            return;
        }
        updateUserData(userState, setError)
        if (error) {
            setShowAlert(true)
            return;
        }
        setIsFormReadOnly(true);
        setShowAlert(true);
    };

    return (
        <Stack spacing={3} sx={{ width: 420 }} >

            <Typography variant={'h6'}>
                Edit existing user
            </Typography>

            <SelectInput
                label='Select user'
                structure='objects'
                options={allUsersSelectOptions}
                value={userState.uid}
                onChange={selectedUserChangeHandler}
            />

            <Divider />

            <Stack component='form' id='editUserForm' onSubmit={submitHandler} spacing={1}>

                <TextField
                    label='Username'
                    value={userState.name}
                    inputProps={{ disabled: isFormReadOnly }}
                    disabled={isFormReadOnly}
                    onChange={e => dispatchFormData({ payload: { name: e.target.value } })}
                />

                <TextField
                    label='E-mail'
                    value={userState.email}
                    disabled={isFormReadOnly}
                    onChange={e => dispatchFormData({ payload: { email: e.target.value } })}
                />

                <SelectInput
                    label='Group'
                    value={userState.group}
                    options={props.groups}
                    disabled={isFormReadOnly}
                    IconComponent={isFormReadOnly ? '' : ArrowDropDownIcon}
                    onChange={e => dispatchFormData({ payload: { group: e.target.value } })}
                />


                <Stack direction="row" spacing={2}>

                    {!isFormReadOnly && <Button
                        variant={'contained'}
                        type='submit'
                        size='large'
                        disabled={!isFormTouched}
                    >
                        Save
                    </Button>}


                    {isFormReadOnly && <Button
                        variant={'contained'}
                        size='large'
                        disabled={!userState.uid}
                        onClick={() => setIsFormReadOnly(isReadOnly => !isReadOnly)}
                    >
                        Edit
                    </Button>}

                    {!isFormReadOnly && <Button onClick={cancelClickHandler} size='large'>
                        Cancel
                    </Button>}

                </Stack>

                {userState.uid && <Button variant='outlined'>Send password reset email</Button>}

                {showAlert && <Alert severity={error ? 'error' : 'success'} onClose={() => setShowAlert(false)}>
                    {alertMessage}
                </Alert>}

            </Stack>
        </Stack>
    )
};

export default EditUserForm;