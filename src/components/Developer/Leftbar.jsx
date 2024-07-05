import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import TextSnippetSharpIcon from '@mui/icons-material/TextSnippetSharp';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';






const NavContent = [
  { text: 'GETTING STARTED', subItems: [
    {text: 'Introduction', icon: <TextSnippetSharpIcon />, url: '/dev/docs/intro/'},
    {text: 'UI Flow', icon: <TextSnippetSharpIcon />, url: '/dev/docs/intro/'},
    {text: 'UAT Testing', icon: <TextSnippetSharpIcon />, url: '/dev/docs/intro/'},
  ],
  icon: ''
},

  { text: 'PG CHECKOUT APIS', subItems: [
    {text:'Payment API', icon: <TextSnippetSharpIcon />, url: '/dev/docs/intro/'},
    {text: 'UI Callback', icon: <TextSnippetSharpIcon />, url: '/dev/docs/intro/'}, 
    {text: 'S2S Callback', icon: <TextSnippetSharpIcon />, url: '/dev/docs/intro/'}, 
    {text: 'Transaction Status', icon: <TextSnippetSharpIcon />, url: '/dev/docs/intro/'}, 
    {text: 'Refund', icon: <TextSnippetSharpIcon />, url: '/dev/docs/intro/'},  

  ],
  icon:''},

  { text: 'BACKEND SDK', subItems: [
    {text: 'PHP SDK', icon: <TextSnippetSharpIcon />, url: '/dev/docs/intro/'},
    {text: 'Python SDK', icon: <TextSnippetSharpIcon />, url: '/dev/docs/intro/'},
    {text: 'Java SDK', icon: <TextSnippetSharpIcon />, url: '/dev/docs/intro/'},
    {text: 'Go SDK', icon: <TextSnippetSharpIcon />, url: '/dev/docs/intro/'},
  ],
  icon: ''},

];



const drawerWidth = 240;


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));




export default function DevLeftNavbar({handleDrawerClose, open}) {
  const theme = useTheme();
  const [dropDown, setDropdown] = React.useState({});



  const handleClick = (index) => {
    setDropdown(prevOpen => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  return(
    <>
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            // backgroundColor: '#0f3785'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{backgroundColor: '#0f3785', color: 'white'}}>
          <GoogleIcon /> &nbsp;&nbsp;<p className='my-3'><b>Itio Innovex</b></p>
          <IconButton onClick={handleDrawerClose} style={{color: 'white'}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List style={{backgroundColor: '#0f3785', color: '#e7ebf2'}}>
          {NavContent.map((item, index) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleClick(index)} >
                
                <ListItemText primary={item.text} style={{color: 'orange'}} />
              </ListItemButton>
            </ListItem>
           
            {/* <Collapse in={dropDown[index]} timeout="auto" unmountOnExit > */}
              <List component="div" disablePadding >
                {item.subItems.map((subItem, subIndex) => (
                  <ListItem key={subIndex} disablePadding >
                    <ListItemButton component="a" href={subItem.url} rel="noopener noreferrer">
                    <ListItemIcon style={{ color: 'white' }}>
                      {subItem.icon}
                    </ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            {/* </Collapse> */}
        </React.Fragment>
      ))}
        </List>
        {/* <Divider/> */}

      
      </Drawer>
    </>
  )
};

