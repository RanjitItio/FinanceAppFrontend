import {Main, DrawerHeader} from '../Content';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import FiatWithdrawalDetails from './WithdrawalDetails';
import { Box, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';




// Status Color
const getStattusColor = (status)=> {
    switch (status) {
        case 'Approved':
            return 'green'
        case 'Pending':
            return 'orange'
        case 'Cancelled':
            return 'red'
        case 'Hold':
            return 'blue'
        default:
            return 'blue'
    }
};


// Users Withrawal List
export default function WithdrawalList({open}) {
    const [withdrawalData, updateWithdrawalData] = useState([]);  // All withdrawal data
    const [boxOpen, setBoxOpen] = useState(false);    // Open withdrawal details pop up
    const [specificWithdrawal, setSpecificWithdrawal] = useState([]);  // Specific Withdrawal data
    const [paginationCount, setPaginationCount]  = useState(0);
    const [isfilterItem, setFilterItem]             = useState(false);  // Show filters

    const CountPagination = Math.ceil(paginationCount ? paginationCount : 0)

    // Method to open Withdrawal detail
    const handleClickOpen = () => {
        setBoxOpen(true);
      };

    // Close the Transaction detail box
    const handleBoxClose = () => {
        setBoxOpen(false);
    };


    // Method to handle Click on a specifi Transaction to show transaction details
    const handleClickWithdrawalTransaction = (withdrawal)=> {
        setSpecificWithdrawal(withdrawal)
        handleClickOpen();
    };
    

    /// Get all withdrawal transactions
    useEffect(() => {
        axiosInstance.get(`/api/v5/user/fiat/withdrawal/`).then((res)=> {

            if (res.status === 200 && res.data.success == true) {
                updateWithdrawalData(res.data.all_fiat_withdrawals);
                setPaginationCount(res.data.total_row_count)
            };

        }).catch((error)=> {
            // console.log(error)
        })
    }, []);


     // Get the paginated data
     const handlePaginatedData = (e, value)=> {
        let limit = 10;
        let offset = (value - 1) * limit;

        axiosInstance.get(`/api/v5/user/fiat/withdrawal/?limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                updateWithdrawalData(res.data.all_fiat_withdrawals)
            };

        }).catch((error)=> {
            // console.log(error);

        })
    };


    return (
        <>
         <Main open={open}>
            <DrawerHeader />


            <div className="d-flex justify-content-center">
                <p className='fs-3'>Withdrawal List</p>
            </div>

            <div className="d-flex justify-content-center">
                <p className='text-muted'>History of all your withdrawals in your account</p>
            </div>
            <br />
            
            <div className='d-flex justify-content-between'>
                <p className='text-muted'>All Withdrawal History</p>
                <Button variant="contained" startIcon={<FilterAltIcon />} onClick={()=> {setFilterItem(!isfilterItem)}}>Filter</Button>
            </div>


            <div className="d-flex justify-content-between">
                {isfilterItem && (
                    <Grid container spacing={2} sx={{mt:{xs:1, sm:0}, mb:{xs:1, sm:0.3}}}>
                        <Grid item xs={12} md={9}>
                            <Grid container spacing={2}>

                                {/* Date Range Filter */}
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>Date Range</InputLabel>
                                        <Select label='Date Range'>
                                            <MenuItem value="">
                                            <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Today</MenuItem>
                                            <MenuItem value={20}>Yesterday</MenuItem>
                                            <MenuItem value={30}>Last 7 Days</MenuItem>
                                            <MenuItem value={40}>Last 30 Days</MenuItem>
                                            <MenuItem value={50}>This month</MenuItem>
                                            <MenuItem value={60}>Last month</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Transaction Type Filter */}
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>Transaction</InputLabel>
                                        <Select label='Transaction'>
                                            <MenuItem value="">
                                            <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>All Type</MenuItem>
                                            <MenuItem value={20}>Deposit</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Transaction Status Filter */}
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>Status</InputLabel>
                                        <Select 
                                            label='Status'
                                            >
                                            <MenuItem value="">
                                            <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>All Status</MenuItem>
                                            <MenuItem value={20}>Success</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Currency Filter */}
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>Currency</InputLabel>
                                        <Select 
                                            label='Currency'
                                            >
                                            <MenuItem value="">
                                            <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>All Currency</MenuItem>
                                            <MenuItem value={20}>EUR</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Action Buttons */}
                        <Grid item xs={6} md={2} container justifyContent="center" alignItems="center">
                            <Button variant="contained">Apply Filter</Button>
                        </Grid>

                        <Grid item xs={6} md={1} container justifyContent="center" alignItems="center">
                            <Button variant="contained">Reset</Button>
                        </Grid>
                    </Grid>
                )}
            </div>


            <List>
            {withdrawalData.map((transaction, index) => (
                <ListItem
                    key={index}
                    disablePadding
                    secondaryAction={
                        <IconButton edge="end" aria-label="comments">
                            <ArrowRightIcon />
                        </IconButton>
                    }
                    className='mb-2 shadow border border-secondary'
                    onClick={()=> {handleClickWithdrawalTransaction(transaction)}}
                >
                    <ListItemButton>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: '#e3e6df', color: 'blue'}}>
                                    <UpgradeIcon />
                                </Avatar>
                            </ListItemAvatar>
                        <ListItemText
                        primary={
                            <>
                              <span><b>{transaction?.transaction_id ? `${transaction.transaction_id.slice(0, 10)}...` : ''  || ''}</b></span>
                            </>
                        }
                        secondary={`${transaction?.created_At.split('T')[0] || ''} ${transaction?.created_At.split('T')[1] || ''}`}
                        />

                        <ListItemText
                             primary={
                                <Box sx={{display:{xs:'none', sm:'flex'}}}>
                                  <span><b>{transaction?.user_email || ''}</b></span>
                                </Box>
                             }
                        />

                        <ListItemText
                        primary={
                            <>
                                <span style={{marginRight: '1%'}}>{transaction.withdrawal_currency}</span>
                                <span>{transaction.amount}</span>
                            </>
                        }
                        secondary={
                            <span style={{ color: getStattusColor(transaction.status) }}>{transaction.status}</span>
                        }
                        sx={{ flex: 'auto', textAlign: 'right' }}
                        />

                    </ListItemButton>
                </ListItem>
            ))}
            </List>

            <div className="my-3">
                <Pagination 
                    count={CountPagination} 
                    onChange={(e, value)=> {handlePaginatedData(e, value)}}
                    color="primary" />
            </div>
        </Main>

        <FiatWithdrawalDetails
           handleClose={handleBoxClose}
           boxOpen={boxOpen}
           withdrawalDetails={specificWithdrawal}
        />
        </>
    );
};