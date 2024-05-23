import {Main, DrawerHeader} from '../Content';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';




const DisputeData = [
    {
        title: 'Peter parker Double money scheme',
        transaction_icon: <ArrowRightIcon />, 
        disputtid:"#12345",
        date: '31-03-2024',        
        time: '9:47 PM',
        claimant: 'ronjit',
        defendeant: 'rohit',
        transactionid: '#23456787',
        status: 'solve',
        status_icon_color: 'green',
        
        Avatar: "A"
    },
    {
        title: 'Noman osbones lab equipment theft',
        transaction_icon: <ArrowRightIcon />, 
        disputtid:"#12345",
        date: '31-03-2024',        
        time: '9:47 PM',
        claimant: 'ronjit',     
        defendeant: 'rohit',
        status: 'solve',
        transactionid: '#2347898763',
        status_icon_color: 'green',
        
        Avatar:"A"
    },
    {
        title: 'Deadpool party payment dispute',
        transaction_icon: <ArrowRightIcon />, 
        disputtid:"#12345",
        date: '31-03-2024',        
        time: '9:47 PM',
        claimant: 'ronjit',
        defendeant: 'rohit',
        transactionid: '#1234567890987',
        status: 'solve',
        status_icon_color: 'green',
        Avatar: "A"
    }
    ,    {
        title: 'IronMan party payment dispute',
        transaction_icon: <ArrowRightIcon />, 
        disputtid:"#12345",
        date: '31-03-2024',        
        time: '9:47 PM',
        claimant: 'ronjit',
        defendeant: 'rohit',
        transactionid: '#3efhytree',
        status: 'solve',
        status_icon_color: 'green',
        Avatar:"A"
    }
 
]


export default function Dispute({open}) {
    const [boxOpen, setBoxOpen] = useState(false);
    const [isfilterItem, setFilterItem] = useState(false);
    const [dateRange, setDateRange] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('');
    const [currency, setCurrency] = useState('');


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

    return (
        <>
         <Main open={open}>
            <DrawerHeader />


            <div className="d-flex justify-content-center">
                <p className='fs-3'>DISPUTE</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className='text-muted'>Your conservations with admin relating problems</p>
            </div>
            <br />
            <div className='d-flex justify-content-between'>
                <p className='text-muted'>All Disputes</p>
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
                        
                            
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                                <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={transactionStatus}
                                label="Age"
                                onChange={handleTransactionStatusChange}
                                >
                                    
                                    <MenuItem value={10}><em>All Status</em></MenuItem>
                                    <MenuItem value={20}>Open</MenuItem>
                                    <MenuItem value={30}>Close</MenuItem>
                                    
                                </Select>
                                <FormHelperText>Trasaction Status</FormHelperText>
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

           

            <List>
            {DisputeData.map((transaction, index) => (
                <ListItem
                key={index}
                disablePadding
                
                className='mb-2 shadow border border-secondary rounded-md'
                >
                <ListItemButton href='/dispute/reply/'>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: '#d5d4ed'}}>{transaction.Avatar}</Avatar>
                        </ListItemAvatar>
                    
                  
                    <ListItemText>
                        <h1>{transaction.title}</h1>
                        <span>

                    <p className='text-sm text-muted'>Dispute ID: {transaction.disputtid} . Defendant : {transaction.defendeant} | {transaction.date} {transaction.time}</p>
                        </span>
                    <h1 className='text-sm text-muted'>Transaction id{transaction.transactionid}</h1>
                       
                    </ListItemText>
                    <ListItemText
                    primary={
                        <>
                            <span style={{color:transaction.status_icon_color}}>{transaction.status}</span>&nbsp;
                            
                            {/* <span>{transaction.currency_icon}</span> */}
                           <Button variant="text" sx={{ backgroundColor:"blue",color:"white" }}>See MORE</Button>
                        </>
                    }
                    
                    sx={{ flex: 'auto', textAlign: 'right' }}
                    />
                </ListItemButton>
                </ListItem>
            ))}
              {/* <ListItem disablePadding
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                    <ArrowRightIcon />
                </IconButton>
              }
              onClick={handleClickOpen}
              className='mb-2 shadow border border-secondary'
              >
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <CurrencyRupeeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Exchange From" secondary="GBP 20-07-2024 6:19 PM" />
                    <ListItemText
                     primary={
                        <>
                            <ArrowDropUpIcon sx={{color: 'green'}}/>
                            <CurrencyPoundIcon sx={{fontSize: 18}} />
                            <span>75</span>
                        </>
                     }
                     secondary={
                        <span style={{color: 'green'}}>success</span>
                        
                     }
                     sx={{flex: 'auto', textAlign: 'right'}} />
                </ListItemButton>
              </ListItem> */}
            </List>

            <div className="my-3">
                <Pagination count={10} color="primary" />
            </div>
           

        </Main>
        {/* <ResponsiveDialog handleClickOpen={handleClickOpen} handleClose={handleClose} boxOpen={boxOpen} /> */}

        </>
    )
}