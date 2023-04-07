import { useState } from 'react';
import { useSelector } from 'react-redux';
import SidebarSection from './SidebarSection';
import { Box, Drawer } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import AddIcon from '@mui/icons-material/Add';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CategoryIcon from '@mui/icons-material/Category';

const Sidebar = () => {

  const [showSidebar, setShowSidebar] = useState(true);

  const userGroup = useSelector(state => state.auth.userData.group);

  const tablesLinksData = [
    { text: 'Assigned to user', path: '/user-tasks', icon: <PersonIcon color='primary' /> },
    { text: 'Assigned to group', path: '/group-tasks', icon: <GroupsIcon color='primary' /> },
    { text: 'Created by user', path: '/user-created-tasks', icon: <PersonOutlineIcon color='primary' /> },
  ];

  const actionsLinksData = [
    { text: 'Create task', path: '/newtask', icon: <AddIcon color='primary' /> },
    { text: 'Search', path: '/search', icon: <ManageSearchIcon color='primary' /> },
  ];

  const accountLinksData = [
    { text: 'Account', path: '/account', icon: <AccountBoxIcon color='primary' /> },
  ];

  const administrationLinksData = [
    { text: 'Register user', path: '/register-user', icon: <PersonAddIcon color='primary' /> },
    { text: 'Manage users', path: '/manage-users', icon: <ManageAccountsIcon color='primary' /> },
    { text: 'Manage groups ', path: '/manage-groups', icon: <GroupAddIcon color='primary' /> },
    { text: 'Manage categories', path: '/manage-categories', icon: <CategoryIcon color='primary' /> }
  ];

  const toggleSidebar = () => {
    setShowSidebar(prevState => !prevState);
  };

  return (
    <Drawer
      open={showSidebar}
      onClose={toggleSidebar}
      anchor={'left'}
      variant="permanent"
      sx={{
        width: 270,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 270,
          boxSizing: 'border-box',
        },
      }}
    >

      <Box
        sx={{ width: 260 }}
        role="presentation"
        onClick={toggleSidebar}
        onKeyDown={toggleSidebar}
      >

        <SidebarSection title={'Tasks'} listItems={tablesLinksData} />
        <SidebarSection title={'Actions'} listItems={actionsLinksData} />
        <SidebarSection title={'Settings'} listItems={accountLinksData} />
        {userGroup === 'Helpdesk' && <SidebarSection title={'Administration'} listItems={administrationLinksData} />}

      </Box>

    </Drawer>
  );
}

export default Sidebar;




