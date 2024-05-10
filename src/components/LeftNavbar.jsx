import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from 'react';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddCardIcon from '@mui/icons-material/AddCard';
import SendIcon from '@mui/icons-material/Send';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PaymentsIcon from '@mui/icons-material/Payments';
import MessageIcon from '@mui/icons-material/Message';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import StorageIcon from '@mui/icons-material/Storage';





const NavContent = [
  { text: 'DASHBOARD', subItems: [
    {text: 'Dashboard', icon: <DashboardCustomizeOutlinedIcon />, url: '/'},
    // {text: 'Wallets', icon: <DashboardCustomizeOutlinedIcon />, url: '/'}
  ],
  icon: ''
},

  { text: 'TRANSACTIONS', subItems: [
    {text:'Transactions', icon: <AccountBalanceWalletIcon />, url: '/transactions/'},
    {text: 'Deposit Money', icon: <AddCardIcon />, url: '/deposit/'}, 
    {text: 'Send Money', icon: <SendIcon />, url: '/moneytransfer/'}, 
    {text: 'Request Money', icon: <SwapCallsIcon />, url: '/request-payment/'}, 
    {text: 'Exchange Money', icon: <CurrencyExchangeIcon />, url: '/exchange-currency/'}, 
    {text: 'Withdrawls', icon: <PaymentsIcon />, url: '/'}, 
  ],
  icon:''},

  { text: 'OTHERS', subItems: [
    {text: 'Disputes', icon: <MessageIcon />, url: '/dispute/'},
    {text: 'Tickets', icon: <ConfirmationNumberIcon />, url: '/tickets/'},
    {text: 'Profile', icon: <AccountBoxIcon />, url: '/profile/'},
    {text: 'Verifications', icon: <SettingsIcon />, url: '/'},
  ],
  icon: ''},

  { text: 'ADDONS', subItems: [
    {text: 'Crypto Exchange', icon: <RotateRightIcon />, url: '/'},
    {text: 'Crypto Buy', icon: <RotateRightIcon />, url: '/crypto-buy/'},
    {text: 'Crypto Sell', icon: <RotateRightIcon />, url: '/crypto-sell/'},
    {text: 'Investments', icon: <StorageIcon />, url: '/'},
    ],
    icon: ''
  },

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




export default function LeftNavbar({handleDrawerClose, open}) {
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List style={{backgroundColor: '#0f3785', color: '#e7ebf2'}}>
          {NavContent.map((item, index) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleClick(index)} >
                {/* <ListItemIcon style={{color: '#e7ebf2'}}>
                  {item.icon}
                </ListItemIcon> */}
                <ListItemText primary={item.text} style={{color: 'orange'}} />
                  {/* {dropDown[index] ? <ExpandLess /> : <ExpandMore />} */}
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
}






























// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import UpperNavbar from './UpNavbar';
// import Collapse from '@mui/material/Collapse';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';



// const NavContent = [
//     {text: 'Dashboard', subItems: ['1', '2', '3']}, 
//     {text: 'Users', subItems: ['u1', 'u2', 'u3']},
//     {text: 'Transactions', subItems: ['T1', 'T2', 'T3'] },
//     {text: 'Revenues', subItems: ['R1', 'R2', 'R3']},
//     {text: 'Disputes', subItems: ['D1', 'D2', 'D3']}, 
//     {text: 'Tickets', subItems: ['T1', 'T2', 'T3']}, 
//     {text: 'Activity Logs', subItems: ['A1', 'A2', 'A3']}
// ]

// const Configuration = ['Currencies', 'Crypto Providers', 'Templates', 'Settings', 'System Update']
// const Addons = ['Agent', 'Crypto Exchange', 'investment', 'Addon Manager', 'Cache Clear']



// export default function LeftNavbar() {
//   const [open, setOpen] = React.useState(false);
//   const [dropDown, setDropDown] = React.useState({})

//   const handleClick = (index) => {
//     setOpen(prevOpen => ({ ...prevOpen, [index]: !prevOpen[index] }));
//   };

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };


//   const DrawerList = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//       <List>
//         {NavContent.map((item, index) => (
//             <>
//           <ListItem key={index} disablePadding>
//             <ListItemButton onClick={() => handleClick(index)}>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={item.text} />
//               {open[index] ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>
//           </ListItem>

//         <Collapse in={open[index]} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//             {item.subItems.map((subItem, subIndex) => (
//             <ListItem key={subIndex} disablePadding>
//             <ListItemButton>
//                 <ListItemText primary={subItem} />
//             </ListItemButton>
//             </ListItem>
//         ))}
//         </List>
//         </Collapse>
//         </>
//         ))}
//       </List>
//       <Divider />

//       <List>
//         {Configuration.map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />

//       <List>
//         {Addons.map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>

//     </Box>
//   );

//   return (
//     <div>
//         <UpperNavbar toggleDrawer={toggleDrawer(true)} />
//         <Drawer open={open} onClose={toggleDrawer(false)}>
//         {DrawerList}
//       </Drawer>
//     </div>
//   );
// }