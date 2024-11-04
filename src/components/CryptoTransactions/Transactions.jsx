import React from 'react';
import { Main, DrawerHeader } from '../Content';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Chip,
  Box, Tabs, Tab, IconButton
} from '@mui/material';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import WalletIcon from '@mui/icons-material/Wallet';
import Pagination from '@mui/material/Pagination';
import RaiseWalletRequest from './WalletRequest';
import BuyCrypto from './Buy';
import SellCrypto from './Sell';
import axiosInstance from '../Authentication/axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tooltip from '@mui/material/Tooltip';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';




  // Crypto Icons
const getCryptoIcons = (icon)=> {
    switch (icon) {
        case 'BTC':
            return '/cryptoicons/BTCS.png'

        case 'ETH':
            return '/cryptoicons/ETH.png'

        case 'XRP':
            return '/cryptoicons/XRP.png'

        case 'DOGE':
            return '/cryptoicons/DOGE.png'

        case 'LTC':
            return '/cryptoicons/LTC.png'

        case 'TOR':
            return '/cryptoicons/TOR.png'

        case 'SOL':
            return '/cryptoicons/SOL.png'

        default:
            break;
    }
};


// Status color
const getStatusColor = (status)=> {
    switch (status) {
        case 'Pending':
            return 'warning'
        case 'Approved':
            return 'success'
        case 'Rejected':
            return 'error'
        case 'Cancelled':
            'error'
        case 'Hold':
            return 'secondary'
        case 'On Hold':
            return 'primary'

        default:
            'primary'
    }
};


const getTransactionTypeColor = (type)=> {
    switch (type) {
        case 'Buy':
            return 'success'
        case 'Sell':
            return 'error'
    
        default:
            'primary'
    }
};


