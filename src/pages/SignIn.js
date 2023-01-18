import { useState } from 'react';
import { signUserIn } from '../lib/api';

import { Paper, TextField, Button, Typography, Divider } from "@mui/material"

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const signInHandler = () => {
        if (email.trim() === '' || password.trim() === '') {
            setError('Incorecct login data.')
            return;
        }
        signUserIn(email, password, setError);
    };

    return (
        <Paper elevation={2} sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            minHeight: 440,
            width: 600,
            p: 2,
            mx: 'auto',
            mt: 6,
        }}>

            <Typography variant="h5" sx={{ mx: 'auto', mb: 2 }}>
                Sign in
            </Typography>

            <TextField
                label='E-mail'
                value={email}
                onChange={emailChangeHandler}
                sx={{ width: 240 }}
            />

            <TextField
                label='Password'
                value={password}
                type="password"
                onChange={passwordChangeHandler}
                sx={{ width: 240 }}
            />

            {error && <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {error}
            </Typography>}



            <Button
                variant="contained"
                onClick={signInHandler}
                sx={{ width: 180 }}
            >
                Login
            </Button>

            <Divider />

            <Typography variant="subtitle2" sx={{ fontWeight: 200 }}>
                In case of problem, contact our Helpdesk: <br />
                Phone number: (+48 123-456-789) <br />
                E-Mail: example@mail.com
            </Typography>

        </Paper>
    )
};

export default SignIn; 