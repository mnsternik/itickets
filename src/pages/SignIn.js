import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { auth, db } from '../util/firebase';

import { Paper, TextField, Button, Typography } from "@mui/material"

const SignIn = () => {

    const dispatch = useDispatch();

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
        };

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return userCredential.user.uid;
            })
            .then((uid) => {
                // find user data in db with uid returned from firebase auth 
                onValue(ref(db, '/users/' + uid), (snapshot) => {
                    dispatch(authActions.signIn(snapshot.val()))
                });
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    setError('Invalid e-mail address.')
                } else if (error.code === 'auth/user-not-found') {
                    setError('User not found.')
                } else if (error.code === 'auth/wrong-password') {
                    setError('Wrong password')
                } else {
                    setError("Authentication error.");
                }
            });
    };

    return (
        <Paper sx={{
            minHeight: 340,
            width: 400,
            p: 4,
            mt: 6,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center'
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

            {error && <Typography variant="subtitle1" sx={{ my: 2, color: 'error.main' }}>
                {error}
            </Typography>}

            <Button
                variant="contained"
                onClick={signInHandler}
                sx={{ width: 180 }}
            >
                Login
            </Button>

        </Paper>
    )
};

export default SignIn; 