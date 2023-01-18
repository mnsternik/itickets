import { useSelector, useDispatch } from 'react-redux';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { TextField } from '@mui/material';

import { uiActions } from '../store/ui';


const Account = () => {

    const dispatch = useDispatch();
    const isDarkModeEnabled = useSelector(state => state.ui.isDarkModeEnabled);
    const userData = useSelector(state => state.auth.userData);

    const handleChange = () => {
        dispatch(uiActions.toggleDarkMode())
    };

    return (
        <Paper sx={{ p: 3 }}>

            <Stack spacing={4}>

                <Typography variant='h5'>
                    User informations
                </Typography>

                <Stack spacing={2} sx={{ width: 320 }}>

                    <TextField
                        label='Username'
                        value={userData.name}
                        inputProps={{ readOnly: true }}
                    />

                    <TextField
                        label='E-mail'
                        value={userData.email}
                        inputProps={{ readOnly: true }}
                    />

                    <TextField
                        label='Group'
                        value={userData.group}
                        inputProps={{ readOnly: true }}
                    />

                </Stack>

                <Typography variant='h5'>
                    Apperance
                </Typography>

                <FormControl
                    component="fieldset"
                    variant="standard"
                    sx={{ m: 2 }}
                >

                    <FormLabel component="legend">{isDarkModeEnabled ? 'Enabled' : 'Disabled'}</FormLabel>
                    <FormControlLabel
                        label="Dark Mode"
                        control={
                            <Switch checked={isDarkModeEnabled} onChange={handleChange} name="darkMode" />
                        }
                    />

                </FormControl>

            </Stack>

        </Paper>
    );
};

export default Account; 