import {Main, DrawerHeader} from '../Content';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ResponsiveDialog from './TransactionDetails';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import axiosInstance from '../Authentication/axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HistoryIcon from '@mui/icons-material/History';
import Alert from '@mui/material/Alert';




const TransactionData = [
    {
        title: 'Cashout',
        transaction_icon: <ArrowRightIcon />, 
        date: '31-03-2024',
        time: '9:47 PM',
        currency: '$',
        amount: '78',
        status: 'success',
        status_color: 'green',
        status_icon: <ArrowDropUpIcon />,
        status_icon_color: 'green',
        currency_icon: <CurrencyPoundIcon sx={{fontSize: 18}} />
    },
    {
        title: 'Cashin',
        transaction_icon: <ArrowRightIcon />, 
        date: '31-03-2024',
        time: '9:47 PM',
        currency: '$',
        amount: '78',
        status: 'success',
        status_color: 'green',
        status_icon: <ArrowDropUpIcon />,
        status_icon_color: 'green',
        currency_icon: <CurrencyPoundIcon sx={{fontSize: 18}} />
    },
    {
        title: 'Exchange From',
        transaction_icon: <ArrowRightIcon />, 
        date: '31-03-2024',
        time: '9:47 PM',
        currency: '$',
        amount: '75',
        status: 'cancelled',
        status_color: 'red',
        status_icon: <ArrowDropUpIcon />,
        status_icon_color: 'red',
        currency_icon: <CurrencyPoundIcon sx={{fontSize: 18}} />
    },
    {
        title: 'Cashout',
        transaction_icon: <ArrowRightIcon />, 
        date: '31-03-2024',
        time: '9:47 PM',
        currency: '$',
        amount: '78',
        status: 'success',
        status_color: 'green',
        status_icon: <ArrowDropUpIcon />,
        status_icon_color: 'green',
        currency_icon: <CurrencyPoundIcon sx={{fontSize: 18}} />
    },
    {
        title: 'Cashout',
        transaction_icon: <ArrowRightIcon />, 
        date: '31-03-2024',
        time: '9:47 PM',
        currency: '$',
        amount: '78',
        status: 'success',
        status_color: 'green',
        status_icon: <ArrowDropUpIcon />,
        status_icon_color: 'green',
        currency_icon: <CurrencyPoundIcon sx={{fontSize: 18}} />
    },
    {
        title: 'Cashin',
        transaction_icon: <ArrowRightIcon />, 
        date: '31-04-2024',
        time: '9:37 PM',
        currency: '$',
        amount: '10',
        status: 'Pending',
        status_color: 'orange',
        status_icon: <ArrowDropUpIcon />,
        status_icon_color: 'orange',
        currency_icon: <CurrencyPoundIcon sx={{fontSize: 18}} />
    },
    {
        title: 'Cashout',
        transaction_icon: <ArrowRightIcon />, 
        date: '31-03-2024',
        time: '9:47 PM',
        currency: '$',
        amount: '78',
        status: 'success',
        status_color: 'green',
        status_icon: <ArrowDropUpIcon />,
        status_icon_color: 'green',
        currency_icon: <CurrencyPoundIcon sx={{fontSize: 18}} />
    },
]



