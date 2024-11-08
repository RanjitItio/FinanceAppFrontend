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
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from 'antd';


const { RangePicker } = DatePicker;




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
    const theme         = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [withdrawalData, updateWithdrawalData]      = useState([]);  // All withdrawal data
    const [boxOpen, setBoxOpen]                       = useState(false);    // Open withdrawal details pop up
    const [specificWithdrawal, setSpecificWithdrawal] = useState([]);  // Specific Withdrawal data
    const [paginationCount, setPaginationCount]       = useState(0);
    const [isfilterItem, setFilterItem]               = useState(false);  // Show filters
    const [LgStartDateRange, setLgStartDateRange]     = useState('');  // Large Screen Start date
    const [LgEndDateRange, setLgEndDateRange]         = useState('');  // Large Screen End Date
    const [ShStartDateRange, setShStartDateRange]     = useState('');  // Small screen Start date
    const [ShEndDateRange, setShEndDateRange]         = useState('');  // Small Screen End date
    const [filterDate, setFilterDate]                 = useState('');  // Filter date state field
    const [filterError, setFilterError]               = useState('');  // Error message of filter
    const [filterStatus, setFilterStatus]             = useState('');  // Status in Filter Section
    const [filterActive, setFilterActive]             = useState(false);  // 
    const [filterFromCurrency, setFilterFromCurrency] = useState('');
    const [filterToCurrency, setFilterToCurrency]     = useState('');

    const CountPagination = Math.ceil(paginationCount ? paginationCount : 0);


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
            axiosInstance.get(`/api/v5/user/fiat/withdrawal/?limit=${limit}&offset=${offset}`).then((res)=> {
                // console.log(res)
                if (res.status === 200 && res.data.success === true) {
                    updateWithdrawalData(res.data.all_fiat_withdrawals)
                };
    
            }).catch((error)=> {
                // console.log(error);
    
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
            handlePaginatedData('e', 1);
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
        axiosInstance.post(`/api/v5/user/filter/fiat/withdrawal/`, {
            dateRange: filterDate,
            status: filterStatus,
            fromCurrency: filterFromCurrency,
            toCurrency: filterToCurrency,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                updateWithdrawalData(res.data.user_filtered_fiat_withdrawal)
                setFilterActive(true);
                setPaginationCount(res.data.paginated_count);
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
        axiosInstance.post(`/api/v5/user/filter/fiat/withdrawal/?limit=${limit}&offset=${offset}`, {
            dateRange: filterDate,
            status: filterStatus,
            fromCurrency: filterFromCurrency,
            toCurrency: filterToCurrency,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                updateWithdrawalData(res.data.user_filtered_fiat_withdrawal)
                setFilterActive(true);
                setPaginationCount(res.data.paginated_count);
            }

        }).catch((error)=> {
            // console.log(error);
            if (error.response.data.message === 'No data found') {
                setFilterError('No Data Found')
            } 
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

                             
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>From Currency</InputLabel>
                                        <Select 
                                            label='From Currency'
                                            value={filterFromCurrency}
                                            onChange={(e)=> setFilterFromCurrency(e.target.value)}
                                            >
                                            <MenuItem value='USD'>USD</MenuItem>
                                            <MenuItem value='INR'>INR</MenuItem>
                                            <MenuItem value='EUR'>EUR</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Transaction Status Filter */}
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>To Currency</InputLabel>
                                        <Select 
                                            label='To Currency'
                                            value={filterToCurrency}
                                            onChange={(e)=> setFilterToCurrency(e.target.value)}
                                            >
                                            <MenuItem value='USD'>USD</MenuItem>
                                            <MenuItem value='INR'>INR</MenuItem>
                                            <MenuItem value='EUR'>EUR</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Currency Filter */}
                                <Grid item xs={12} sm={6} md={3}>
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
                            </Grid>
                        </Grid>

                        {/* Action Buttons */}
                        <Grid item xs={6} md={2} container justifyContent="center" alignItems="center">
                            <Button variant="contained" onClick={handleFilterData}>Apply Filter</Button>
                        </Grid>

                        <Grid item xs={6} md={1} container justifyContent="center" alignItems="center">
                            <Button variant="contained" onClick={handleFilterReset}>Reset</Button>
                        </Grid>

                        <Grid item xs={12}>
                            {filterError && 
                                <p style={{color:'red'}}>{filterError}</p>
                            }
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