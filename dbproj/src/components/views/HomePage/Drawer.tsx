import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import GridViewIcon from '@mui/icons-material/GridView';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


type Anchor = 'left';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    
    left: false,
    
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width:  'auto'}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['All', 'Outer', 'Dress', 'Bag', 'Boots', 'Skirt', 'Cap', 'Tshirt', 'Watch'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <a href={"/category/" + text.toLowerCase()}>
            <ListItemButton>
              <ListItemIcon>
                {index===0 ? <GridViewIcon /> : <CheckroomIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
            </a>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Notice', 'Review','Q&A', 'FAQ'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index >1 ? <LiveHelpIcon /> : <AssignmentIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} style={{color:"transparent", fontSize:"1px", padding:"0"}}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
