import React from 'react';
import { Main, DrawerHeader } from '../Content';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip,
  Box
} from '@mui/material';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosInstance from '../Authentication/axios';
import Tooltip from '@mui/material/Tooltip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WalletIcon from '@mui/icons-material/Wallet';
import RaiseWalletRequest from './WalletRequest';
import Button from '@mui/material/Button';



// Change status color according to the status label
const getStatusColor = (status)=> {
    switch (status) {
        case 'Pending':
            return 'warning'
        case 'Approved':
            return 'success'
        case 'Rejected':
            return 'error'
        default:
            '';
    };
};


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

        case 'BNB':
            return '/cryptoicons/BNB.png'

        default:
            break
    };
};




// Crypto Wallet Lists
export default function UserCryptoWallets({open}) {
    const [userWallets, setUserWallets] = useState([]);    // User Wallet state
    const [emptyData, setEmptyData]     = useState(false); // Empty data state
    const [PaginationCount, setPaginationCount] = useState(0);
    const [walletPopup, setWalletPopup] = useState(false);  // Open Wallet Popup

    const CountPagination = Math.floor(PaginationCount ? PaginationCount : 0);

    // Open Wallet Popup
    const handleOpenWalletPopup = ()=> {
        setWalletPopup(true);
    };


    // Fetch all users wallet
    useEffect(() => {
      axiosInstance.get(`/api/v1/user/crypto/wallet/`).then((res)=> {
        //   console.log(res)

          if (res.status === 200) {
            setUserWallets(res.data.user_crypto_wallet_data)
            setPaginationCount(res.data.total_row_count)
          }

          if (res.data.user_crypto_wallet_data.length === 0) {
            setEmptyData(true)
          } else {
            setEmptyData(false)
          }

      }).catch((error)=> {
        // console.log(error);

      })
    }, []);

    /////  Paginated Data
    const handlePagination = (e, value)=> {
        let limit = 6;
        let offset = (value - 1) * limit;

        axiosInstance.get(`/api/v1/user/crypto/wallet/?limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res)
            if (res.status === 200) {
                setUserWallets(res.data.user_crypto_wallet_data)
            };

        }).catch((error)=> {
            // console.log(error);

        })

    };

    
    /// For Empty data
    if (emptyData) {
        return (
            <>
            <Main open={open}>
                <DrawerHeader />
                <Box sx={{ width: '100%', overflowX: 'auto', mt: 2}}>
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

        </>
        );
    };
    


    return (
        <>
        <Main open={open}>
        <DrawerHeader />
    
            <Box sx={{ width: '100%', overflowX: 'auto', mt: 2}}>
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
                        {userWallets.map((wallet, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {wallet.created_At ? wallet.created_At.split('T')[0] : ''}
                            </TableCell>
    
                            <TableCell>{wallet.created_At ? wallet.created_At.split('T')[1] : ''}</TableCell>
    
                            <TableCell>
                                <Tooltip title={wallet?.crypto_name}>
                                    <img 
                                        src={getCryptoIcons(wallet?.crypto_name || '')} 
                                        alt={wallet?.crypto_name || ''}
                                        style={{width:'30px', height:'30px'}}
                                        />
                                </Tooltip>
                            </TableCell>
    
                            <TableCell>{wallet?.balance || '0.00'}</TableCell>
    
                            <TableCell>{wallet?.wallet_address || ''}</TableCell>
    
                            <TableCell>
                                <Chip label={wallet.status} color={getStatusColor(wallet.status)} />
                            </TableCell>
    
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
    
                <Box sx={{ display:'flex', justifyContent:'right', mt:2 }}>
                    <Pagination 
                        count={CountPagination} 
                        color="primary" 
                        onChange={(e, value)=> handlePagination(e, value)}
                    />
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