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
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from 'antd';


const { RangePicker } = DatePicker;




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
    const theme         = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [boxOpen, setBoxOpen] = useState(false);  // Open transaction pop up
    const [transactionData, setTransactionData] = useState([]);  // Transaction data from API
    const [error, setError] = useState('');
    const [specificTransactionDetails, updateSpecificTransactionDetails] = useState([]);  // Transaction Data
    const [loader, setLoader] = useState(true);  // Loader
    const [paginatedValue, setPaginatedValue] = useState(0);  // Pagination number

    const [filterDate, setFilterDate]                       = useState('');  // Filter date state field
    const [filterError, setFilterError]                     = useState('');  // Error message of filter
    const [filterStatus, setFilterStatus]                   = useState('');  // Status in Filter Section
    const [filterActive, setFilterActive]                   = useState(false);  // Filter state active
    const [LgStartDateRange, setLgStartDateRange]           = useState('');  // Large Screen Start date
    const [LgEndDateRange, setLgEndDateRange]               = useState('');  // Large Screen End Date
    const [ShStartDateRange, setShStartDateRange]           = useState('');  // Small screen Start date
    const [ShEndDateRange, setShEndDateRange]               = useState('');  // Small Screen End date
    const [isfilterItem, setFilterItem]                     = useState(false);  // Show filters
    const [filterTransactionType, setFilterTransactionType] = useState('');   //// Selected Filter Transaction Type
    const [filterCurrency, setFilterCurrency]               = useState('');

    const countPaginationNumber = Math.ceil(paginatedValue ? paginatedValue : 0);

    
     /// Filter Date Range Selected in Large Screen
     const handelLargeScreenCustomDateRange = (date, dateString)=> {
        setLgStartDateRange(dateString[0])
        setLgEndDateRange(dateString[1])
    };


    /// Filter Small Screen Start date range
    const handleSmallScreenStartDateRange = (date, dateString)=> {
        setShStartDateRange(dateString)
    };


    /// Filter Small Screen End Date Range
    const handleSmallScreenEndDateRange = (date, dateString)=> {
        setShEndDateRange(dateString)
    }; 


    // Method to open Transaction detail
    const handleClickOpen = () => {
        setBoxOpen(true);
      };

    // Close the Transaction detail box
    const handleClose = () => {
        setBoxOpen(false);
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


    /// ResetFilter
    //// Reset Filter Selected data
    const handleFilterReset = ()=> {
        setFilterActive(false);
        setFilterDate('');
        setFilterTransactionType('');
        setFilterStatus('');
        setFilterCurrency('');
        setFilterError('');
    };

     //// Call default pagination after filter mode off
     useEffect(() => {
        if (!filterActive) {
            handleGetPaginatedData('e', 1);
        }
    }, [!filterActive]);



    // Get paginated data
    const handleGetPaginatedData = (e, value)=> {
        let limit  = 5;
        let offset = (value - 1) * limit;

        if (filterActive) {
            if (isSmallScreen && filterDate === 'CustomRange') {
                if (!ShStartDateRange) {
                    setFilterError('Please Select Start Date');
    
                } else if (!ShEndDateRange) {
                    setFilterError('Please Select End Date');
    
                } else {
                    setFilterError('');
                    GetFilteredPaginatedData(ShStartDateRange, ShEndDateRange, limit, offset);
                };
    
            } else if (!isSmallScreen && filterDate === 'CustomRange') {
                if (!LgStartDateRange) {
                    setFilterError('Please Select Date Range');
    
                } else if (!LgEndDateRange) {
                    setFilterError('Please Select Date Range');
    
                } else {
                    setFilterError('');
                    GetFilteredPaginatedData(LgStartDateRange, LgEndDateRange, limit, offset);
                };
    
            } else {
                setFilterError('');
                GetFilteredPaginatedData(LgStartDateRange, LgEndDateRange, limit, offset);
            }

        } else {

            axiosInstance.get(`/api/v4/users/fiat/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
                // console.log(res)
                if(res.data && res.data.all_fiat_transactions) {
                    const sortedTransaction = res.data.all_fiat_transactions.sort((a,b)=> {
                        return new Date(b.data.created_At) - new Date(a.data.created_At)
                    })
                    setTransactionData(sortedTransaction)
                    setPaginatedValue(res.data.total_paginated_rows)
                };
    
            }).catch((error)=> {
                // console.log(error)
            })
        };
    };


      

   // Get filtered data
    const handleFilterData = ()=> {
        if (isSmallScreen && filterDate === 'CustomRange') {
            if (!ShStartDateRange) {
                setFilterError('Please Select Start Date');

            } else if (!ShEndDateRange) {
                setFilterError('Please Select End Date');

            } else {
                setFilterError('');
                GetFilteredData(ShStartDateRange, ShEndDateRange);
            }

        } else if (!isSmallScreen && filterDate === 'CustomRange') {
            if (!LgStartDateRange) {
                setFilterError('Please Select Date Range');

            } else if (!LgEndDateRange) {
                setFilterError('Please Select Date Range');

            } else {
                setFilterError('');
                GetFilteredData(LgStartDateRange, LgEndDateRange);
            }

        } else {
            setFilterError('');
            GetFilteredData();
        }
    };


    //// fetch all filter data
    const GetFilteredData = (startDate, endDate)=> {
         axiosInstance.post(`/api/v4/users/filter/fiat/transactions/`, {
            dateRange: filterDate,
            transaction_type: filterTransactionType,
            currency: filterCurrency,
            status: filterStatus,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                const sortedTransaction = res.data.filtered_user_fiat_transaction.sort((a,b)=> {
                    return new Date(b.data.created_At) - new Date(a.data.created_At)
                })
                setTransactionData(sortedTransaction)
                setPaginatedValue(res.data.paginated_count)
                setFilterActive(true);
            }

        }).catch((error)=> {
            // console.log(error);
            if (error.response.data.message === 'No data found') {
                setFilterError('No Data Found')
            } else if (error.response.data.message === 'Invalid Currency') {
                setFilterError('Invalid Currency')
            }

        })
    };


    
    //// Get filtered data from API
    const GetFilteredPaginatedData = (startDate, endDate, limit, offset)=> {
        axiosInstance.post(`/api/v4/users/filter/fiat/transactions/?limit=${limit}&offset=${offset}`, {
            dateRange: filterDate,
            transaction_type: filterTransactionType,
            currency: filterCurrency,
            status: filterStatus,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                const sortedTransaction = res.data.filtered_user_fiat_transaction.sort((a,b)=> {
                    return new Date(b.data.created_At) - new Date(a.data.created_At)
                })
                setTransactionData(sortedTransaction)
                setFilterActive(true);
                // setPaginatedValue(res.data.paginated_count)
            }

        }).catch((error)=> {
            // console.log(error);
            if (error.response.data.message === 'No data found') {
                setFilterError('No Data Found')
            } 
        })
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

            <div style={{display:'flex', justifyContent:'space-between'}}>
                <p className='text-muted'>All FIAT Transaction History</p>
                <Button variant="contained" startIcon={<FilterAltIcon />} onClick={()=> {setFilterItem(!isfilterItem)}}>Filter</Button>
            </div>


            <div style={{display:'flex', justifyContent:'space-between', marginTop:4}}>
                {isfilterItem && (
                    <Grid container spacing={2}>
                        {/* Date Range Filter */}
                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <InputLabel>Date Range</InputLabel>
                                <Select 
                                    value={filterDate} 
                                    onChange={(e)=> setFilterDate(e.target.value)} 
                                    label='Date Range'
                                    >
                                    <MenuItem value="Today">Today</MenuItem>
                                    <MenuItem value="Yesterday">Yesterday</MenuItem>
                                    <MenuItem value="ThisWeek">ThisWeek</MenuItem>
                                    <MenuItem value="ThisMonth">This Month</MenuItem>
                                    <MenuItem value="PreviousMonth">Last month</MenuItem>
                                    <MenuItem value="CustomRange">Custom Range</MenuItem>
                                </Select>
                            </FormControl>

                            {filterDate === "CustomRange" && (
                                isSmallScreen ? (
                                    <>
                                        <DatePicker style={{ width: '100%', marginTop:5 }} onChange={handleSmallScreenStartDateRange} />
                                        <DatePicker style={{ width: '100%', marginTop:5 }} onChange={handleSmallScreenEndDateRange} />
                                    </>
                                ) : (
                                    <RangePicker 
                                        style={{ width: '100%', marginTop:5 }} onChange={handelLargeScreenCustomDateRange} 
                                        />
                                )
                            )}
                        </Grid>

                             
                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <InputLabel>Transaction Type</InputLabel>
                                <Select 
                                    label='Transaction Type'
                                    value={filterTransactionType}
                                    onChange={(e)=> setFilterTransactionType(e.target.value)}
                                    >
                                    <MenuItem value='Deposit'>Deposit</MenuItem>
                                    <MenuItem value='Transfer'>Transfer</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Transaction Status Filter */}
                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <InputLabel>Currency</InputLabel>
                                <Select 
                                    label='Currency'
                                    value={filterCurrency}
                                    onChange={(e)=> setFilterCurrency(e.target.value)}
                                    >
                                    <MenuItem value='USD'>USD</MenuItem>
                                    <MenuItem value='INR'>INR</MenuItem>
                                    <MenuItem value='EUR'>EUR</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Currency Filter */}
                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select 
                                    label='Status'
                                    value={filterStatus}
                                    onChange={(e)=> setFilterStatus(e.target.value)}
                                    >
                                    <MenuItem value="Approved">Approved</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                                    <MenuItem value="Hold">On Hold</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Action Buttons */}
                        <Grid item xs={6} sm={6} md={1} sx={{mt:'0.7%'}}>
                            <Button 
                                size='medium'
                                variant="contained" 
                                onClick={handleFilterData}
                                >
                                    Submit
                            </Button>
                        </Grid>

                        <Grid item xs={6} sm={6} md={1} sx={{mt:'0.7%'}}>
                            <Button 
                                size='medium'
                                variant="contained" 
                                onClick={handleFilterReset}
                                >
                                    Reset
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            {filterError && 
                                <p style={{color:'red'}}>{filterError}</p>
                            }
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






