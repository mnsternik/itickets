import { Outlet, useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Sidebar from '../components/Sidebar/Sidebar';
import Bar from '../components/Bar/Bar';
import Theme from '../UI/Theme';

import { Container, Box } from '@mui/material';

function RootPage() {

    const token = useSelector(state => state.auth.token);
    // const navigation = useNavigation();

    return (
        <Theme>
            {token && <Bar />}
            <Box sx={{ display: 'flex' }}>
                {token && <Sidebar />}
                <Container>
                    <Outlet />
                </Container>
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
            </Box>
        </Theme>
    );
}

export default RootPage;