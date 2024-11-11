import React from 'react';
import { Main, DrawerHeader } from '../Content';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Chip,
  Box, Button, Grid, FormControl,  MenuItem, InputLabel, 
} from '@mui/material';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosInstance from '../Authentication/axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tooltip from '@mui/material/Tooltip';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from 'antd';


const { RangePicker } = DatePicker;




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
    const theme         = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [cryptoTransactions, setCryptoTransactions] = useState([]);   // User Crypto Transaction data
    const [emptyData, setEmptyData]               = useState(false); // Empty data
    const [paginationCount, setPaginationCount]   = useState(0);
    const [isfilterItem, setFilterItem]           = useState(false);  // Show filters
    const [LgStartDateRange, setLgStartDateRange] = useState('');  // Large Screen Start date
    const [LgEndDateRange, setLgEndDateRange]     = useState('');  // Large Screen End Date
    const [ShStartDateRange, setShStartDateRange] = useState('');  // Small screen Start date
    const [ShEndDateRange, setShEndDateRange]     = useState('');  // Small Screen End date
    const [filterDate, setFilterDate]             = useState('');  // Filter date state field
    const [filterError, setFilterError]           = useState('');  // Error message of filter
    const [filterTransactionType, setFilterTransactionType] = useState(''); // Transaction type in Filter
    const [filterStatus, setFilterStatus] = useState(''); // Filter Status
    const [filterCrypto, setFilterCrypto] = useState('');  // Crypto in Filter Section
    const [filterActive, setFilterActive] = useState(false);


    const countPagination = paginationCount ? Math.ceil(paginationCount) : 0
 


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
        let limit = 5;
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
        }
   };

   //// Reset Filter Selected data
   const handleFilterReset = ()=> {
        setFilterActive(false);
        setFilterDate('');
        setFilterTransactionType('');
        setFilterStatus('');
        setFilterCrypto('');
        setFilterError('');
   };

   //// Call default pagination after filter mode off
   useEffect(() => {
    if (!filterActive) {
        handlePaginationData('e', 1);
    }
   }, [!filterActive])
   

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
        axiosInstance.post(`/api/v2/user/filter/crypto/transactions/`, {
            dateRange: filterDate,
            transactionType: filterTransactionType,
            status: filterStatus,
            crypto: filterCrypto,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                const sortedTransactions = res.data.filtered_user_crypto_transaction.sort((a,b)=> {
                    return new Date(b.created_at) - new Date(a.created_at)
                })
                setCryptoTransactions(sortedTransactions)
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
        axiosInstance.post(`/api/v2/user/filter/crypto/transactions/?limit=${limit}&offset=${offset}`, {
            dateRange: filterDate,
            transactionType: filterTransactionType,
            status: filterStatus,
            crypto: filterCrypto,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                const sortedTransactions = res.data.filtered_user_crypto_transaction.sort((a,b)=> {
                    return new Date(b.created_at) - new Date(a.created_at)
                })
                setCryptoTransactions(sortedTransactions)
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


    //// Empty Data
    if (emptyData) {
        return (
            <>
            <Main open={open}>
                <DrawerHeader />

                <Box sx={{ width: '100%', overflowX: 'auto', mt: 2}}>

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
        </>
        );
    };



return (
    <>
    <Main open={open}>
        <DrawerHeader />

        <Box sx={{ width: '100%', overflowX: 'auto', mt: 2}}>
            
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <p className='text-muted'>All Crypto Transactions</p>
                <Button variant="contained" startIcon={<FilterAltIcon />} onClick={()=> {setFilterItem(!isfilterItem)}}>Filter</Button>
            </Box>

            <div className="d-flex justify-content-between">
                {isfilterItem && (
                    <Grid container spacing={2} sx={{mt:{xs:1, sm:0}, mb:{xs:1, sm:0.3}}}>

                        {/* Date Range Filter */}
                        <Grid item xs={12} sm={6} md={2.5}>
                            <Select
                                placeholder="Date Range"
                                indicator={<KeyboardArrowDown />}
                                name='filterDate'
                                value={filterDate}
                                onChange={(e, newValue)=> {setFilterDate(newValue)}}
                                sx={{
                                    [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                        transform: 'rotate(-180deg)',
                                    },
                                    },
                                }}
                                >
                                <Option value="Today">Today</Option>
                                <Option value="Yesterday">Yesterday</Option>
                                <Option value="ThisWeek">ThisWeek</Option>
                                <Option value="ThisMonth">This Month</Option>
                                <Option value="LastMonth">Last month</Option>
                                <Option value="CustomRange">Custom Range</Option>
                            </Select>

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
                            <Select
                                placeholder="Transaction Type"
                                indicator={<KeyboardArrowDown />}
                                value={filterTransactionType}
                                onChange={(e, newValue)=> setFilterTransactionType(newValue)}
                                sx={{
                                    [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                        transform: 'rotate(-180deg)',
                                    },
                                    },
                                }}
                                >
                                <Option value="Buy">Buy</Option>
                                <Option value="Sell">Sell</Option>
                            </Select>
                        </Grid>

                        {/* Transaction Status Filter */}
                        <Grid item xs={12} sm={6} md={2.5}>
                            <Select
                                placeholder="Status"
                                indicator={<KeyboardArrowDown />}
                                value={filterStatus}
                                onChange={(e, newValue)=> {setFilterStatus(newValue)}}
                                sx={{
                                    [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                        transform: 'rotate(-180deg)',
                                    },
                                    },
                                }}
                                >
                                <Option value="Approved">Approved</Option>
                                <Option value="Pending">Pending</Option>
                                <Option value="Cancelled">Cancelled</Option>
                                <Option value="Hold">On Hold</Option>
                            </Select>
                        </Grid>

                        {/* Crypto Filter */}
                        <Grid item xs={12} sm={6} md={2.5}>
                            <Select
                                placeholder="Crypto"
                                indicator={<KeyboardArrowDown />}
                                value={filterCrypto}
                                onChange={(e, newValue)=> {setFilterCrypto(newValue)}}
                                sx={{
                                    [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                        transform: 'rotate(-180deg)',
                                    },
                                    },
                                }}
                                >
                                <Option value="BTC">BTC</Option>
                                <Option value="XRP">XRP</Option>
                                <Option value="ETH">ETH</Option>
                                <Option value="SOL">SOL</Option>
                                <Option value="LTC">LTC</Option>
                                <Option value="DOGE">DOGE</Option>
                                <Option value="BNB">BNB</Option>
                            </Select>
                        </Grid>

                        {/* Action Buttons */}
                        <Grid item xs={8} sm={2} md={1} sx={{mt:'0.1%'}}>
                            <Button 
                                variant="contained" 
                                size='medium'
                                onClick={()=> {handleFilterData();}}
                                >
                                    Submit
                            </Button>
                        </Grid>

                        <Grid item xs={8} sm={2} md={1} sx={{mt:'0.1%'}}>
                            <Button 
                                variant="contained" 
                                size='medium'
                                onClick={()=> {setFilterActive(false); handleFilterReset();}}
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

            <TableContainer component={Paper} sx={{mt:1, maxHeight:'70rem'}}>
                <Table aria-label="User table">
                <TableHead sx={{backgroundColor:'#E1EBEE'}}>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Crypto</TableCell>
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
</>

    );
};