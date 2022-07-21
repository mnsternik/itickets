import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {

  const [showSidebar, setShowSidebar] = useState(false);

  //should prevState => be here? 
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const links = [
    { text: 'Home', path: '/' },
    { text: 'Tasks', path: '/tasks' },
    { text: 'Search', path: '/search' },
    { text: 'New Task', path: '/newtask' },
  ];

  const lowerLinks = [
    { text: 'Account', path: '/account' },
    { text: 'Logout', path: '/logout' },
  ];

  const sidebarList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleSidebar}
      onKeyDown={toggleSidebar}
    >
      <List>
        {links.map((link, index) => (
          <ListItem key={link.text} disablePadding>
            <ListItemButton component={NavLink} to={link.path}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {lowerLinks.map((link, index) => (
          <ListItem key={link.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <div>
      <MenuIcon onClick={toggleSidebar} fontSize="large" sx={{
        position: 'absolute',
        right: '24px',
        top: '24px'

      }} />
      <Drawer open={showSidebar} onClose={toggleSidebar} anchor={'left'}>
        {sidebarList}
      </Drawer>
    </div>
  );
}

export default Sidebar;