export default function AllTransactions({open}) {
    const [boxOpen, setBoxOpen] = useState(false);
    const [isfilterItem, setFilterItem] = useState(false);
    const [dateRange, setDateRange] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('');
    const [currency, setCurrency] = useState('');
    const [transactionData, setTransactionData] = useState([]);
    const [error, setError] = useState('');
    // const [specificTransaction, updateSpecificTransaction] = useState([]);
    const [specificTransactionDetails, updateSpecificTransactionDetails] = useState([]);



    const handleDateChange = (event) => {
        setDateRange(event.target.value);
    };  
    const handleTransactionChange = (event) => {
        setTransactionType(event.target.value);
    };  
    const handleTransactionStatusChange = (event) => {
        setTransactionStatus(event.target.value);
    };  
    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };   

    const handleClickOpen = () => {
        setBoxOpen(true);
      };
    
    const handleClose = () => {
        setBoxOpen(false);
      };

    const toggleFilterItemVisibility = () => {
        setFilterItem(!isfilterItem);
      };

    useEffect(() => {
        try{
            axiosInstance.get(`api/v4/users/transactions/`).then((res)=> {
                if(res.data.msg == "Token has expired"){
                    setError("Session has expired please try to login")
                }else if (res.data.msg == "Invalid token"){
                    setError("Invalid Session please try to login")
                } else if(res.data.msg == "Authentication Failed") {
                    setError("Authentication Failed please re login")
                } else if (res.data.msg == "Unable to get the Transactions") {
                    setError("Server error")
                } else {
                    setError('')
                }

                if(res.data && res.data.all_transactions) {
                    setTransactionData(res.data.all_transactions)
                    // console.log(res.data)
                };
            })
        }catch(error) {
            console.log(error)
        }
       
    }, [])
    // console.log(transactionData)

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
                <div className='d-flex align-items-center'>
                    <p className='text-muted'>Filter</p>&nbsp;
                    <Button startIcon={<FilterListIcon />} style={{backgroundColor: ''}} variant="outlined" onClick={toggleFilterItemVisibility}></Button>
                </div>
            </div>

            <div className='d-flex justify-content-between'>   
            {isfilterItem && (
                <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-10">
                            <FormControl sx={{ m: 1, minWidth: 100, width: {xs: '80%', sm: '16.5%'}}}>
                                <InputLabel id="demo-simple-select-helper-label">Pick a Date Range</InputLabel>
                                <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={dateRange}
                                label="Age"
                                onChange={handleDateChange}
                                >
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
                                <FormHelperText>Pick a date range</FormHelperText>
                            </FormControl>
                        
                            <FormControl sx={{ m: 1, minWidth: 120,  width: {xs: '80%', sm: '9%'}}}>
                                <InputLabel id="demo-simple-select-helper-label">Transaction</InputLabel>
                                <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={transactionType}
                                label="Age"
                                onChange={handleTransactionChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>All Type</MenuItem>
                                    <MenuItem value={20}>Deposit</MenuItem>
                                    <MenuItem value={30}>Withdrawl</MenuItem>
                                    <MenuItem value={30}>Transferred</MenuItem>
                                    <MenuItem value={30}>Received</MenuItem>
                                    <MenuItem value={30}>Exchange form</MenuItem>
                                    <MenuItem value={30}>Exchange To</MenuItem>
                                    <MenuItem value={30}>Request Sent</MenuItem>
                                    <MenuItem value={30}>Request Received</MenuItem>
                                    <MenuItem value={30}>Payment Sent</MenuItem>
                                    <MenuItem value={30}>Payment Received</MenuItem>
                                    <MenuItem value={30}>Crypto Received</MenuItem>
                                    <MenuItem value={30}>Crypto Sent</MenuItem>
                                    <MenuItem value={30}>Crypto Swap</MenuItem>
                                    <MenuItem value={30}>Crypto Buy</MenuItem>
                                    <MenuItem value={30}>Crypto Sell</MenuItem>
                                    <MenuItem value={30}>Investment</MenuItem>
                                    <MenuItem value={30}>Cashin</MenuItem>
                                    <MenuItem value={30}>Cashout</MenuItem>
                                </Select>
                                <FormHelperText>Transaction Type</FormHelperText>
                            </FormControl>
                       
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                                <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={transactionStatus}
                                label="Age"
                                onChange={handleTransactionStatusChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>All Status</MenuItem>
                                    <MenuItem value={20}>Success</MenuItem>
                                    <MenuItem value={30}>Pending</MenuItem>
                                    <MenuItem value={40}>Cancelled</MenuItem>
                                    <MenuItem value={50}>Refunded</MenuItem>
                                </Select>
                                <FormHelperText>Trasaction Status</FormHelperText>
                            </FormControl>
                        
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Currency</InputLabel>
                                <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={currency}
                                label="Age"
                                onChange={handleCurrencyChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>All Currency</MenuItem>
                                    <MenuItem value={20}>EUR</MenuItem>
                                    <MenuItem value={30}>USD</MenuItem>
                                    <MenuItem value={40}>INR</MenuItem>
                                    <MenuItem value={50}>GBP</MenuItem>
                                    <MenuItem value={60}>BTC</MenuItem>
                                    <MenuItem value={70}>Dodge</MenuItem>
                                </Select>
                                <FormHelperText>Currency</FormHelperText>
                            </FormControl>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-2 my-3">
                            <Button variant="text">Reset</Button>
                            <Button variant="contained">Apply Filter</Button>
                        </div>
                    </div>
                </div>
                    
                </>
                )}
            </div>

                {error ? (
                    <Alert severity="warning">{error}</Alert>
                ) : (
        <List>
           
            {transactionData.map((transaction, index) => {
        
                const transactionDate = new Date(transaction.transaction.txddate);
                
                const formatDate = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}-${String(transactionDate.getDate()).padStart(2, '0')}`

                const transactionTime = new Date(transaction.transaction.txdtime);
                const formattedTime = `${String(transactionTime.getHours()).padStart(2, '0')}:${String(transactionTime.getMinutes()).padStart(2, '0')}:${String(transactionTime.getSeconds()).padStart(2, '0')}`;

                const handleTransactionClick = ()=> {
                    handleClickOpen();
                    updateSpecificTransactionDetails(transaction)
                };

                return(
       
                <ListItem
                key={index}
                disablePadding
                secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                        <ArrowRightIcon />
                    </IconButton>
                }
                onClick={handleTransactionClick}
                className='mb-2 shadow border border-secondary'
                >
                <ListItemButton>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: '#d5d4ed'}}>{transaction.currency.symbol}</Avatar>
                        </ListItemAvatar>
                    <ListItemText
                    primary={transaction.transaction.txdtype}
                    secondary={`Cash ${transaction.transaction.txddate} ${transaction.transaction.txdtime}`}
                    />
                    <ListItemText
                    primary={
                        
                        transaction.transaction.txdstatus == 'Pending' ? (
                            <>
                            
                                <span style={{color: 'orange'}} className='mx-1'><HistoryIcon /></span>
                                <span className='mx-1'>{transaction.currency.name}</span>
                                <span>{transaction.transaction.amount}</span>
                            
                            </>

                        ) : transaction.txdstatus == 'Success' ? (
                            <>
                                <span style={{color: 'green'}} className='mx-1'><ArrowDropUpIcon /></span>
                                <span className='mx-1'>{transaction.currency.name}</span>
                                <span>{transaction.transaction.amount}</span>
                            </>
                            
                        ) : transaction.txdstatus == 'Cancelled' ? (
                            <>
                                <span style={{color: 'red'}}  className='mx-1'><ArrowDropDownIcon /></span>
                                <span className='mx-1'>{transaction.currency.name}</span>
                                <span>{transaction.transaction.amount}</span>
                            </>
                        ) : (
                            <>
                                <span style={{color: 'green'}} className='mx-1'><ArrowDropUpIcon /></span>
                                <span className='mx-1'>{transaction.currency.name}</span>
                                <span>{transaction.transaction.amount}</span>
                            </>
                        )
                             
                    }
                    secondary={
                        transaction.transaction.txdstatus == 'Pending' ? (
                            <span style={{ color: 'orange' }}>{transaction.transaction.txdstatus}</span>

                        ) : transaction.transaction.txdstatus == 'Success' ? (
                            <span style={{ color: 'green' }}>{transaction.transaction.txdstatus}</span>

                        ) : transaction.transaction.txdstatus === 'Cancelled' ? (
                            <span style={{ color: 'red' }}>{transaction.transaction.txdstatus}</span>

                        ) : (
                            <span style={{ color: 'orange' }}>{transaction.transaction.txdstatus}</span>
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
                <Pagination count={10} color="primary" />
            </div>

        </Main>

        <ResponsiveDialog handleClickOpen={handleClickOpen} handleClose={handleClose} boxOpen={boxOpen} specificTransactionDetails={specificTransactionDetails} />
        

        </>
    )
};






//Map the list Without any data from API
// <List>
//             {TransactionData.map((transaction, index) => (
        
//                 <ListItem
//                 key={index}
//                 disablePadding
//                 secondaryAction={
//                     <IconButton edge="end" aria-label="comments">
//                         <ArrowRightIcon />
//                     </IconButton>
//                 }
//                 onClick={handleClickOpen}
//                 className='mb-2 shadow border border-secondary'
//                 >
//                 <ListItemButton>
//                         <ListItemAvatar>
//                             <Avatar style={{backgroundColor: '#d5d4ed'}}>{transaction.txdcurrency.symbol}</Avatar>
//                         </ListItemAvatar>
//                     <ListItemText
                
//                     primary={transaction.title}
                    
//                     secondary={`Cash ${transaction.date} ${transaction.time}`}
//                     />
//                     <ListItemText
//                     primary={
//                         <>
//                             <span style={{color:transaction.status_icon_color}}>{transaction.status_icon}</span> 
                             
//                             {transaction.txdcurrency}
//                             {transaction.currency}

//                             <span>{transaction.amount}</span>
//                         </>
//                     }
//                     secondary={
                        
//                         <span style={{ color: transaction.status_color }}>{transaction.status}</span>
//                     }
//                     sx={{ flex: 'auto', textAlign: 'right' }}
//                     />
//                 </ListItemButton>
//                 </ListItem>
//             ))}
              
//             </List>
