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
import ResponsiveDialog from '../Transactions/TransactionDetails';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { AddBox } from '@mui/icons-material';




const TicketsDATA = [
    {
        title: 'TICKET',
        transaction_icon: <ArrowRightIcon />, 
        tiktid:"#12345",
        date: '31-03-2024',
        time: '9:47 PM',
        currency: '$',
        amount: '78',
        status: 'success',
        status_color: 'green',
        status_icon: <ArrowDropUpIcon />,
        status_icon_color: 'green',
        Ticket_icon: <ConfirmationNumberIcon sx={{fontSize: 18}} />
    }
 
]


export default function Ticket({open}) {
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
                <p className='fs-3'>TICKET</p>
            </div>
            
            <br />
            <div className='d-flex justify-content-between'>
                <p className='text-muted'>All Transactions</p>
                <div className='d-flex align-items-center'>
                    <p className='text-muted'>ADD TICKET</p>&nbsp;
                    <Button startIcon={<AddBox />} style={{backgroundColor: ''}} variant="outlined"></Button>
                </div>
            </div>

           

            <List>
            {TicketsDATA.map((transaction, index) => (
                <ListItem
                key={index}
                disablePadding
                
                className='mb-2 shadow border border-secondary'
                >
                <ListItemButton>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: '#d5d4ed'}}>{transaction.Ticket_icon}</Avatar>
                        </ListItemAvatar>
                    <ListItemText
                    primary={transaction.title}
                    secondary={`${transaction.tiktid} | ${transaction.date} ${transaction.time}`}
                    />
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
        <ResponsiveDialog handleClickOpen={handleClickOpen} handleClose={handleClose} boxOpen={boxOpen} />

        </>
    )
}