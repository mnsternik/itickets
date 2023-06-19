import { useSelector } from 'react-redux';

import Sidebar from '../components/Sidebar/Sidebar';
import Bar from '../components/Bar/Bar';
import LoadingModal from './LoadingModal';
import Theme from '../UI/Theme';

import { Container, Box } from '@mui/material';

function RootLayout(props) {

    const userRole = useSelector(state => state.auth.userData.role);
    const isLoading = useSelector(state => state.ui.isLoading);

    return (
        <Theme>
            {userRole && <Bar />}
            <Box sx={{ display: 'flex' }}>
                {userRole && <Sidebar />}
                <Container>
                    {isLoading ? <LoadingModal /> : props.children}
                </Container>
            </Box>
        </Theme>
    );
}

export default RootLayout;
