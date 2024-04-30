import {Main, DrawerHeader} from '../Content';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ResponsiveDialog from './TransactionDetails';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';



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


export default function Transactions({open}) {
    const [boxOpen, setBoxOpen] = useState(false);
    const [isfilterItem, setFilterItem] = useState(false);

      
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
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                </>
                )}
            </div>

            <List>
            {TransactionData.map((transaction, index) => (
                <ListItem
                key={index}
                disablePadding
                secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                    {transaction.transaction_icon}
                    </IconButton>
                }
                onClick={handleClickOpen}
                className='mb-2 shadow border border-secondary'
                >
                <ListItemButton>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: '#d5d4ed'}}>{transaction.currency}</Avatar>
                        </ListItemAvatar>
                    <ListItemText
                    primary={transaction.title}
                    secondary={`Cash ${transaction.date} ${transaction.time}`}
                    />
                    <ListItemText
                    primary={
                        <>
                            <span style={{color:transaction.status_icon_color}}>{transaction.status_icon}</span>
                            {transaction.currency}
                            {/* <span>{transaction.currency_icon}</span> */}
                            <span>{transaction.amount}</span>
                        </>
                    }
                    secondary={
                        <span style={{ color: transaction.status_color }}>{transaction.status}</span>
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