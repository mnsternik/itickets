import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';

const SidebarSection = (props) => {

    const { listItems, title } = props;

    const sectionListItems = listItems.map(item => (
        <ListItem key={item.text} disablePadding>
            <ListItemButton
                component={NavLink}
                to={item.path}
                end
                style={(navData) => navData.isActive ? { backgroundColor: '#1976d2' } : {}}
            >
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItemButton>
        </ListItem>
    ));

    return (
        <>
            <Divider>
                <Typography
                    variant='subtitle2'
                    sx={{
                        color: '#9e9e9e',
                        textTransform: 'uppercase',
                        fontSize: 12
                    }}>
                    {title}
                </Typography>
            </Divider>

            <List>{sectionListItems}</List>
        </>
    )
}

export default SidebarSection; 