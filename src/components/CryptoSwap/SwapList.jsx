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
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import axiosInstance from '../Authentication/axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HistoryIcon from '@mui/icons-material/History';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CryptoSwapDetail from './SwapDetail';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from 'antd';


const { RangePicker } = DatePicker;


// Currency Icon
const getCurrencyIcon = (currency) => {
    switch (currency) {
        case 'BTC':
            return '₿'
        case 'XRP':
            return 'X'
        case 'LTC':
            return 'Ł'
        case 'SOL':
            return 'S'
        case 'ETH':
            return 'E'
        default:
            '$'
    }
};



//// All Crypti Swap transactions List of the user
export default function UserCryptoSwapList({open}) {
    const theme         = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [boxOpen, setBoxOpen]                     = useState(false);  // Open transaction pop up
    const [isfilterItem, setFilterItem]             = useState(false);  // Show filters
    const [swapTransaction, setSwapTransaction]     = useState([]);  // Transaction data from API
    const [error, setError]                         = useState('');  // Error Message
    const [paginatedValue, setPaginatedValue]       = useState(0);  // Pagination number
    const [loader, setLoader]                       = useState(true);  // Loader
    const [specificTransactionDetails, updateSpecificTransactionDetails] = useState([]);  // Transaction Data
    const [LgStartDateRange, setLgStartDateRange]   = useState('');  // Large Screen Start date
    const [LgEndDateRange, setLgEndDateRange]       = useState('');  // Large Screen End Date
    const [ShStartDateRange, setShStartDateRange]   = useState('');  // Small screen Start date
    const [ShEndDateRange, setShEndDateRange]       = useState('');  // Small Screen End date
    const [filterDate, setFilterDate]        = useState('');  // Filter date state field
    const [filterError, setFilterError]      = useState('');  // Error message of filter
    const [filterFromCrypto, setFilterFromCrypto] = useState('');
    const [filterToCrypto, setFilterToCrypto]     = useState('');
    const [filterStatus, setFilterStatus]         = useState('');
    const [filterActive, setFilterActive]         = useState(false);


    const countPaginationNumber = Math.ceil(paginatedValue ? paginatedValue : 0)


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
            axiosInstance.get(`/api/v2/user/crypto/swap/`).then((res)=> {

                if(res.data && res.data.success === true) {

                    setSwapTransaction(res.data.user_crypto_swap_transactions)
                    setPaginatedValue(res.data.paginated_rows)
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


    // Get paginated data
    const handleGetPaginatedData = (e, value)=> {
        let limit  = 10;
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
                }
    
            } else if (!isSmallScreen && filterDate === 'CustomRange') {
                if (!LgStartDateRange) {
                    setFilterError('Please Select Date Range');
    
                } else if (!LgEndDateRange) {
                    setFilterError('Please Select Date Range');
    
                } else {
                    setFilterError('');
                    GetFilteredPaginatedData(LgStartDateRange, LgEndDateRange, limit, offset);
                }
    
            } else {
                setFilterError('');
                GetFilteredPaginatedData(LgStartDateRange, LgEndDateRange, limit, offset);
            }

        } else {
            axiosInstance.get(`/api/v2/user/crypto/swap/?limit=${limit}&offset=${offset}`).then((res)=> {
                // console.log(res)
                if(res.data && res.data.success === true) {
                    setSwapTransaction(res.data.user_crypto_swap_transactions)
                };
    
            }).catch((error)=> {
                // console.log(error)
            })
        };
    };

    //// Reset Filter Selected data
   const handleFilterReset = ()=> {
        setFilterActive(false);
        setFilterDate('');
        setFilterFromCrypto('');
        setFilterStatus('');
        setFilterToCrypto('');
        setFilterError('');
    };

     //// Call default pagination after filter mode off
    useEffect(() => {
        if (!filterActive) {
            handleGetPaginatedData('e', 1);
        }
    }, [!filterActive]);


    
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



    //// Get filtered data from API
    const GetFilteredData = (startDate, endDate)=> {
        axiosInstance.post(`/api/v2/user/filter/crypto/swap/`, {
            dateRange: filterDate,
            status: filterStatus,
            from_crypto: filterFromCrypto,
            to_crypto: filterToCrypto,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            console.log(res);
            if (res.status === 200 && res.data.success === true) {
                const sortedTransactions = res.data.user_filter_crypto_swap_transactions.sort((a,b)=> {
                    return new Date(b.created_at) - new Date(a.created_at)
                })
                setSwapTransaction(sortedTransactions)
                setFilterActive(true);
                setPaginatedValue(res.data.paginated_count);
            }

        }).catch((error)=> {
            // console.log(error);
            if (error.response.data.message === 'No data found') {
                setFilterError('No Data Found')
            } 
        })
    };


    
    //// Get filtered data from API
    const GetFilteredPaginatedData = (startDate, endDate, limit, offset)=> {
        axiosInstance.post(`/api/v2/user/filter/crypto/swap/?limit=${limit}&offset=${offset}`, {
            dateRange: filterDate,
            status: filterStatus,
            from_crypto: filterFromCrypto,
            to_crypto: filterToCrypto,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                const sortedTransactions = res.data.user_filter_crypto_swap_transactions.sort((a,b)=> {
                    return new Date(b.created_at) - new Date(a.created_at)
                })
                setSwapTransaction(sortedTransactions)
                setFilterActive(true);
                setPaginatedValue(res.data.paginated_count);
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
     if (swapTransaction.length === 0) {
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
                <p className='text-muted'>History of Crypto Swap transactions History</p>
            </div>
            <br />

            <div style={{display:'flex', justifyContent:'space-between'}}>
                <p className='text-muted'>All Crypto Swaps</p>
                <Button variant="contained" startIcon={<FilterAltIcon />} onClick={()=> {setFilterItem(!isfilterItem)}}>Filter</Button>
            </div>

            <div className="d-flex justify-content-between">
                {isfilterItem && (
                    <Grid container spacing={2} sx={{mt:{xs:1, sm:0}, mb:{xs:1, sm:0.3}}}>
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
                                    <MenuItem value="LastMonth">Last month</MenuItem>
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

                        {/* From Crypto Filter */}
                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <InputLabel>From Crypto</InputLabel>
                                <Select 
                                    value={filterFromCrypto} 
                                    onChange={(e)=> setFilterFromCrypto(e.target.value)} 
                                    label='From Crypto'
                                    >
                                    <MenuItem value="BTC">BTC</MenuItem>
                                    <MenuItem value="XRP">XRP</MenuItem>
                                    <MenuItem value="ETH">ETH</MenuItem>
                                    <MenuItem value="SOL">SOL</MenuItem>
                                    <MenuItem value="LTC">LTC</MenuItem>
                                    <MenuItem value="DOGE">DOGE</MenuItem>
                                    <MenuItem value="BNB">BNB</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Transaction Status Filter */}
                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <InputLabel>To Crypto</InputLabel>
                                <Select 
                                    value={filterToCrypto} 
                                    onChange={(e)=> setFilterToCrypto(e.target.value)} 
                                    label='To Crypto'
                                    >
                                    <MenuItem value="BTC">BTC</MenuItem>
                                    <MenuItem value="XRP">XRP</MenuItem>
                                    <MenuItem value="ETH">ETH</MenuItem>
                                    <MenuItem value="SOL">SOL</MenuItem>
                                    <MenuItem value="LTC">LTC</MenuItem>
                                    <MenuItem value="DOGE">DOGE</MenuItem>
                                    <MenuItem value="BNB">BNB</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>

                        {/* Currency Filter */}
                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select 
                                    value={filterStatus} 
                                    onChange={(e)=> setFilterStatus(e.target.value)} 
                                    label='Status'
                                    >
                                    <MenuItem value="Approved">Approved</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                                    <MenuItem value="Hold">On Hold</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>

                        {/* Action Buttons */}
                        <Grid item xs={8} sm={2} md={1} sx={{mt:'0.5%'}}>
                            <Button 
                                variant="contained" 
                                onClick={handleFilterData}
                                >
                                    Submit
                            </Button>
                        </Grid>

                        <Grid item xs={8} sm={2} md={1} sx={{mt:'0.5%'}}>
                            <Button 
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
                {swapTransaction.map((transaction, index) => {
            
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
                                <Avatar style={{backgroundColor: '#d5d4ed'}}>{getCurrencyIcon(transaction.from_crypto_name || '')}</Avatar>
                            </ListItemAvatar>
                        <ListItemText
                        primary='Crypto Swap'
                        secondary={`${transaction.created_at?.split('T')[0] || ''} ${transaction.created_at?.split('T')[1] || ''}`}
                        />
                        <ListItemText
                        primary={
                            
                            transaction.status == 'Pending' ? (
                                <>
                                
                                    <span style={{color: 'orange'}} className='mx-1'><HistoryIcon /></span>
                                    <span className='mx-1'>{transaction.from_crypto_name}</span>
                                    <span>{transaction.swap_quantity}</span>
                                
                                </>

                            ) : transaction.status == 'Approved' ? (
                                <>
                                    <span style={{color: 'green'}} className='mx-1'><ArrowDropUpIcon /></span>
                                    <span className='mx-1'>{transaction.from_crypto_name}</span>
                                    <span>{transaction.swap_quantity}</span>
                                </>
                                
                            ) : transaction.status == 'Cancelled' ? (
                                <>
                                    <span style={{color: 'red'}}  className='mx-1'><ArrowDropDownIcon /></span>
                                    <span className='mx-1'>{transaction.from_crypto_name}</span>
                                    <span>{transaction.swap_quantity}</span>
                                </>
                            ) : (
                                <>
                                    <span style={{color: 'green'}} className='mx-1'><ArrowDropUpIcon /></span>
                                    <span className='mx-1'>{transaction.from_crypto_name}</span>
                                    <span>{transaction.swap_quantity}</span>
                                </>
                            ) 
                        }
                        secondary={
                            transaction.status == 'Pending' ? (
                                <span style={{ color: 'orange' }}>{transaction?.status || ''}</span>

                            ) : transaction.status == 'Approved' ? (
                                <span style={{ color: 'green' }}>{transaction?.status || ''}</span>

                            ) : transaction.status === 'Cancelled' ? (
                                <span style={{ color: 'red' }}>{transaction?.status || ''}</span>

                            ) : (
                                <span style={{ color: 'orange' }}>{transaction?.status || ''}</span>
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

        <CryptoSwapDetail handleClickOpen={handleClickOpen} handleClose={handleClose} boxOpen={boxOpen} specificTransactionDetails={specificTransactionDetails} />
        
        </>
    )
}