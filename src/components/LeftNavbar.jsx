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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';



const is_merchant = localStorage.getItem('is_merchant') === 'true';




const NavContent = [
  { text: 'DASHBOARD', subItems: [
    {text: 'Dashboard', icon: <DashboardCustomizeOutlinedIcon />, url: '/'},
    // {text: 'Wallets', icon: <DashboardCustomizeOutlinedIcon />, url: '/'}
  ],
  icon: ''
},

  { text: 'FIAT', subItems: [
    {text:'Transactions', icon: <AccountBalanceWalletIcon />, url: '/transactions/'},
    {text: 'Deposit Money', icon: <AddCardIcon />, url: '/deposit/'}, 
    {text: 'Send Money', icon: <SendIcon />, url: '/moneytransfer/'}, 
    {text: 'Exchange Money', icon: <CurrencyExchangeIcon />, url: '/exchange-currency/'}, 
    {text: 'Exchange List', icon: <CurrencyExchangeIcon />, url: '/exchange/list/'}, 
    {text: 'Withdrawal Money', icon: <PaymentsIcon />, url: '/payout-payment/'}, 
    {text: 'Withdrawal List', icon: <FormatListBulletedIcon />, url: '/withdrawal-history/'}, 
    // {text: '-Request Money', icon: <SwapCallsIcon />, url: '/request-payment/'}, 
    // {text: '-Withdrawal Settings', icon: <SettingsIcon />, url: '/withdrawal-settings/'}, 
    // ...(is_merchant ? [
    //   {text: 'Business', icon: <SettingsIcon />, url: '/merchants/'},
    //   {text: '-Business Payments', icon: <SettingsIcon />, url: '/merchant/payments/'},
    //   {text: 'Bank Accounts', icon: <SettingsIcon />, url: '/merchant/bank/accounts/'},
    //   {text: 'Developer', icon: <SettingsIcon />, url: '/dev/docs/intro/'},
    // ] : [])
  ],
  icon:''},

  { text: 'CRYPTO', subItems: [
    {text: 'Transactions', icon: <ReceiptLongIcon />, url: '/crypto/transactions/'},
    {text: 'Wallet', icon: <AccountBalanceWalletIcon />, url: '/crypto/wallets/'},
    {text: 'Swap List', icon: <FormatListBulletedIcon />, url: '/crypto/swap/list/'},
    {text: 'Exchange List', icon: <FormatListBulletedIcon />, url: '/crypto/exchange/list/'},
    {text: 'Crypto Buy', icon: <ShoppingCartIcon />, url: '/crypto/buy/'},
    {text: 'Crypto Sell', icon: <SellIcon />, url: '/crypto/sell/'},
    {text: 'Crypto Swap', icon: <SwapHorizIcon />, url: '/crypto/swap/'},
    {text: 'Crypto Exchange', icon: <SwapHorizontalCircleIcon />, url: '/crypto/exchange/'},
    // {text: '-Investments', icon: <StorageIcon />, url: '/investment/invest/'},
    // {text: '-Investment Plans', icon: <StorageIcon />, url: '/investment/plan/'},
    ],
    icon: ''
  },

  { text: 'OTHERS', subItems: [
    {text: '-Disputes', icon: <MessageIcon />, url: '/dispute/'},
    {text: '-Tickets', icon: <ConfirmationNumberIcon />, url: '/tickets/'},
    {text: '-Profile', icon: <AccountBoxIcon />, url: '/profile/'},
    {text: '-Verifications', icon: <SettingsIcon />, url: '/'},
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

        <List style={{backgroundColor: '#0f3785', color: '#e7ebf2', scrollbarWidth:'none', '&::-webkit-scrollbar': {display:'none'}, overflow:'auto'}}>
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





























