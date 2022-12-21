import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { auth } from "../util/firebase";
import { signOut } from "firebase/auth";

import { Typography, Box, Button } from "@mui/material";

const SignOut = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.signOut());
        signOut(auth);
    }, [dispatch])

    const redirectToSignIn = () => {
        navigate("/sign-in");
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: 500,
            mx: 'auto',
            mt: 12
        }}>
            <Typography variant="h6" sx={{ alignSelf: 'center', mb: 4 }}>
                You've been logged out successfully
            </Typography>
            <Button variant="contained" onClick={redirectToSignIn}>
                Sign in
            </Button>
        </Box>

    )
};

export default SignOut;