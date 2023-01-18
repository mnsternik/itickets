import { useSelector } from "react-redux";
import { signUserOut } from "../../lib/api";

import { Stack, Typography, Button, Divider } from "@mui/material";

const Bar = () => {

    const loggedUser = useSelector(state => state.auth.userData.name);

    const logoutHandler = () => {
        signUserOut()
    };

    return (
        <Stack direction='row' sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: 40,
            mt: 2,
            mb: 3,
            mr: 5,
            lineHeight: 40,
            textAlign: 'center'
        }}>
            <Typography variant='subtitle2' sx={{ mr: 2, my: 'auto', fontWeight: '100' }}>
                Logged as  <strong>{loggedUser}</strong>
            </Typography>

            <Divider orientation='vertical' />

            <Button sx={{ mx: 1 }} onClick={logoutHandler}>
                LOGOUT
            </Button>
        </Stack>
    )
};

export default Bar; 