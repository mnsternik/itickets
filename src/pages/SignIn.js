import { useReducer, useState } from 'react';
import { signUserIn } from '../lib/api';

import { Stack, TextField, Button, Typography, Alert, Box } from "@mui/material"


const initLoginState = {
    email: '',
    password: '',
};

const SignIn = () => {

    const [loginState, dispatchLogin] = useReducer((state, action) => {
        return { ...state, ...action }
    }, initLoginState)

    const [error, setError] = useState(false)

    const submitHandler = (event) => {
        event.preventDefault();

        if (loginState.email.trim() === '' || loginState.password.trim() === '') {
            setError('Cannot be empty')
            return;
        }

        signUserIn(loginState.email, loginState.password, setError);
    };

    return (

        <Stack
            spacing={2}
            sx={{
                width: 420,
                mt: 12,
                mx: 'auto',
                textAlign: 'center'
            }}
        >

            <Typography variant="h5" sx={{ mx: 'auto', mb: 2 }}>
                Sign in
            </Typography>

            <Box component='form' onSubmit={submitHandler}>
                <TextField
                    label='E-mail'
                    value={loginState.email}
                    onChange={(e) => dispatchLogin({ email: e.target.value })}
                    sx={{ width: 240 }}
                />

                <TextField
                    label='Password'
                    value={loginState.password}
                    type="password"
                    onChange={(e) => dispatchLogin({ password: e.target.value })}
                    sx={{ width: 240, my: 1 }}
                />

                <Button
                    variant="contained"
                    type="submit"
                    sx={{ width: 240 }}
                >
                    Login
                </Button>

                {error && <Alert severity="error" sx={{ mx: 'auto', width: 240 }}>
                    {error}
                </Alert>}

            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: 200 }}>
                In case of problem contact our Helpdesk: <br />
                Phone number: <strong>+48 123-456-789</strong> <br />
                E-Mail: <strong>example@mail.com</strong>
            </Typography>

        </Stack>
    )
};

export default SignIn; 