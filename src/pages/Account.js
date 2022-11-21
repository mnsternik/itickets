import { useSelector, useDispatch } from 'react-redux';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

import { uiActions } from '../store/ui';


const Account = () => {

    const dispatch = useDispatch();
    const isDarkModeEnabled = useSelector(state => state.ui.isDarkModeEnabled);
    const userInfo = useSelector(state => state.auth)

    const handleChange = (event) => {
        dispatch(uiActions.toggleDarkMode())
    };

    return (
        <Paper
            component='form'
            sx={{
                minHeight: '500px',
                p: 4,
                my: 4,
                display: 'flex',
                flexDirection: 'column',
            }}>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: 100,
                justifyContent: 'space-between',
                mb: 5,
            }}>
                <Typography variant='h5'>
                    User info
                </Typography>
                <Typography variant='body1'>
                    Username: {userInfo.username}
                </Typography>
                <Typography variant='body1'>
                    E-mail: {userInfo.mail}
                </Typography>
            </Box>

            <Typography variant='h5'>
                Apperance
            </Typography>
            <FormControl component="fieldset" variant="standard" sx={{ m: 2 }} >
                <FormLabel component="legend">{isDarkModeEnabled ? 'Enabled' : 'Disabled'}</FormLabel>
                <FormControlLabel
                    control={
                        <Switch checked={isDarkModeEnabled} onChange={handleChange} name="darkMode" />
                    }
                    label="Dark Mode"
                />
            </FormControl>
        </Paper>
    );
};

export default Account; 