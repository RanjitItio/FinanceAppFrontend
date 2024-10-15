import React from 'react';
import { Main, DrawerHeader } from '../Content';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Chip,
  Box, Tabs, Tab, IconButton
} from '@mui/material';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import WalletIcon from '@mui/icons-material/Wallet';
import Pagination from '@mui/material/Pagination';
import RaiseWalletRequest from './WalletRequest';


const users = [
    { name: 'Dianne Russell', email: 'redaniel@gmail.com', date: '27 Mar 2024', plan: 'Free', status: 'Active' },
    { name: 'Wade Warren', email: 'xterris@gmail.com', date: '27 Mar 2024', plan: 'Basic', status: 'Active' },
    { name: 'Albert Flores', email: 'seannand@mail.ru', date: '27 Mar 2024', plan: 'Standard', status: 'Active' },
    { name: 'Bessie Cooper', email: 'igerrin@gmail.com', date: '27 Mar 2024', plan: 'Business', status: 'Active' },
    { name: 'Bessie Cooper', email: 'igerrin@gmail.com', date: '27 Mar 2024', plan: 'Business', status: 'Active' },
  ];



// But and Sell Crypto
export default function BuySellCrypto({open}) {
    const [walletPopup, setWalletPopup] = useState(false);

   // Open Wallet Popup
   const handleOpenWalletPopup = ()=> {
        setWalletPopup(true);
   };

    return (
    <>
    <Main open={open}>
    <DrawerHeader />

        <Box sx={{ width: '100%', overflowX: 'auto', mt: 2}}>
            
            <Button variant="contained" sx={{mx:1}} startIcon={<ShoppingCartIcon />}>Buy</Button>
            <Button variant="contained" sx={{mx:1}} startIcon={<SellIcon />}>Sell</Button>
            <Button variant="contained" startIcon={<WalletIcon />} onClick={handleOpenWalletPopup}>Request Wallet</Button>

            <TableContainer component={Paper} sx={{mt:1, maxHeight:'30rem'}}>
                <Table aria-label="User table">
                <TableHead sx={{backgroundColor:'#E1EBEE'}}>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Crypto</TableCell>
                        <TableCell>Payment Mode</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Transaction Type</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Box display="flex" alignItems="center">
                                <Avatar sx={{ mr: 2 }} />
                                <Box>
                                <Typography variant="body1" fontWeight="bold">
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {user.email}
                                </Typography>
                                </Box>
                            </Box>
                        </TableCell>

                        <TableCell>{user.date}</TableCell>

                        <TableCell>{user.plan}</TableCell>

                        <TableCell>{user.plan}</TableCell>

                        <TableCell>{user.plan}</TableCell>

                        <TableCell>{user.plan}</TableCell>

                        <TableCell>{user.plan}</TableCell>

                        <TableCell>
                            <Chip label={user.status} color="success" sx={{ bgcolor: '#E5F8ED', color: '#3DD597' }} />
                        </TableCell>

                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display:'flex', justifyContent:'right', mt:2 }}>
                <Pagination count={10} color="primary" />
            </Box>
    </Box>
    </Main>

    <RaiseWalletRequest
       open={walletPopup}
       setOpen={setWalletPopup}
    />
</>

    );
};