// But and Sell Crypto
export default function UserCryptoTransactions({open}) {
    const [walletPopup, setWalletPopup] = useState(false);
    const [openBuy, setOpenBuy]         = useState(false);
    const [openSell, setOpenSell]       = useState(false);
    const [cryptoTransactions, setCryptoTransactions] = useState([]);   // User Crypto Transaction data
    const [emptyData, setEmptyData]     = useState(false); // Empty data
    const [paginationCount, setPaginationCount] = useState(0);

    const countPagination = paginationCount ? Math.ceil(paginationCount) : 0
 

   // Open Wallet Popup
   const handleOpenWalletPopup = ()=> {
        setWalletPopup(true);
   };

   // Open Buy Modal
   const handleOpenBuy = ()=> {
        setOpenBuy(true);
   };

   // Open Buy Modal
   const handleOpenSell = ()=> {
        setOpenSell(true);
   };

   // Fetch all crypto transactions related to user
   useEffect(() => {
       axiosInstance.get(`/api/v2/user/crypto/transactions/`).then((res)=> {
        //    console.log(res)
           if (res.status === 200 && res.data.success === true) {
               const sortedTransactions = res.data.crypto_transactions.sort((a,b)=> {
                return new Date(b.created_at) - new Date(a.created_at)
               })
               setCryptoTransactions(sortedTransactions)
               setPaginationCount(res.data.total_row_count)
           }

           if (res.data.crypto_transactions.length === 0) {
                setEmptyData(true);
           } else {
                setEmptyData(false)
           }

       }).catch((error)=> {
        //    console.log(error)

       });
   }, []);



   // Get paginated data
   const handlePaginationData= (e, value)=> {
        let limit = 4;
        let offset = (value - 1) * limit;

        axiosInstance.get(`/api/v2/user/crypto/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res)
            if (res.status === 200) {
                const sortedTransactions = res.data.crypto_transactions.sort((a,b)=> {
                    return new Date(b.created_at) - new Date(a.created_at)
                   })
                setCryptoTransactions(sortedTransactions)
            };

        }).catch((error)=> {
            // console.log(error);

        })
   };
   


        if (emptyData) {
            return (
            <>
                <Main open={open}>
                    <DrawerHeader />

                <Box sx={{ width: '100%', overflowX: 'auto', mt: 2}}>
                    <Button variant="contained" sx={{mx:1}} startIcon={<ShoppingCartIcon />} onClick={handleOpenBuy}>Buy</Button>
                    <Button variant="contained" sx={{mx:1}} startIcon={<SellIcon />} onClick={handleOpenSell}>Sell</Button>
                    <Button variant="contained" sx={{mx:1}} startIcon={<SwapHorizIcon />} onClick={handleOpenSell}>Swap</Button>
                    <Button variant="contained" startIcon={<WalletIcon />} onClick={handleOpenWalletPopup}>Request Wallet</Button>


                    <TableContainer component={Paper} sx={{mt:1, maxHeight:'30rem'}}>
                        <Table aria-label="User table">
                            <TableHead sx={{backgroundColor:'#E1EBEE'}}>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Crypto</TableCell>
                                    <TableCell>Balance</TableCell>
                                    <TableCell>Wallet Address</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow rowSpan={3}>
                                    <TableCell colSpan={6} align='center'>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <DeleteOutlineIcon sx={{ fontSize: '6.5rem' }} />
                                            <small>No data found</small>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                </Main>

                <RaiseWalletRequest
                open={walletPopup}
                setOpen={setWalletPopup}
                />

                <BuyCrypto 
                open={openBuy}
                setOpen={setOpenBuy}
                />

                <SellCrypto 
                open={openSell}
                setOpen={setOpenSell}
                />

        </>
            );
        };



    return (
    <>
    <Main open={open}>
    <DrawerHeader />

        <Box sx={{ width: '100%', overflowX: 'auto', mt: 2}}>
            
            <Button variant="contained" sx={{mx:1}} startIcon={<ShoppingCartIcon />} onClick={handleOpenBuy}>Buy</Button>
            <Button variant="contained" sx={{mx:1}} startIcon={<SellIcon />} onClick={handleOpenSell}>Sell</Button>
            <Button variant="contained" sx={{mx:1}} startIcon={<SwapHorizIcon />} onClick={handleOpenSell}>Swap</Button>
            <Button variant="contained" startIcon={<WalletIcon />} onClick={handleOpenWalletPopup}>Request Wallet</Button>

            <TableContainer component={Paper} sx={{mt:1, maxHeight:'70rem'}}>
                <Table aria-label="User table">
                <TableHead sx={{backgroundColor:'#E1EBEE'}}>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Crypto</TableCell>
                        {/* <TableCell>Payment Mode</TableCell> */}
                        <TableCell>Quantity</TableCell>
                        <TableCell>Transaction Type</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {cryptoTransactions.map((transaction, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Box display="flex" alignItems="center">
                                <Box>
                                    <Typography variant="body1" fontWeight="bold">
                                        {transaction?.created_at.split('T')[0] || ''}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {transaction?.created_at.split('T')[1] || ''}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>

                        <TableCell>
                            <Tooltip title={transaction?.crypto_name}>
                                <img src={getCryptoIcons(transaction?.crypto_name || '')} alt={transaction?.crypto_name || ''} style={{width:'30px', height:'30px'}} />
                            </Tooltip>
                        </TableCell>

                        {/* <TableCell>{transaction?.payment_mode || ''}</TableCell> */}

                        <TableCell>{transaction?.crypto_name || ''} {transaction.crypto_qty ? parseFloat(transaction.crypto_qty).toFixed(3) : 0 }</TableCell>

                        <TableCell align='center'>
                            <Chip label={transaction?.type || ''} color={getTransactionTypeColor(transaction?.type || '')} />
                        </TableCell>

                        <TableCell>{transaction.amount ? parseFloat(transaction.amount).toFixed(4) : 0} {transaction?.currency}</TableCell>

                        <TableCell>
                            <Chip label={transaction?.status || ''} color={getStatusColor(transaction?.status || '')} variant="outlined"  />
                        </TableCell>

                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display:'flex', justifyContent:'right', mt:2 }}>
                <Pagination 
                    count={countPagination} 
                    onChange={(e, value)=> handlePaginationData(e, value)}
                    color="primary" 
                    />
            </Box>
    </Box>
    </Main>

    <RaiseWalletRequest
       open={walletPopup}
       setOpen={setWalletPopup}
    />

    <BuyCrypto 
       open={openBuy}
       setOpen={setOpenBuy}
    />

    <SellCrypto 
       open={openSell}
       setOpen={setOpenSell}
    />
</>

    );
};