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
import ExchangeDetails from './ExchangeDetails';
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



export default function ExchangesList({open}) {
    const theme         = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [boxOpen, setBoxOpen] = useState(false);  // Open transaction pop up
    const [ExchangeData, setExchangeData] = useState([]);  // Exchange data from API
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(true);  // Loader
    const [paginatedValue, setPaginatedValue] = useState(0);  // Pagination number
    const [specificTransactionDetails, updateSpecificTransactionDetails] = useState([]);  // Transaction Data

    const [filterDate, setFilterDate]                       = useState('');  // Filter date state field
    const [filterError, setFilterError]                     = useState('');  // Error message of filter
    const [filterStatus, setFilterStatus]                   = useState('');  // Status in Filter Section
    const [filterActive, setFilterActive]                   = useState(false);  // Filter state active
    const [LgStartDateRange, setLgStartDateRange]           = useState('');  // Large Screen Start date
    const [LgEndDateRange, setLgEndDateRange]               = useState('');  // Large Screen End Date
    const [ShStartDateRange, setShStartDateRange]           = useState('');  // Small screen Start date
    const [ShEndDateRange, setShEndDateRange]               = useState('');  // Small Screen End date
    const [isfilterItem, setFilterItem]                     = useState(false);  // Show filters
    const [filterFromCurrency, setFilterFromCurrency]       = useState('');   /// Filter To Currency
    const [filterToCurrency, setFilterToCurrency]           = useState(''); //// Filter To Currency


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



    // Fetch all Exchange transaction data
    useEffect(() => {
        axiosInstance.get(`/api/v6/fiat/exchange/money/`).then((res)=> {
            // console.log(res)

            if(res.data && res.status === 200) {
                setExchangeData(res.data.user_fiat_exchange_data)
                setPaginatedValue(res.data.total_rows)
                setLoader(false)
            };

        }).catch((error)=> {
            // console.log(error);
        })
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
            axiosInstance.get(`/api/v6/fiat/exchange/money/?limit=${limit}&offset=${offset}`).then((res)=> {
                // console.log(res)
                if(res.data && res.status === 200) {
                    setExchangeData(res.data.user_fiat_exchange_data);
                    setPaginatedValue(res.data.total_rows);
                };
    
            }).catch((error)=> {
                // console.log(error)
            })
        }
    };


     //// Reset Filter Selected data
     const handleFilterReset = ()=> {
        setFilterActive(false);
        setFilterDate('');
        setFilterFromCurrency('');
        setFilterStatus('');
        setFilterToCurrency('');
        setFilterError('');
    };

    //// Call default pagination after filter mode off
     useEffect(() => {
        if (!filterActive) {
            handleGetPaginatedData('e', 1);
        }
    }, [!filterActive]);

    

   //// Get filtered data
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
        axiosInstance.post(`/api/v6/user/filter/fiat/exchanges/`, {
           dateRange: filterDate,
           from_currency: filterFromCurrency,
           to_currency: filterToCurrency,
           status: filterStatus,
           start_date: startDate ? startDate : LgStartDateRange,
           end_date: endDate ? endDate : LgEndDateRange

       }).then((res)=> {
           // console.log(res);
           if (res.status === 200 && res.data.success === true) {
                setExchangeData(res.data.user_filter_fiat_exchange_data)
                setPaginatedValue(res.data.paginated_count)
                setFilterActive(true);
           }

       }).catch((error)=> {
           // console.log(error);
           if (error.response.data.message === 'No data found') {
               setFilterError('No Data Found')
           } else if (error.response.data.message === 'Invalid From Currency') {
               setFilterError('Invalid From Currency')
           } else if (error.response.data.message === 'Invalid To Currency') {
               setFilterError('Invalid To Currency')
           }

       })
   };


   
   //// Get filtered data from API
   const GetFilteredPaginatedData = (startDate, endDate, limit, offset)=> {
       axiosInstance.post(`/api/v6/user/filter/fiat/exchanges/?limit=${limit}&offset=${offset}`, {
            dateRange: filterDate,
            from_currency: filterFromCurrency,
            to_currency: filterToCurrency,
            status: filterStatus,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

       }).then((res)=> {
        //    console.log(res);
           if (res.status === 200 && res.data.success === true) {
               setExchangeData(res.data.user_filter_fiat_exchange_data)
               setFilterActive(true);
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
    if (ExchangeData.length === 0) {
        return (
            <Main open={open}>
            <DrawerHeader />
                <div className="d-flex justify-content-center">
                    <p className='fs-3'>EXCHANGE LIST</p>
                </div>
                <div className="d-flex justify-content-center">
                    <p className='text-muted'>History of exchanges in your account</p>
                </div>
                <br />

                <p className='fs-5 d-flex justify-content-center my-5'><b>Nothing to show</b></p>
                <CloseIcon sx={{marginLeft: {lg: '45%', md: '45%', sm: '39%', xs: '39%'}, fontSize: '100px'}} />
            </Main>
        )
    };


    return( 
        <>
        <Main open={open}>
            <DrawerHeader />

            <div className="d-flex justify-content-center">
                <p className='fs-3'>EXCHANGE LIST</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className='text-muted'>History of exchanges in your account</p>
            </div>
            <br />
            <div className='d-flex justify-content-between'>
                <p className='text-muted'>All Exchanges</p>
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

                        {/* Transaction Type Filter */}
                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <InputLabel>From Currency</InputLabel>
                                <Select 
                                    value={filterFromCurrency} 
                                    onChange={(e)=> setFilterFromCurrency(e.target.value)} 
                                    label='From Currency'
                                    >
                                    <MenuItem value="USD">USD</MenuItem>
                                    <MenuItem value="INR">INR</MenuItem>
                                    <MenuItem value="EUR">EUR</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Transaction Status Filter */}
                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <InputLabel>To Currency</InputLabel>
                                <Select 
                                    value={filterToCurrency}
                                    onChange={(e)=> setFilterToCurrency(e.target.value)}
                                    label='To Currency'
                                    >
                                    <MenuItem value="USD">USD</MenuItem>
                                    <MenuItem value="INR">INR</MenuItem>
                                    <MenuItem value="EUR">EUR</MenuItem>
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
                <Grid item  xs={8} sm={2} md={1} sx={{mt:'0.7%'}}>
                    <Button 
                        variant="contained"
                        size='medium'
                        onClick={handleFilterData}
                        >
                            Submit
                    </Button>
                </Grid>

                <Grid item  xs={4} sm={2} md={1} sx={{mt:'0.7%'}}>
                    <Button 
                        variant="contained"
                        size='medium'
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
                        {ExchangeData.map((transaction, index) => {
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
                                        <Avatar style={{backgroundColor: '#d5d4ed'}}>{getCurrencyIcon(transaction.from_currency || '')}</Avatar>
                                    </ListItemAvatar>
                                <ListItemText
                                primary='Exchange'
                                secondary={`${transaction.created_At?.split('T')[0] || ''} ${transaction.created_At?.split('T')[1] || ''}`}
                                />
                                <ListItemText
                                primary={
                                    
                                    transaction.status == 'Pending' ? (
                                        <>
                                        
                                            <span style={{color: 'orange'}} className='mx-1'><HistoryIcon /></span>
                                            <span className='mx-1'>{transaction?.from_currency || ''}</span>
                                            <span>{transaction?.exchange_amount || 0}</span>
                                        
                                        </>

                                    ) : transaction.status == 'Approved' ? (
                                        <>
                                            <span style={{color: 'green'}} className='mx-1'><ArrowDropUpIcon /></span>
                                            <span className='mx-1'>{transaction?.from_currency || ''}</span>
                                            <span>{transaction?.exchange_amount || 0}</span>
                                        </>
                                        
                                    ) : transaction.status == 'Cancelled' ? (
                                        <>
                                            <span style={{color: 'red'}}  className='mx-1'><ArrowDropDownIcon /></span>
                                            <span className='mx-1'>{transaction?.from_currency || ''}</span>
                                            <span>{transaction?.exchange_amount || 0}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span style={{color: 'green'}} className='mx-1'><ArrowDropUpIcon /></span>
                                            <span className='mx-1'>{transaction?.from_currency || ''}</span>
                                            <span>{transaction?.exchange_amount || 0}</span>
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

        <ExchangeDetails handleClickOpen={handleClickOpen} handleClose={handleClose} boxOpen={boxOpen} specificTransactionDetails={specificTransactionDetails} />
        
    </>
)};