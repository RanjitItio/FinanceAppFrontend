import {Main, DrawerHeader} from '../Content';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ResponsiveDialog from './TransactionDetails';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axiosInstance from '../Authentication/axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HistoryIcon from '@mui/icons-material/History';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import FilterAltIcon from '@mui/icons-material/FilterAlt';




// Currency Icon
const getCurrencyIcon = (currency) => {
    switch (currency) {
        case 'USD':
            return '$'
        case 'EUR':
            return '€'
        case 'INR':
            return '₹'
        case 'GBP':
            return '£'
        default:
            '$'
    }
};






// All FIAT Transaction of the user
export default function AllTransactions({open}) {
    const [boxOpen, setBoxOpen] = useState(false);  // Open transaction pop up
    const [isfilterItem, setFilterItem] = useState(false);  // Show filters
    const [dateRange, setDateRange] = useState('');    // date range In filter
    const [transactionType, setTransactionType] = useState('');  // Transaction type in filter
    const [transactionStatus, setTransactionStatus] = useState('');  // Transaction status in filter
    const [currency, setCurrency] = useState('');   // Currency of Filter
    const [transactionData, setTransactionData] = useState([]);  // Transaction data from API
    const [error, setError] = useState('');
    const [specificTransactionDetails, updateSpecificTransactionDetails] = useState([]);  // Transaction Data
    const [loader, setLoader] = useState(true);  // Loader
    const [paginatedValue, setPaginatedValue] = useState(0);  // Pagination number

    const countPaginationNumber = Math.ceil(paginatedValue ? paginatedValue : 0)

    // Date value change
    const handleDateChange = (event) => {
        setDateRange(event.target.value);
    };  

    // Transaction change
    const handleTransactionChange = (event) => {
        setTransactionType(event.target.value);
    };

    // Get filter selected status 
    const handleTransactionStatusChange = (event) => {
        setTransactionStatus(event.target.value);
    };  

    // Get Filter selected currency
    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };   

    // Method to open Transaction detail
    const handleClickOpen = () => {
        setBoxOpen(true);
      };

    // Close the Transaction detail box
    const handleClose = () => {
        setBoxOpen(false);
      };


    const toggleFilterItemVisibility = () => {
        setFilterItem(!isfilterItem);
    };


    // Fetch all transaction data
    useEffect(() => {
        try{
            axiosInstance.get(`/api/v4/users/fiat/transactions/`).then((res)=> {

                if(res.data && res.data.all_fiat_transactions) {
                    const sortedTransaction = res.data.all_fiat_transactions.sort((a,b)=> {
                        return new Date(b.data.created_At) - new Date(a.data.created_At)
                    })
                    setTransactionData(sortedTransaction)
                    setPaginatedValue(res.data.total_paginated_rows)
                    setLoader(false)
                };
            })
        } catch(error) {
            // console.log(error)
        }
    }, []);

    
    // Clicked on a specific transaction
    const handleTransactionClick = (transaction)=> {
        handleClickOpen();
        updateSpecificTransactionDetails(transaction)
    };


    // Until API data has not fetched
    if (loader) {
        return (
            <Main open={open}>
            <DrawerHeader />
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20%'}}>
                    <CircularProgress />
                </Box>

            </Main>
        )
    };


    // Get paginated data
    const handleGetPaginatedData = (e, value)=> {
        let limit  = 5;
        let offset = (value - 1) * limit;

        axiosInstance.get(`/api/v4/users/fiat/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
            console.log(res)
            if(res.data && res.data.all_fiat_transactions) {
                const sortedTransaction = res.data.all_fiat_transactions.sort((a,b)=> {
                    return new Date(b.data.created_At) - new Date(a.data.created_At)
                })
                setTransactionData(sortedTransaction)
            };

        }).catch((error)=> {
            // console.log(error)

        })
    };


    // If no transaction available
    if (transactionData.length === 0) {
        return (
            <Main open={open}>
            <DrawerHeader />
                <div className="d-flex justify-content-center">
                    <p className='fs-3'>TRANSACTIONS</p>
                </div>
                <div className="d-flex justify-content-center">
                    <p className='text-muted'>History of transactions in your account</p>
                </div>
                <br />

                <p className='fs-5 d-flex justify-content-center my-5'><b>Nothing to show</b></p>
                <CloseIcon sx={{marginLeft: {lg: '45%', md: '45%', sm: '39%', xs: '39%'}, fontSize: '100px'}} />
            </Main>
        )
    };

    

    return (
        <>
         <Main open={open}>
            <DrawerHeader />

            <div className="d-flex justify-content-center">
                <p className='fs-3'>TRANSACTIONS</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className='text-muted'>History of transactions in your account</p>
            </div>
            <br />

            <div className='d-flex justify-content-between'>
                <p className='text-muted'>All Transactions</p>
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
                                        <Select value={dateRange} onChange={handleDateChange} label='Date Range'>
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
                                        <Select value={transactionType} onChange={handleTransactionChange} label='Transaction'>
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
                                            value={transactionStatus}
                                            onChange={handleTransactionStatusChange}
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
                                            value={currency} 
                                            onChange={handleCurrencyChange}
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


                {error ? (
                    <Alert severity="warning">{error}</Alert>
                ) : (
                <List>
                    {transactionData.map((transaction, index) => {
                
                        // const transactionDate = new Date(transaction.data.created_At.split('T')[0] || '');
                        
                        // const formatDate = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}-${String(transactionDate.getDate()).padStart(2, '0')}`

                        // const transactionTime = new Date(transaction.data.created_At.split('T')[1] || '');
                        // const formattedTime = `${String(transactionTime.getHours()).padStart(2, '0')}:${String(transactionTime.getMinutes()).padStart(2, '0')}:${String(transactionTime.getSeconds()).padStart(2, '0')}`;

                        return(
            
                        <ListItem
                        key={index}
                        disablePadding
                        secondaryAction={
                            <IconButton edge="end" aria-label="comments">
                                <ArrowRightIcon />
                            </IconButton>
                        }
                        onClick={()=> {handleTransactionClick(transaction);}}
                        className='mb-2 shadow border border-secondary'
                        >
                        <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar style={{backgroundColor: '#d5d4ed'}}>{getCurrencyIcon(transaction.currency?.name || '')}</Avatar>
                                </ListItemAvatar>
                            <ListItemText
                            primary={transaction.type}
                            secondary={`${transaction.data?.payment_mode || ''} ${transaction.data.created_At?.split('T')[0] || ''} ${transaction.data.created_At?.split('T')[1] || ''}`}
                            />
                            <ListItemText
                            primary={
                                
                                transaction.data.status == 'Pending' ? (
                                    <>
                                    
                                        <span style={{color: 'orange'}} className='mx-1'><HistoryIcon /></span>
                                        <span className='mx-1'>{transaction.currency.name}</span>
                                        <span>{transaction.data.amount}</span>
                                    
                                    </>

                                ) : transaction.data.status == 'Approved' ? (
                                    <>
                                        <span style={{color: 'green'}} className='mx-1'><ArrowDropUpIcon /></span>
                                        <span className='mx-1'>{transaction.currency.name}</span>
                                        <span>{transaction.data.amount}</span>
                                    </>
                                    
                                ) : transaction.data.status == 'Cancelled' ? (
                                    <>
                                        <span style={{color: 'red'}}  className='mx-1'><ArrowDropDownIcon /></span>
                                        <span className='mx-1'>{transaction.currency.name}</span>
                                        <span>{transaction.data.amount}</span>
                                    </>
                                ) : (
                                    <>
                                        <span style={{color: 'green'}} className='mx-1'><ArrowDropUpIcon /></span>
                                        <span className='mx-1'>{transaction.currency.name}</span>
                                        <span>{transaction.data.amount}</span>
                                    </>
                                ) 
                            }
                            secondary={
                                transaction.data.status == 'Pending' ? (
                                    <span style={{ color: 'orange' }}>{transaction.data?.status || ''}</span>

                                ) : transaction.data.status == 'Approved' ? (
                                    <span style={{ color: 'green' }}>{transaction.data?.status || ''}</span>

                                ) : transaction.data.status === 'Cancelled' ? (
                                    <span style={{ color: 'red' }}>{transaction.data?.status || ''}</span>

                                ) : (
                                    <span style={{ color: 'orange' }}>{transaction.data?.status || ''}</span>
                                )
                            }
                            sx={{ flex: 'auto', textAlign: 'right' }}
                            />
                        </ListItemButton>
                        </ListItem>
                        )
                        
                    })}
                    </List>
        
    )}
            <div className="my-3">
                <Pagination 
                    count={countPaginationNumber} 
                    onChange={(e, value)=> handleGetPaginatedData(e, value)}
                    color="primary" />
            </div>

        </Main>

        <ResponsiveDialog handleClickOpen={handleClickOpen} handleClose={handleClose} boxOpen={boxOpen} specificTransactionDetails={specificTransactionDetails} />
        
        </>
    )
};






