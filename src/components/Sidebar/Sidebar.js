import { useState } from 'react';
import { useSelector } from 'react-redux';
import SidebarSection from './SidebarSection';
import { Box, Drawer } from '@mui/material';

const Sidebar = () => {

  const [showSidebar, setShowSidebar] = useState(true);

  const isAdmin = useSelector(state => state.auth.isAdmin);

  const tablesLinksData = [
    { text: 'Assigned to user', path: '/user-tasks' },
    { text: 'Assigned to group', path: '/group-tasks' },
    { text: 'Created by user', path: '/user-created-tasks' },
  ];

  const actionsLinksData = [
    { text: 'Create task', path: '/newtask' },
    { text: 'Search', path: '/search' },
  ];

  const accountLinksData = [
    { text: 'Account', path: '/account' },
    { text: 'Logout', path: '/logout' },
  ];

  const administrationLinksData = [
    { text: 'Manage users', path: '/manage-users' },
    { text: 'Manage groups ', path: '/manage-groups' },
    { text: 'Manage categories', path: '/manage-categories' }

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
        {isAdmin && <SidebarSection title={'Administration'} listItems={administrationLinksData} />}

      </Box>

    </Drawer>
  );
}

export default Sidebar;




